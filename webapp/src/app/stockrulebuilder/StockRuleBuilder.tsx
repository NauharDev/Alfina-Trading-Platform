
"use client";

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import db from "@/app/firebase/firestore";
import { useSession } from "next-auth/react";

interface Operator {
    id: string;
    label: string;
    symbol: string;
    type: "unary" | "binary";
    prefix?: boolean;
    isOpen?: boolean;
}

interface Term {
    id: string;
    label: string;
    symbol: string;
}

type EquationItem = Operator | Term;

const stockTerms = [
    { id: "open", label: "Asset Time Bar Opening Price", symbol: "OPENING" },
    { id: "high", label: "Asset Time Bar Price", symbol: "HIGH" },
    { id: "low", label: "Asset Time Bar Low Price", symbol: "LOW" },
    { id: "close", label: "Asset Time Bar Closing Price", symbol: "CLOSING" },
    { id: "volume", label: "Asset Time Bar Aggregate Volume", symbol: "VOLUME" },
    { id: "vwap", label: "Asset Time Bar Volume Weighted Average (Typical)", symbol: "VWAP" },
];

const arithmeticOperators: Operator[] = [
    { id: "add", label: "+", symbol: "+", type: "binary" },
    { id: "subtract", label: "-", symbol: "-", type: "binary" },
    { id: "multiply", label: "×", symbol: "*", type: "binary" },
    { id: "divide", label: "÷", symbol: "/", type: "binary" },
];

const advancedOperators: Operator[] = [
    { id: "sqrt", label: "√", symbol: "sqrt", type: "unary", prefix: true },
    { id: "log", label: "log", symbol: "log", type: "unary", prefix: true },
    { id: "smooth", label: "Smooth", symbol: "smooth", type: "unary", prefix: true },
    { id: "exp", label: "EXP", symbol: "exp", type: "unary", prefix: true },
];

const StockRuleBuilder = () => {
    const [equation, setEquation] = useState<EquationItem[]>([]);
    const [features, setFeatures] = useState<{ id: string; name: string; formattedEquation: string }[]>([]);
    const [featureName, setFeatureName] = useState("");
    const { data: session, status } = useSession(); // Get session from next-auth
    const auth = getAuth();

    // Helper functions for equation validation
    const canAddOperator = (operator: Operator) => {
        if (equation.length === 0) {
            return operator.type === "unary"; // Only allow unary operators at the start
        }
        const lastItem = equation[equation.length - 1];
        return !("type" in lastItem); // Can't add operator after another operator
    };

    const canAddTerm = (term: Term) => {
        if (equation.length === 0) return true;
        const lastItem = equation[equation.length - 1];
        return "type" in lastItem; // Can add term after an operator
    };

    const isOperator = (item: EquationItem): item is Operator => {
        return (item as Operator).type !== undefined;
    };

    const addToEquation = (item: EquationItem) => {
        if (isOperator(item)) {
            if (!canAddOperator(item)) return;
            if (item.type === "unary" && item.prefix) {
                setEquation([...equation, { ...item, isOpen: true }]);
            } else {
                setEquation([...equation, item]);
            }
        } else {
            if (!canAddTerm(item)) return;
            setEquation([...equation, item]);
        }
    };

    const formatEquation = (eq: EquationItem[]) => {
        let result = "";
        let openBrackets = 0;

        eq.forEach((item, index) => {
            if (isOperator(item) && item.type === "unary" && item.prefix && item.isOpen) {
                result += `${item.symbol}(`;
                openBrackets++;
            } else if (index === eq.length - 1 && openBrackets > 0) {
                result += `${item.symbol || item.label})`.repeat(openBrackets);
            } else {
                result += ` ${item.symbol || item.label} `;
            }
        });

        return result.trim();
    };

    // Firebase-related functions
    const fetchFeatures = async () => {
        try {
            if (status === "loading") {
                console.log("next-auth session is loading...");
                return;
            }
            if (status === "authenticated" && session) {
                const userEmail = session.user?.email;
                if (userEmail) {
                    console.log("User email from next-auth:", userEmail);
                    const userCollectionRef = collection(db, "users", userEmail, "features");
                    const querySnapshot = await getDocs(userCollectionRef);
                    if (!querySnapshot.empty) {
                        const fetchedFeatures = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            name: doc.data().featureName,
                            formattedEquation: doc.data().formattedEquation,
                        }));
                        setFeatures(fetchedFeatures);
                    } else {
                        setFeatures([]);
                    }
                }
            } else if (status === "unauthenticated") {
                console.log("No session found, using Firebase Authentication");
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        console.log("User authenticated via Firebase:", user);
                        const userCollectionRef = collection(db, "users", user.uid, "features");
                        const querySnapshot = await getDocs(userCollectionRef);
                        if (!querySnapshot.empty) {
                            const fetchedFeatures = querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                name: doc.data().featureName,
                                formattedEquation: doc.data().formattedEquation,
                            }));
                            setFeatures(fetchedFeatures);
                        } else {
                            setFeatures([]);
                        }
                    } else {
                        console.error("User not authenticated via Firebase or next-auth");
                    }
                });
                return () => unsubscribe();
            }
        } catch (error) {
            console.error("Error fetching features:", error);
        }
    };

    const saveFeature = async (featureName: string, formattedEquation: string) => {
        try {
            let userId = null;

            // Check if session exists from next-auth
            if (session) {
                console.log("Session from next-auth:", session);
                const userEmail = session.user?.email;

                if (!userEmail) throw new Error("User email not found in session");

                // Use email as the identifier for Firestore
                userId = userEmail;
            } else {
                // Fallback to Firebase Authentication
                const user = auth.currentUser; // Get current user
                if (!user) throw new Error("User not authenticated via Firebase or next-auth");

                console.log("User authenticated via Firebase:", user);
                userId = user.uid; // Use UID as the identifier for Firestore
            }

            console.log("User ID for saving a feature:", userId);

            // Save a feature to Firestore
            const userCollectionRef = collection(db, "users", userId, "features");
            const featureDocRef = doc(userCollectionRef); // Auto-generate a new document
            const featureData = {
                featureName,
                formattedEquation,
                createdAt: new Date().toISOString(),
            };

            await setDoc(featureDocRef, featureData);
            console.log("Feature saved successfully!");
        } catch (error) {
            console.error("Error saving feature:", error);

        }
    };

    const deleteFeature = async (featureId: string) => {
        try {
            let userId = null;

            // Check if session exists from next-auth
            if (session) {
                console.log("Session from next-auth:", session);
                const userEmail = session.user?.email;

                if (!userEmail) throw new Error("User email not found in session");

                // Use email as the identifier for Firestore
                userId = userEmail;
            } else {
                // Fallback to Firebase Authentication
                const user = auth.currentUser; // Get current user
                if (!user) throw new Error("User not authenticated via Firebase or next-auth");

                console.log("User authenticated via Firebase:", user);
                userId = user.uid; // Use UID as the identifier for Firestore
            }

            console.log("User ID for deleting a feature:", userId);

            const featureDocRef = doc(db, "users", userId, "features", featureId);
            await deleteDoc(featureDocRef);
            console.log("Feature deleted successfully!");
            fetchFeatures();

        } catch (error) {
            console.error("Error deleting feature:", error);

        }
    };

    const createFeature = async () => {
        if (!featureName.trim() && equation.length === 0) {
            alert("Please provide a feature name and create an equation before proceeding.");
            return;
        }

        if (!featureName.trim()) {
            alert("Please provide a feature name before creating a feature.");
            return;
        }

        if (equation.length === 0) {
            alert("Please create an equation before creating a feature.");
            return;
        }

        // If both feature name and equation are valid, proceed to create the feature
        const formattedEquation = formatEquation(equation);
        await saveFeature(featureName, formattedEquation);

        // Clear inputs after saving
        setEquation([]);
        setFeatureName("");

        // Refresh the feature list
        fetchFeatures();
    };

    useEffect(() => {
        fetchFeatures();
    }, [session, status]);

    return (
        <div className="p-5">
            <div className="flex gap-5">
                <div className="flex-1 flex flex-col gap-5">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Stock Terms</h3>
                        <div className="h-48 overflow-y-auto flex flex-col gap-2 p-3 bg-white rounded">
                            {stockTerms.map((term) => (
                                <button
                                    key={term.id}
                                    onClick={() => addToEquation(term)}
                                    className={`p-2 rounded transition-colors ${canAddTerm(term) ? "bg-gray-100 hover:bg-gray-200 cursor-pointer" : "bg-gray-50 text-gray-400 cursor-not-allowed"
                                        }`}
                                    disabled={!canAddTerm(term)}
                                >
                                    {term.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Arithmetic Operators</h3>
                        <div className="flex flex-wrap gap-2 p-3 bg-white rounded">
                            {arithmeticOperators.map((op) => (
                                <button
                                    key={op.id}
                                    onClick={() => addToEquation(op)}
                                    className={`p-2 rounded transition-colors ${canAddOperator(op) ? "bg-gray-100 hover:bg-gray-200 cursor-pointer" : "bg-gray-50 text-gray-400 cursor-not-allowed"
                                        }`}
                                    disabled={!canAddOperator(op)}
                                >
                                    {op.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Advanced Operators</h3>
                        <div className="flex flex-wrap gap-2 p-3 bg-white rounded">
                            {advancedOperators.map((op) => (
                                <button
                                    key={op.id}
                                    onClick={() => addToEquation(op)}
                                    className={`p-2 rounded transition-colors ${canAddOperator(op) ? "bg-gray-100 hover:bg-gray-200 cursor-pointer" : "bg-gray-50 text-gray-400 cursor-not-allowed"
                                        }`}
                                    disabled={!canAddOperator(op)}
                                >
                                    {op.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Current Equation</h3>
                        <div className="min-h-[100px] bg-white p-4 rounded mb-4 font-mono text-lg leading-relaxed break-words">
                            {formatEquation(equation)}
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={featureName}
                                onChange={(e) => setFeatureName(e.target.value)}
                                placeholder="Feature name"
                                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={createFeature}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Create Feature
                            </button>
                            <button
                                onClick={() => setEquation([])}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg flex-1">
                        <h3 className="text-lg font-semibold mb-3">My Features</h3>
                        {features.map((feature) => (
                            <div key={feature.id} className="bg-white p-3 rounded mb-3 flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium mb-1">{feature.name}</h4>
                                    <div className="text-sm text-gray-600">{feature.formattedEquation}</div>
                                </div>
                                <button
                                    onClick={() => deleteFeature(feature.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockRuleBuilder;