"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import ConditionalComponent from "./ConditionalComponent";
import ExitConditionComponent from "./exit-condition";
import HoldingPeriodComponent from "./holdingPeriodComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from '@/app/firebase/firestore';
import { Operation, HoldingPeriodCondition, ExitCondition } from "@/types/tradingRules/types";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import { onAuthStateChanged } from "firebase/auth";
import { useSession } from "next-auth/react";
import Tooltip from "@/components/ui/tooltip";

export default function TradingRuleBuilder() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("UNIVERSE");
    const [universeOperationInfo, setUniverseOperationInfo] = useState<Operation[]>([]);
    const [primarySignalInfo, setPrimarySignalInfo] = useState<Operation | null>(null);
    const [metaSignalInfo, setMetaSignalInfo] = useState<Operation[]>([]);
    const [holdingPeriodInfo, setHoldingPeriodInfo] = useState<HoldingPeriodCondition>({ targetVar: "", conditionalOperator: "", baseHolding: "" })
    const [exitConditionInfo, setExitConditionInfo] = useState<ExitCondition>({ profitTaking: "", stopLoss: "" })
    const [missingInfo, setMissingInfo] = useState<string[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [ruleName, setRuleName] = useState("");
    const tabs = ["UNIVERSE", "SIGNAL", "HOLDING PERIOD", "EXIT CONDITION"];
    const [userCreatedFeatures, setUserCreatedFeatures] = useState<string[]>([]);
    const { data: session, status } = useSession(); // Get session from next-auth
    const auth = getAuth();


    useEffect(() => {
        // Initialize IDs only on the client
        setUniverseOperationInfo([{ id: uuidv4(), lhsFeature: "", conditionalOperator: "", rhsFeature: "", canDelete: false }]);
        setPrimarySignalInfo({ id: uuidv4(), lhsFeature: "", conditionalOperator: "", rhsFeature: "", canDelete: false });
        setMetaSignalInfo([{ id: uuidv4(), lhsFeature: "", conditionalOperator: "", rhsFeature: "", canDelete: false }]);
    }, []);

    useEffect(() => {
        const fetchFeatureNames = async () => {
            try {

                if (status === "loading") {
                    console.log("next-auth session is loading...");
                    return;
                }
                // Check if session exists from next-auth
                if (status === "authenticated") {
                    console.log("Session from next-auth:", session);
                    const userEmail = session.user?.email;

                    if (userEmail) {
                        // Fetch features based on email
                        console.log("user email from next-auth session:", userEmail);
                        const userCollectionRef = collection(db, "users", userEmail, "features");
                        const querySnapshot = await getDocs(userCollectionRef);
                        if (!querySnapshot.empty) {
                            const featureNames = querySnapshot.docs.map((doc) => doc.data().featureName);
                            setUserCreatedFeatures([]);
                            setUserCreatedFeatures((prev) => [...prev, ...featureNames]);
                        } else {
                            setUserCreatedFeatures([]);
                        }
                    }
                } else if (status === "unauthenticated") {
                    // Fallback to Firebase Authentication
                    console.log("no next-auth session found, using firebase auth");
                    const unsubscribe = onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            console.log("User authenticated via Firebase:", user);
                            const userCollectionRef = collection(db, "users", user.uid, "features");
                            const querySnapshot = await getDocs(userCollectionRef);
                            if (!querySnapshot.empty) {
                                const featureNames = querySnapshot.docs.map((doc) => doc.data().featureName);
                                setUserCreatedFeatures([]);
                                setUserCreatedFeatures((prev) => [...prev, ...featureNames]);
                            } else {
                                setUserCreatedFeatures([]);
                            }
                        } else {
                            console.error("User not authenticated via Firebase or next-auth");
                        }
                    });

                    // Cleanup the listener when the component unmounts
                    return () => unsubscribe();
                }
            } catch (error) {
                console.error("Error fetching feature names:", error);
            }
        };

        fetchFeatureNames();
    }, [session, status]);


    // Function to add a new Universe ConditionalComponent info
    const handleAddUniverseComponent = () => {
        setUniverseOperationInfo([
            ...universeOperationInfo,
            { id: uuidv4(), lhsFeature: "", conditionalOperator: "", rhsFeature: "", canDelete: true },
        ]);
    };

    const handleAddMetaSignalComponent = () => {
        setMetaSignalInfo([
            ...metaSignalInfo,
            { id: uuidv4(), lhsFeature: "", conditionalOperator: "", rhsFeature: "", canDelete: true },
        ]);
    };

    // function to update the condition information for a specific Universe ConditionalComponent
    const handleUpdateComponentArray = (featureKey: string, featureVal: string, metaSignal?: boolean, uuid?: string) => {
        if (metaSignal) {
            setMetaSignalInfo((prevInfo) => {
                const updatedInfo = [...prevInfo];
                for (let i = 0; i < updatedInfo.length; i++) {
                    if (updatedInfo[i].id === uuid) {
                        updatedInfo[i] = {
                            ...updatedInfo[i],
                            [featureKey]: featureVal,
                        };
                    }
                }

                return updatedInfo;
            });

        } else {
            setUniverseOperationInfo((prevInfo) => {
                const updatedInfo = [...prevInfo];
                for (let i = 0; i < updatedInfo.length; i++) {
                    if (updatedInfo[i].id === uuid) {
                        updatedInfo[i] = {
                            ...updatedInfo[i],
                            [featureKey]: featureVal,
                        };
                    }
                }
                return updatedInfo;
            });
        }

    }

    const handleUpdatePrimarySignal = (featureKey: string, featureVal: string) => {
        setPrimarySignalInfo({ ...primarySignalInfo!, [featureKey]: featureVal })
    }


    const handleUpdateExitConditionComponent = (featureKey: string, featureVal: string | number) => {
        setExitConditionInfo({ ...exitConditionInfo, [featureKey]: featureVal })
    }

    const handleUpdateHoldingPeriod = (featureKey: string, featureVal: string | number) => {
        setHoldingPeriodInfo({ ...holdingPeriodInfo, [featureKey]: featureVal })
    }

    const handleDeleteComponent = (id: string, metaSignal: boolean) => {
        if (metaSignal) {
            setMetaSignalInfo((prevInfo) => prevInfo.filter((component) => component.id !== id));
        } else {
            setUniverseOperationInfo((prevInfo) => prevInfo.filter((component) => component.id !== id));
        }
    };

    const checkUniverseTabComplete = () => {
        if (universeOperationInfo.length == 0) {
            console.log("universe not complete")
            return "Universe";
        }
        for (let i: number = 0; i < universeOperationInfo.length; i++) {
            const universeOperation = universeOperationInfo[i];
            if (universeOperation.lhsFeature == "" || universeOperation.conditionalOperator == "" || universeOperation.rhsFeature == "") {
                return "Universe";
            }
        }
        console.log("universe is complete")
        return "";
    }

    const checkSignalTabComplete = () => {
        if (primarySignalInfo!.lhsFeature == "" || primarySignalInfo!.conditionalOperator == "" || primarySignalInfo!.rhsFeature == "") {
            return "Signal";
        }
        for (let i: number = 0; i < metaSignalInfo.length; i++) {
            const metaSignal = metaSignalInfo[i];
            if (metaSignal.lhsFeature == "" || metaSignal.conditionalOperator == "" || metaSignal.rhsFeature == "") {
                return "Signal";
            }
        }
        console.log("signal is complete")
        return "";
    }

    const checkHoldingPeriodComplete = () => {
        if (holdingPeriodInfo.targetVar == "" || holdingPeriodInfo.conditionalOperator == "" || holdingPeriodInfo.baseHolding == "") {
            return "Holding Period";
        }
        console.log("holding period is complete")
        return "";
    }

    const checkExitConditionComplete = () => {
        if (exitConditionInfo.profitTaking == "" || exitConditionInfo.stopLoss == "") {
            return "Exit Condition";
        }
        console.log("exit cond is complete")
        return "";
    }

    const saveTradingRule = async () => {
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

            console.log("User ID for saving trading rule:", userId);

            // Save trading rule to Firestore
            const userCollectionRef = collection(db, "users", userId, "trading_rules");
            const ruleDocRef = doc(userCollectionRef); // Auto-generate a new document

            const tradingRuleData = {
                ruleName: ruleName,
                universe: universeOperationInfo,
                primarySignal: primarySignalInfo,
                metaSignal: metaSignalInfo,
                holdingPeriod: holdingPeriodInfo,
                exitCondition: exitConditionInfo,
                creationTime: new Date().toISOString(),
                status: "Active",
            };

            await setDoc(ruleDocRef, tradingRuleData);

            console.log("Trading rule saved successfully!");
            return 0;
        } catch (error) {
            console.error("Error saving trading rule:", error);
            return -1;
        }
    };


    function isRuleComplete() {
        const arr = [];
        const uniComplete = checkUniverseTabComplete();
        const signalComplete = checkSignalTabComplete();
        const hpComplete = checkHoldingPeriodComplete();
        const exitComplete = checkExitConditionComplete();

        if (uniComplete !== "") {
            arr.push(uniComplete);
        }
        if (signalComplete !== "") {
            arr.push(signalComplete);
        }
        if (hpComplete !== "") {
            arr.push(hpComplete);
        }
        if (exitComplete !== "") {
            arr.push(exitComplete);
        }

        console.log(missingInfo);
        if (arr.length === 0) {
            return true;
        } else {
            setMissingInfo(arr);
            return false;
        }
    }

    const handleFinish = async () => {
        if (isRuleComplete()) {
            const res = await saveTradingRule();
            if (res === 0) {
                router.push("/dashboard");
            } else {
                console.error("error when saving trading rules");
            }
        } else {
            setShowModal(true);
        }
    }


    return (
        <div className="relative w-full h-screen">

            {showModal && <div className="absolute inset-0 bg-gray-100 opacity-50 pointer-events-none" />}

            <div className="relative flex flex-col w-full h-screen p-6">
                <div className="mb-4">
                    <Link id="backToDashboardButton" href="/dashboard">
                        <button className="text-indigo-600 hover:underline">&larr; Back to Dashboard</button>
                    </Link>
                </div>
                {/* Tabs */}
                <div className="flex space-x-6 border-b pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`pb-2 text-sm font-medium uppercase tracking-wide ${activeTab === tab ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
                                }`}
                            onClick={() => {
                                setActiveTab(tab)
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 mt-4 bg-white rounded-lg shadow p-6 relative">
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <label htmlFor="tradingRule" className="text-gray-700 font-medium">
                            Enter Trading Rule Name:
                        </label>
                        <input
                            id="tradingRule"
                            type="text"
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                            placeholder="e.g., RSI Breakout"
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* Add Component Button */}
                        <button
                            id="addRuleButton"
                            onClick={activeTab === "UNIVERSE" ? handleAddUniverseComponent : handleAddMetaSignalComponent}
                            hidden={activeTab !== "UNIVERSE" && activeTab !== "SIGNAL"}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xl"
                        >
                            +
                        </button>
                        <Link href="/stockrulebuilder">
                            <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700">
                                Create Custom Feature
                            </button>
                        </Link>
                    </div>

                    {/* Render Universe ConditionalComponents */}
                    {activeTab == "UNIVERSE" && <div className="mt-12">
                        {
                            universeOperationInfo.map((operation) =>
                                <ConditionalComponent key={operation.id} handleUpdate={handleUpdateComponentArray} initialLhs={operation.lhsFeature} initialOperator={operation.conditionalOperator} initialRhs={operation.rhsFeature} signal={false} metaSignal={false} userCreatedFeatures={userCreatedFeatures} handleDelete={handleDeleteComponent} uuid={operation.id} canDelete={operation.canDelete} />
                            )
                        }
                    </div>}
                    {activeTab === "SIGNAL" &&
                        <div>
                            <div className="flex items-center gap-1 text-xl font-semibold text-gray-700 mb-1">
                                Primary Signal
                                <Tooltip tooltipText="Main condition that triggers a trade.">
                                    <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                </Tooltip>
                            </div>
                            <div className="mt-8">
                                <ConditionalComponent handleUpdate={handleUpdatePrimarySignal} initialLhs={primarySignalInfo!.lhsFeature} initialOperator={primarySignalInfo!.conditionalOperator} initialRhs={primarySignalInfo!.rhsFeature} signal={true} metaSignal={false} userCreatedFeatures={userCreatedFeatures} handleDelete={handleDeleteComponent} uuid={primarySignalInfo!.id} canDelete={primarySignalInfo!.canDelete} />
                            </div>
                            <div className="w-auto h-px bg-gray-200 my-4" />
                            <div className="flex items-center gap-1 text-xl font-semibold text-gray-700 mb-1">
                                Meta Signals
                                <Tooltip tooltipText="Extra filters that refine when the primary signal triggers.">
                                    <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                </Tooltip>
                            </div>
                            {
                                metaSignalInfo.map((operation) =>
                                    <ConditionalComponent key={operation.id} handleUpdate={handleUpdateComponentArray} initialLhs={operation.lhsFeature} initialOperator={operation.conditionalOperator} initialRhs={operation.rhsFeature} signal={false} metaSignal={true} userCreatedFeatures={userCreatedFeatures} handleDelete={handleDeleteComponent} uuid={operation.id} canDelete={operation.canDelete} />
                                )
                            }
                        </div>

                    }
                    {activeTab === "HOLDING PERIOD" && <div className="mt-12"><HoldingPeriodComponent handleUpdateHoldingPeriod={handleUpdateHoldingPeriod} initialTargetVar={holdingPeriodInfo.targetVar} initialOperator={holdingPeriodInfo.conditionalOperator} initialBaseHolding={holdingPeriodInfo.baseHolding} userCreatedFeatures={userCreatedFeatures} /></div>}
                    {activeTab === "EXIT CONDITION" && <div className="mt-12"><ExitConditionComponent handleUpdateExitConditionComponent={handleUpdateExitConditionComponent} initialProfitTaking={exitConditionInfo.profitTaking} initialStopLoss={exitConditionInfo.stopLoss} userCreatedFeatures={userCreatedFeatures} /></div>}

                </div>

                {/* Finish Button */}
                <div className="flex justify-end mt-4">
                    <Button onClick={handleFinish} className="text-white px-6 py-2 rounded-md shadow">Finish</Button>
                </div>
            </div>

            <Dialog.Root open={showModal} onOpenChange={setShowModal}>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <Dialog.Title className="text-lg font-bold">Missing Information</Dialog.Title>
                    <Dialog.Description></Dialog.Description>
                    <div className="text-gray-500">
                        Some sections contain missing information. Please complete the following sections before submitting:
                        <ul className="mt-2 list-disc pl-6">
                            {missingInfo.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded">OK</button>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
}
