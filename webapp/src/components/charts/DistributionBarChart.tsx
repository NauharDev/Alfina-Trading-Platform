"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Scale,
  CoreScaleOptions,
} from 'chart.js';
import { ChartPoint, ChartTheme } from './ChartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DistributionBarChartProps {
  chartData: ChartPoint[];
  theme: ChartTheme;
  height: number;
  formatValue?: (value: number) => string;
}

export const DistributionBarChart: React.FC<DistributionBarChartProps> = ({
  chartData,
  theme,
  height,
  formatValue = (value: number) => `${value.toFixed(2)}%`,
}) => {
  const data: ChartData<'bar'> = {
    labels: chartData.map(point => point.date),
    datasets: [
      {
        label: 'Distribution',
        data: chartData.map(point => point.value),
        backgroundColor: theme.primaryLight,
        borderColor: theme.primary,
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 'flex' as const,
        maxBarThickness: 50,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => formatValue(context.parsed.y),
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          maxRotation: 0,
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          callback: function(this: Scale<CoreScaleOptions>, tickValue: number | string) {
            return formatValue(Number(tickValue));
          },
          color: 'rgb(156, 163, 175)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
}; 