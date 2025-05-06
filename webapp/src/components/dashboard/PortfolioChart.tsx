// src/components/PortfolioChart.tsx
"use client";

import React from 'react';
import { InteractiveLineChart } from '../charts/InteractiveLineChart';
import { chartThemes } from '../charts/ChartConfig';

interface ChartPoint {
  date: string;
  value: number;
}

interface PortfolioChartProps {
  chartData: ChartPoint[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ chartData }) => {
  return (
    <InteractiveLineChart
      chartData={chartData}
      theme={chartThemes.portfolio}
      initialTimeRange="1M"
      height={350}
      showTimeRangeSelector={true}
    />
  );
};

export default PortfolioChart;

