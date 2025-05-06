import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DashboardState, PortfolioData, DashboardMetrics } from '../types/dashboard';

interface DashboardStore extends DashboardState {
  // Actions
  setPortfolioData: (data: PortfolioData | null) => void;
  setMetrics: (metrics: DashboardMetrics | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  // Reset state
  reset: () => void;
}

const initialState: DashboardState = {
  portfolioData: null,
  metrics: null,
  isLoading: false,
  error: null,
};

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setPortfolioData: (data) => set({ portfolioData: data }),
      
      setMetrics: (metrics) => set({ metrics: metrics }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'dashboard-store',
    }
  )
); 