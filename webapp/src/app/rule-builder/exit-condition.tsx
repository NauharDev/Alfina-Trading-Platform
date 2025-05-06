import Tooltip from "@/components/ui/tooltip";
import React from "react";
import { useState } from "react";

interface ExitConditionProps {
    handleUpdateExitConditionComponent: (featureKey: string, featureVal: string) => void,
    initialProfitTaking: string | number,
    initialStopLoss: string | number,
    userCreatedFeatures: string[];
}

const ExitConditionComponent: React.FC<ExitConditionProps> = ({ handleUpdateExitConditionComponent, initialProfitTaking, initialStopLoss, userCreatedFeatures }) => {

    const [profitTaking, setProfitTaking] = useState<string | number>(initialProfitTaking);
    const [stopLoss, setStopLoss] = useState<string | number>(initialStopLoss);

    const dropDownOptions = ["Asset Time Bar Opening Price",
        "Asset Time Bar High Price",
        "Asset Time Bar Low Price",
        "Asset Time Bar Close Price",
        "Asset Time Bar Aggregate Volume",
        "Asset Time Bar Volume-Weighted Average Price (VwAP)-Typical Price Approach"
    ].concat(userCreatedFeatures);


    return (
        <div className="mb-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex space-x-4">
                {/* Left Hand Side */}
                <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Profit Taking</h3>
                        <Tooltip tooltipText="Condition for exiting when the strategy gains.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Select Profit Taking
                        </label>
                        <select
                            // ... (existing props)
                            value={profitTaking}
                            onChange={(e) => {
                                setProfitTaking(e.target.value)
                                handleUpdateExitConditionComponent("profitTaking", e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">Selection is required</option>
                            {dropDownOptions.map((feature, index) => (
                                <option key={index} value={feature}>
                                    {feature}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-auto w-px bg-gray-200 my-2" />

                {/* Conditional Operator */}
                <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Stop Loss</h3>
                        <Tooltip tooltipText="Condition for exiting when the strategy loses.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Select a Stop Loss
                        </label>
                        <select
                            value={stopLoss}
                            onChange={(e) => {
                                setStopLoss(e.target.value)
                                handleUpdateExitConditionComponent("stopLoss", e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">Selection is required</option>
                            {dropDownOptions.map((feature, index) => (
                                <option key={index} value={feature}>
                                    {feature}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExitConditionComponent;