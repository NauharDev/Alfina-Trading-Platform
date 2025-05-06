import { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { dashboardService } from '../services/dashboardService';

export const useDashboardData = () => {
  const {
    portfolioData,
    metrics,
    isLoading,
    error,
    setPortfolioData,
    setMetrics,
    setLoading,
    setError,
  } = useDashboardStore();

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [portfolioData, metrics] = await Promise.all([
        dashboardService.fetchPortfolioData(),
        dashboardService.fetchDashboardMetrics(),
      ]);

      setPortfolioData(portfolioData);
      setMetrics(metrics);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    dashboardService.clearCache();
    fetchAllData();
  };

  useEffect(() => {
    fetchAllData();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchAllData, 30000); // Poll every 30 seconds
    
    return () => {
      clearInterval(intervalId);
      dashboardService.clearCache();
    };
  }, []);

  return {
    portfolioData,
    metrics,
    isLoading,
    error,
    refreshData,
  };
}; 