import { NextResponse } from 'next/server';
import { DashboardMetrics } from '../../../types/dashboard';

export async function GET() {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 200));

  const dummyMetrics: DashboardMetrics = {
    winRate: 65.8,
    avgReturn: 2.3,
    maxDrawdown: 5.4,
  };

  return NextResponse.json(dummyMetrics);
} 