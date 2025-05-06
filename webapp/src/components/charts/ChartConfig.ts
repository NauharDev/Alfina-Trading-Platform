import { ChartOptions, Scale, CoreScaleOptions, Tick } from 'chart.js';

export interface ChartPoint {
  date: string;
  value: number;
}

export interface SelectionRange {
  startX: number;
  endX: number;
  startIndex: number;
  endIndex: number;
  startValue: number;
  endValue: number;
}

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export interface ChartTheme {
  primary: string;
  primaryLight: string;
  primaryLighter: string;
  selected: string;
  selectedLight: string;
  positive: string;
  positiveLight: string;
  negative: string;
  negativeLight: string;
}

export const chartThemes: Record<string, ChartTheme> = {
  portfolio: {
    primary: 'rgb(99, 102, 241)', // indigo-600
    primaryLight: 'rgba(99, 102, 241, 0.3)',
    primaryLighter: 'rgba(99, 102, 241, 0.1)',
    selected: 'rgba(99, 102, 241, 0.4)',
    selectedLight: 'rgba(99, 102, 241, 0.15)',
    positive: 'rgb(34, 197, 94)', // green-600
    positiveLight: 'rgba(34, 197, 94, 0.2)',
    negative: 'rgb(239, 68, 68)', // red-600
    negativeLight: 'rgba(239, 68, 68, 0.2)',
  },
  analytics: {
    primary: 'rgb(14, 165, 233)', // sky-600
    primaryLight: 'rgba(14, 165, 233, 0.3)',
    primaryLighter: 'rgba(14, 165, 233, 0.1)',
    selected: 'rgba(14, 165, 233, 0.4)',
    selectedLight: 'rgba(14, 165, 233, 0.15)',
    positive: 'rgb(34, 197, 94)',
    positiveLight: 'rgba(34, 197, 94, 0.2)',
    negative: 'rgb(239, 68, 68)',
    negativeLight: 'rgba(239, 68, 68, 0.2)',
  },
  risk: {
    primary: 'rgb(168, 85, 247)', // purple-600
    primaryLight: 'rgba(168, 85, 247, 0.3)',
    primaryLighter: 'rgba(168, 85, 247, 0.1)',
    selected: 'rgba(168, 85, 247, 0.4)',
    selectedLight: 'rgba(168, 85, 247, 0.15)',
    positive: 'rgb(34, 197, 94)',
    positiveLight: 'rgba(34, 197, 94, 0.2)',
    negative: 'rgb(239, 68, 68)',
    negativeLight: 'rgba(239, 68, 68, 0.2)',
  },
};

export const timeRanges: { label: TimeRange; days: number }[] = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
  { label: 'ALL', days: 999 },
];

export const getBaseChartOptions = (theme: ChartTheme): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 20  // Extra padding for x-axis labels
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxTicksLimit: 5,
        color: 'rgb(156, 163, 175)',
        padding: 8  // Add padding to x-axis ticks
      },
    },
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        callback: function(this: Scale<CoreScaleOptions>, tickValue: number | string) {
          return `$${Number(tickValue).toLocaleString()}`;
        },
        color: 'rgb(156, 163, 175)',
        padding: 8  // Add padding to y-axis ticks
      },
      beginAtZero: true,  // Ensure the scale starts at 0
    },
  },
}); 