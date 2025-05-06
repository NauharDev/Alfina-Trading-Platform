// src/app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KpiCard from "../../components/dashboard/KpiCard";
import PortfolioChart from "../../components/dashboard/PortfolioChart";
import TradingRulesList from "../../components/dashboard/TradingRulesList";
import Link from "next/link";
import { FiTrendingUp, FiActivity, FiBarChart2, FiRefreshCw, FiPlus } from "react-icons/fi";
import { useDashboardData } from "../../hooks/useDashboardData";
import ErrorBoundary from "../../components/ErrorBoundary";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firestore";
import { TradingRule } from "@/types/tradingRules/types";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import Tooltip from "../../components/ui/tooltip"


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const Dashboard: React.FC = () => {
    const { portfolioData, metrics, isLoading, error, refreshData } = useDashboardData();
    const [tradingRules, setTradingRules] = useState<TradingRule[]>([]); // State to store trading rules
    const { data: session, status } = useSession(); // Get session from next-auth
    const auth = getAuth();


    useEffect(() => {
        const fetchTradingRules = async () => {
            try {

                // Wait until the session status is not "loading"
                if (status === "loading") {
                    console.log("next-auth session is loading...");
                    return;
                }

                // Check if session exists from next-auth
                if (status === "authenticated" && session) {
                    console.log("Session from next-auth:", session);
                    const userEmail = session.user?.email;

                    if (userEmail) {
                        // Fetch trading rules based on email
                        console.log("got the user email from next-auth session", userEmail);
                        const userCollectionRef = collection(db, "users", userEmail, "trading_rules");
                        const querySnapshot = await getDocs(userCollectionRef);
                        if (querySnapshot.empty) {
                            setTradingRules([]);
                        } else {
                            const rules = querySnapshot.docs.map((doc) => {
                                const data = doc.data();

                                // Parse the data into the TradingRule structure
                                const tradingRule: TradingRule = {
                                    id: doc.id,
                                    ruleName: data.ruleName || "",
                                    universe: data.universe || [],
                                    primarySignal: data.primarySignal || { lhsFeature: "", conditionalOperator: "", rhsFeature: "" },
                                    metaSignal: data.metaSignal || [],
                                    holdingPeriod: data.holdingPeriod || { targetVar: "", conditionalOperator: "", baseHolding: "" },
                                    exitCondition: data.exitCondition || { profitTaking: "", stopLoss: "" },
                                    creationTime: data.creationTime || new Date().toISOString(),
                                    status: data.status || "Active"
                                };

                                return tradingRule;
                            });
                            console.log("Fetched trading rules from next-auth session");
                            setTradingRules(rules);
                        }
                    }
                } else if (status === "unauthenticated") {
                    // Fallback to Firebase Authentication
                    console.log("No session found, using Firebase Authentication");
                    const unsubscribe = onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            console.log("User authenticated via Firebase:", user);
                            const userCollectionRef = collection(db, "users", user.uid, "trading_rules");
                            const querySnapshot = await getDocs(userCollectionRef);
                            if (querySnapshot.empty) {
                                setTradingRules([]);
                            } else {
                                const rules = querySnapshot.docs.map((doc) => {
                                    const data = doc.data();

                                    // Parse the data into the TradingRule structure
                                    const tradingRule: TradingRule = {
                                        id: doc.id,
                                        ruleName: data.ruleName || "",
                                        universe: data.universe || [],
                                        primarySignal: data.primarySignal || { lhsFeature: "", conditionalOperator: "", rhsFeature: "" },
                                        metaSignal: data.metaSignal || [],
                                        holdingPeriod: data.holdingPeriod || { targetVar: "", conditionalOperator: "", baseHolding: "" },
                                        exitCondition: data.exitCondition || { profitTaking: "", stopLoss: "" },
                                        creationTime: data.creationTime || new Date().toISOString(),
                                        status: data.status || "Active"
                                    };

                                    return tradingRule;
                                });
                                console.log("Fetched trading rules from Firebase");
                                setTradingRules(rules);
                            }
                        } else {
                            console.error("User not authenticated via Firebase or next-auth");
                        }
                    });

                    // Cleanup the listener when the component unmounts
                    return () => unsubscribe();
                }
            } catch (error) {
                console.error("Error fetching trading rules:", error);
            }
        };

        fetchTradingRules();
    }, [session, status]);

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 m-4 text-red-600 bg-red-50 rounded-xl shadow-lg"
            >
                <h2 className="text-xl font-semibold mb-3">Error Loading Dashboard</h2>
                <p className="mb-4 text-red-500">{error}</p>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={refreshData}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <FiRefreshCw className="mr-2" /> Retry
                </motion.button>
            </motion.div>
        );
    }

    if (isLoading && !portfolioData) {
        return (
            <div className="h-full flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8 w-full max-w-4xl"
                >
                    {/* Skeleton Loading Animation */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                            <div className="h-64 bg-gray-200 rounded" />
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    const getKpiTrend = (current: number, previous: number) => ({
        value: Number(((current - previous) / previous * 100).toFixed(2)),
        isPositive: current >= previous
    });

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-full flex flex-col bg-gray-50"
        >
            {/* Header */}
            <motion.header
                variants={itemVariants}
                className="px-6 py-4 bg-white shadow-lg flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
                    <p className="text-sm text-gray-500">Real-time portfolio insights and trading rules</p>
                </div>
                <div className="flex items-center space-x-4">
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="flex-1 px-6 py-4 overflow-auto">
                <motion.div variants={containerVariants} className="space-y-6">
                    {/* KPI Cards */}
                    <ErrorBoundary>
                        <motion.section variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <KpiCard
                                icon={<FiTrendingUp className="text-2xl" />}
                                title="Portfolio Value"
                                value={`$${portfolioData?.portfolioValue.toLocaleString()}`}
                                gradient="from-green-400 to-blue-500"
                                trend={getKpiTrend(portfolioData?.portfolioValue || 0, 150000)}
                                description="Total portfolio value across all strategies"
                            />
                            <KpiCard
                                icon={<FiActivity className="text-2xl" />}
                                title="Total Trades"
                                value={portfolioData?.totalTrades ? portfolioData.totalTrades.toLocaleString() : '0'}
                                gradient="from-purple-400 to-pink-500"
                                trend={getKpiTrend(portfolioData?.totalTrades || 0, 1200)}
                                description="Number of trades executed"
                            />
                            <KpiCard
                                icon={<FiBarChart2 className="text-2xl" />}
                                title="Total Volume"
                                value={`$${(portfolioData?.totalVolume || 0).toLocaleString()}`}
                                gradient="from-yellow-400 to-red-500"
                                trend={getKpiTrend(portfolioData?.totalVolume || 0, 2000000)}
                                description="Total trading volume"
                            />
                        </motion.section>
                    </ErrorBoundary>

                    {/* Charts and Rules */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Portfolio Chart */}
                        <ErrorBoundary>
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-xl shadow-lg p-6"
                            >
                                {/* Add Title + Tooltip */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                        Portfolio Chart
                                        <Tooltip tooltipText="Tracks the portfolio's value over different periods of time.">
                                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                        </Tooltip>
                                    </h2>
                                </div>

                                {/* Chart */}
                                <PortfolioChart chartData={portfolioData?.chartData || []} />
                            </motion.div>
                        </ErrorBoundary>

                        {/* Trading Rules */}
                        <ErrorBoundary>
                            <motion.div
                                variants={itemVariants}
                                className="bg-white rounded-xl shadow-lg p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <h2 className="flex items-center gap-1 text-xl font-semibold text-gray-900">
                                            Trading Rules
                                            <Tooltip tooltipText="List of Custom strategies defining how assests are bought or sold based on conditions.">
                                                <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                            </Tooltip>
                                        </h2>
                                    </div>
                                    <Link href="/rule-builder">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            <FiPlus className="mr-1" /> New Rule
                                        </motion.button>
                                    </Link>
                                </div>
                                <TradingRulesList rules={tradingRules} />
                            </motion.div>
                        </ErrorBoundary>
                    </div>

                    {/* Additional Metrics */}
                    <ErrorBoundary>
                        <motion.section
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            <h3 className="flex items-center gap-1 text-xl font-semibold text-gray-900 mb-4">
                                Performance Metrics
                                <Tooltip tooltipText="How your strategies are performing.">
                                    <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                </Tooltip>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">Win Rate
                                        <Tooltip tooltipText="Percentage of trades that were profitable.">
                                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {metrics?.winRate}%
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">Avg. Return
                                        <Tooltip tooltipText="Average profit or loss per trade.">
                                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {metrics?.avgReturn}%
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">Max Drawdown
                                        <Tooltip tooltipText="Largest drop from peak to trough in portfolio value.">
                                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                                        </Tooltip>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {metrics?.maxDrawdown}%
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </ErrorBoundary>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;