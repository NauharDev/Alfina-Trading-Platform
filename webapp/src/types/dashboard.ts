export interface PortfolioData {
  portfolioValue: number;
  totalTrades: number;
  totalVolume: number;
  chartData: ChartPoint[];
}

export interface ChartPoint {
  date: string;
  value: number;
}

export interface DashboardMetrics {
  winRate: number;
  avgReturn: number;
  maxDrawdown: number;
}

export interface DashboardState {
  portfolioData: PortfolioData | null;
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
} 