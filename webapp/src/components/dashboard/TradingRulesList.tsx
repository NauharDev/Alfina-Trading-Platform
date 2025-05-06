"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiArrowDown, FiSearch, FiCheck, FiSliders, FiX } from "react-icons/fi";
import { ExitCondition, HoldingPeriodCondition, Operation, TradingRule } from "@/types/tradingRules/types";

type SortField = 'ruleName' | 'category';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
    field: SortField;
    direction: SortDirection;
}

const ruleInfoMap: Record<string, string> = {
    "Asset Time Bar Opening Price": "Open Price",
    "Asset Time Bar High Price": "High Price",
    "Asset Time Bar Low Price": "Low Price",
    "Asset Time Bar Close Price": "Close Price",
    "Asset Time Bar Aggregate Volume": "Agg. Volume",
    "Asset Time Bar Volume-Weighted Average Price (VwAP)-Typical Price Approach": "VwAP",
    "Equals": " = ",
    "Greater Equal": " >= ",
    "Greater Than": " > ",
    "Less Equal": " <= ",
    "Less Than": " < ",
    "Addition": " + ",
    "Subtraction": " - ",
    "Multiplication": " * ",
    "True Division": " / "
}

const TradingRulesList: React.FC<{ rules?: TradingRule[] }> = ({ rules = [] }) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'ruleName', direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const sortedAndFilteredRules = useMemo(() => {
        console.log("rules", rules);
        return rules
            .filter(rule =>
                rule.ruleName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                const direction = sortConfig.direction === 'asc' ? 1 : -1;
                return direction * a.ruleName.localeCompare(b.ruleName);
            });
    }, [rules, sortConfig, searchTerm]);

    const handleSort = () => {
        setSortConfig(current => ({
            field: 'ruleName',
            direction: current.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const SortIcon = () => {
        return sortConfig.direction === 'desc'
            ? <FiArrowDown className="ml-1" />
            : <FiArrowUp className="ml-1" />;
    };

    function parseOperationInfo(universeOperations: Operation[]) {
        const operation = universeOperations[0];
        const lhs = ruleInfoMap[operation.lhsFeature] ?? operation.lhsFeature;
        const operator = ruleInfoMap[operation.conditionalOperator] ?? operation.conditionalOperator;
        const rhs = ruleInfoMap[operation.rhsFeature] ?? operation.rhsFeature;
        return `${lhs}${operator}${rhs}`;
    }

    function parseHoldingPeriodInfo(holdingPeriod: HoldingPeriodCondition) {
        const lhs = ruleInfoMap[holdingPeriod.targetVar] ?? holdingPeriod.targetVar;
        const operator = ruleInfoMap[holdingPeriod.conditionalOperator] ?? holdingPeriod.conditionalOperator;
        const rhs = holdingPeriod.baseHolding;
        return `${lhs}${operator}${rhs.toString()}`;
    }

    function parseProfitTaking(exitCondition: ExitCondition) {
        const profitTaking = ruleInfoMap[exitCondition.profitTaking] ?? exitCondition.profitTaking;
        return profitTaking;
    }
    function parseStopLoss(exitCondition: ExitCondition) {
        const stopLoss = ruleInfoMap[exitCondition.stopLoss] ?? exitCondition.stopLoss;
        return stopLoss;
    }

    // Updated TableHeader for Rule column only
    const RuleHeader = () => (
        <th
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
            onClick={handleSort}
        >
            <div className="flex items-center">
                Rule
                <SortIcon />
            </div>
        </th>
    );

    return (
        <div className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex gap-4 mb-4 w-full">
                {/* Search Bar */}
                <div className="flex-[4]">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search rules..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                   focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Sort Menu */}
                <div className="flex-[1]">
                    <div className="relative">
                        <FiSliders className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-200 
                   focus:ring-2 focus:ring-indigo-500"
                        >
                            {/* Options will go here */}
                        </select>
                    </div>
                </div>
            </div>

            {/* Rules Table */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="overflow-hidden">
                    <div className="scrollbar-hide overflow-y-auto max-h-[300px]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <RuleHeader />
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Universe
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Signal
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Holding Period
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profit Taking
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stop Loss
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            {/* // In your TradingRulesList.tsx */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                <AnimatePresence>
                                    {sortedAndFilteredRules.map((rule, index) => (
                                        <motion.tr
                                            key={rule.id}
                                            layout="position"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15,
                                                    delay: index * 0.02
                                                }
                                            }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2.5 text-sm font-medium text-gray-900">
                                                {rule.ruleName}
                                            </td>
                                            <td className="px-4 py-2.5 text-sm text-gray-900">
                                                {parseOperationInfo(rule.universe)}
                                            </td>
                                            <td className="px-4 py-2.5 text-sm text-gray-900">
                                                {parseOperationInfo([rule.primarySignal])}
                                            </td>
                                            <td className="px-4 py-2.5 text-sm text-gray-900">
                                                {parseHoldingPeriodInfo(rule.holdingPeriod)}
                                            </td>
                                            <td className="px-4 py-2.5 text-sm text-gray-900">
                                                {parseProfitTaking(rule.exitCondition)}
                                            </td>
                                            <td className="px-4 py-2.5 text-sm text-gray-900">
                                                {parseStopLoss(rule.exitCondition)}
                                            </td>
                                            <td className="px-4 py-2.5 text-center">
                                                {rule.status === "Active" ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <FiCheck className="w-3 h-3 mr-1" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        <FiX className="w-3 h-3 mr-1" />
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradingRulesList;
