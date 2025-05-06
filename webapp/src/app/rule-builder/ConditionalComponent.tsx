import Tooltip from "@/components/ui/tooltip";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface ConditionalComponentProps {
    handleUpdate: (featureKey: string, featureVal: string, metaSignal?: boolean, uuid?: string,) => void;
    handleDelete: (id: string, metaSignal: boolean) => void;
    initialLhs: string,
    initialOperator: string,
    initialRhs: string | number,
    signal: boolean,
    metaSignal: boolean
    userCreatedFeatures: string[],
    uuid: string,
    canDelete: boolean;
}

const ConditionalComponent: React.FC<ConditionalComponentProps> = ({ handleUpdate, handleDelete, initialLhs, initialOperator, initialRhs, signal, metaSignal, userCreatedFeatures, uuid, canDelete }) => {

    const [lhsFeature, setLhsFeature] = useState(initialLhs);
    const [conditionalOperator, setConditionalOperator] = useState(initialOperator);
    const [rhsFeature, setRhsFeature] = useState(initialRhs);

    const lhsFeatures = ["Asset Time Bar Opening Price",
        "Asset Time Bar High Price",
        "Asset Time Bar Low Price",
        "Asset Time Bar Close Price",
        "Asset Time Bar Aggregate Volume",
        "Asset Time Bar Volume-Weighted Average Price (VwAP)-Typical Price Approach"
    ].concat(userCreatedFeatures);

    const operators = ["Equals", "Greater Equal", "Greater Than", "Less Equal", "Less Than"];

    const rhsFeatures = ["Asset Time Bar Opening Price",
        "Asset Time Bar High Price",
        "Asset Time Bar Low Price",
        "Asset Time Bar Close Price",
        "Asset Time Bar Aggregate Volume",
        "Asset Time Bar Volume-Weighted Average Price (VwAP)-Typical Price Approach"
    ].concat(userCreatedFeatures);

    return (
        <div className="mb-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative">
            <div className="flex space-x-4">
                {/* Left Hand Side */}
                <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                        <h3 className="text-sm font-semibold text-gray-700">Left Hand Side</h3>
                        <Tooltip tooltipText="The indicator or metric you want to compare.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                            htmlFor={"lhsFeature" + uuid}
                        >
                            Select a LHS Feature
                        </label>
                        <select
                            id={"lhsFeature" + uuid}
                            value={lhsFeature}
                            onChange={(e) => {
                                setLhsFeature(e.target.value);
                                if (signal) {
                                    handleUpdate("lhsFeature", e.target.value, false);
                                } else if (metaSignal) {
                                    handleUpdate("lhsFeature", e.target.value, true, uuid);
                                } else {
                                    handleUpdate("lhsFeature", e.target.value, false, uuid);
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">Selection is required</option>
                            {lhsFeatures.map((feature, index) => (
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
                        <h3 className="text-sm font-semibold text-gray-700">Conditional Operator</h3>
                        <Tooltip tooltipText="Defines how the left and right sides are compared.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                            htmlFor={"operator" + uuid}
                        >
                            Select a Conditional Operator
                        </label>
                        <select
                            id={"operator" + uuid}
                            value={conditionalOperator}
                            onChange={(e) => {
                                setConditionalOperator(e.target.value);
                                if (signal) {
                                    handleUpdate("conditionalOperator", e.target.value);
                                } else if (metaSignal) {
                                    handleUpdate("conditionalOperator", e.target.value, true, uuid);
                                } else {
                                    handleUpdate("conditionalOperator", e.target.value, false, uuid);
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors"
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
                        <Tooltip tooltipText="The value or feature you're comparing to.">
                            <span className="text-gray-400 cursor-help text-sm">ⓘ</span>
                        </Tooltip>
                    </div>
                    <div className="space-y-1">
                        <label
                            className="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                            htmlFor={"rhsFeature" + uuid}
                        >
                            Select a RHS Feature
                        </label>
                        <select
                            id={"rhsFeature" + uuid}
                            value={rhsFeature}
                            onChange={(e) => {
                                setRhsFeature(e.target.value);
                                if (signal) {
                                    handleUpdate("rhsFeature", e.target.value);
                                } else if (metaSignal) {
                                    handleUpdate("rhsFeature", e.target.value, true, uuid);
                                } else {
                                    handleUpdate("rhsFeature", e.target.value, false, uuid);
                                }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <option value="">Selection is required</option>
                            {rhsFeatures.map((feature, index) => (
                                <option key={index} value={feature}>
                                    {feature}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Delete Button */}
            {
                canDelete && (
                    <button
                        onClick={() => handleDelete(uuid, metaSignal)}
                        className="absolute bottom-0.5 right-0.5 text-red-500 hover:text-red-700"
                    >
                        <FiTrash2 size={20} />
                    </button>
                )
            }

        </div>
    );
};
export default ConditionalComponent;