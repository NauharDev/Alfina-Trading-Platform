import { PortfolioData, DashboardMetrics } from '../types/dashboard';

// Cache configuration
const CACHE_DURATION = 30000; // 30 seconds
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class Cache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

class DashboardService {
  private portfolioCache = new Cache<PortfolioData>();
  private metricsCache = new Cache<DashboardMetrics>();

  async fetchPortfolioData(): Promise<PortfolioData> {
    try {
      // Check cache first
      const cached = this.portfolioCache.get('portfolio');
      if (cached) return cached;

      const response = await fetch('/api/portfolio');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.portfolioCache.set('portfolio', data);
      return data;
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  }


  async fetchDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      const cached = this.metricsCache.get('metrics');
      if (cached) return cached;

      const response = await fetch('/api/metrics');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.metricsCache.set('metrics', data);
      return data;
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.portfolioCache.clear();
    this.metricsCache.clear();
  }
}

export const dashboardService = new DashboardService(); 