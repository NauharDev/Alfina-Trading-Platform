import { ReactNode } from "react";

interface TooltipProps { // define the types
    children: ReactNode;
    tooltipText: string;
    position?: "top" | "bottom";
}

export default function Tooltip({ children, tooltipText, position = "top" }: TooltipProps) {
    // position defaults to top, unless set during usage
    const positionClasses = position == "top" ? "bottom-full mb-1" : "top-full mt-1";

    return (
        <div className="relative group inline-block">
            {children}
            <div className={`absolute left-1/2 transform -translate-x-1/2 ${positionClasses} w-max px-3 py-2 text-xs text-white bg-gray-800 bg-opacity-70 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50`}>
                {tooltipText}
            </div>
        </div >
    );
}