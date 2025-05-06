import Tooltip from "@/components/ui/tooltip";
import { useState } from "react";

interface HoldingPeriodComponentProps {
    handleUpdateHoldingPeriod: (featureKey: string, featureVal: string | number) => void;
    initialTargetVar: string,
    initialOperator: string,
    initialBaseHolding: number | "",
    userCreatedFeatures: string[];
}

const HoldingPeriodComponent: React.FC<HoldingPeriodComponentProps> = ({ handleUpdateHoldingPeriod, initialTargetVar, initialOperator, initialBaseHolding, userCreatedFeatures }) => {

    const [targetVar, setTargetVar] = useState<string>(initialTargetVar);
    const [conditionalOperator, setConditionalOperator] = useState<string>(initialOperator);
    const [baseHolding, setBaseHolding] = useState<number | "">(initialBaseHolding);

    const targetVariables = ["Asset Time Bar Opening Price",
        "Asset Time Bar High Price",
        "Asset Time Bar Low Price",
        "Asset Time Bar Close Price",
        "Asset Time Bar Aggregate Volume",
        "Asset Time Bar Volume-Weighted Average Price (VwAP)-Typical Price Approach"
    ].concat(userCreatedFeatures);

    const operators = ["Addition", "Subtraction", "Multiplication", "True Division"];

    const handleBaseHoldingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numbers (or empty input for clearing)
        if (value === "" || /^[0-9]+$/.test(value)) {
            setBaseHolding(value === "" ? "" : Number(value));
            if (/^[0-9]+$/.test(value)) {
                handleUpdateHoldingPeriod("baseHolding", value as unknown as number);
            } else {
                handleUpdateHoldingPeriod("baseHolding", value);
            }
        }
    }

    return (
        <div className="mb-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex space-x-4">
                {/* Left Hand Side */}
                <div className="flex-1">

                    <div className="flex items-center gap-1 mb-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Left Hand Side</h3>
                        <Tooltip tooltipText="Usually the holding duration or condition variable.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide" htmlFor={"targetVar"}>
                            Select a LHS Feature
                        </label>
                        <select
                            // ... (existing props)
                            id="targetVar"
                            value={targetVar}
                            onChange={(e) => {
                                setTargetVar(e.target.value)
                                handleUpdateHoldingPeriod("targetVar", e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">Selection is required</option>
                            {targetVariables.map((feature, index) => (
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
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Conditional Operator</h3>
                        <Tooltip tooltipText="Sets the condition to check for holding.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide" htmlFor={"HPOperator"}>
                            Select a Conditional Operator
                        </label>
                        <select
                            id={"HPOperator"}
                            value={conditionalOperator}
                            onChange={(e) => {
                                setConditionalOperator(e.target.value)
                                handleUpdateHoldingPeriod("conditionalOperator", e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">Selection is required</option>
                            {operators.map((operator, index) => (
                                <option key={index} value={operator}>
                                    {operator}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-auto w-px bg-gray-200 my-2" />

                {/* Right Hand Side */}
                <div className="flex-1">

                    <div className="flex items-center gap-1 mb-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Right Hand Side</h3>
                        <Tooltip tooltipText="Specify how long the asset should be held.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide" htmlFor={"baseHolding"}>
                            Enter a Number
                        </label>
                        <input
                            id="baseHolding"
                            type="number"
                            value={baseHolding}
                            onChange={handleBaseHoldingChange}
                            className="w-64 px-4 py-2 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a number..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HoldingPeriodComponent;