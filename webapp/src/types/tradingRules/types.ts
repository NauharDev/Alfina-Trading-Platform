export interface Operation {
    id: string,
    lhsFeature: string,
    conditionalOperator: string,
    rhsFeature: string | number, 
    canDelete: boolean
}

export interface ExitCondition {
    profitTaking: string | number,
    stopLoss: string | number
}

export interface HoldingPeriodCondition {
    targetVar: string,
    conditionalOperator: string,
    baseHolding: number | ""
}

export interface TradingRule {
    id: string, 
    ruleName: string, 
    universe: Operation[], 
    primarySignal: Operation, 
    metaSignal: Operation[], 
    holdingPeriod: HoldingPeriodCondition, 
    exitCondition: ExitCondition, 
    creationTime: string, 
    status: "Active" | "Inactive"
}