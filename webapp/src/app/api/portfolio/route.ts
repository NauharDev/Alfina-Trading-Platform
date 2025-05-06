import { NextResponse } from 'next/server';
import { PortfolioData } from '../../../types/dashboard';

// Generate dummy chart data for the last 30 days
const generateChartData = () => {
  const data = [];
  const baseValue = 100000;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a random value that trends upward
    const randomFactor = 1 + (Math.random() * 0.1 - 0.03); // -3% to +7% change
    const value = baseValue * (1 + (30 - i) * 0.02) * randomFactor;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
};

export async function GET() {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  const dummyData: PortfolioData = {
    portfolioValue: 156789.42,
    totalTrades: 1247,
    totalVolume: 2345678,
    chartData: generateChartData(),
  };

  return NextResponse.json(dummyData);
}