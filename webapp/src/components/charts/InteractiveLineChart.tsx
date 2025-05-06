"use client";

import React, { useState, useRef, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Scale,
  CoreScaleOptions,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { motion } from 'framer-motion';
import { ChartPoint, SelectionRange, TimeRange, ChartTheme, timeRanges, getBaseChartOptions } from './ChartConfig';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

interface InteractiveLineChartProps {
  chartData: ChartPoint[];
  theme: ChartTheme;
  initialTimeRange?: TimeRange;
  height?: number;
  showTimeRangeSelector?: boolean;
  formatValue?: (value: number) => string;
  formatChange?: (value: number) => string;
}

export const InteractiveLineChart: React.FC<InteractiveLineChartProps> = ({
  chartData,
  theme,
  initialTimeRange = '1M',
  height = 350,
  showTimeRangeSelector = true,
  formatValue = (value: number) => `$${value.toLocaleString()}`,
  formatChange = (value: number) => `$${Math.abs(value).toLocaleString()}`,
}) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialTimeRange);
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [selection, setSelection] = useState<SelectionRange | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredData = useMemo(() => {
    if (!chartData?.length) return [];
    
    const range = timeRanges.find(r => r.label === selectedRange)?.days || 30;
    const validData = chartData.filter(point => point && point.date && point.value !== undefined);
    return validData.slice(-range);
  }, [chartData, selectedRange]);

  const calculateChange = () => {
    if (filteredData.length < 2) return { value: 0, percentage: 0 };
    const firstValue = filteredData[0].value;
    const lastValue = filteredData[filteredData.length - 1].value;
    const change = lastValue - firstValue;
    const percentage = firstValue !== 0 ? (change / firstValue) * 100 : 0;
    return { value: change, percentage };
  };

  const change = calculateChange();

  const data = useMemo(() => {
    if (!filteredData.length) {
      return {
        labels: [],
        datasets: [{
          label: 'Value',
          data: [],
          fill: true,
          borderColor: theme.primary,
          backgroundColor: theme.primaryLighter,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      };
    }

    const labels = filteredData.map(point => point.date);
    const values = filteredData.map(point => point.value);
    const minValue = Math.min(...values.filter(v => v !== null && !isNaN(v))) * 0.95;
    
    if (!selection) {
      return {
        labels,
        datasets: [{
          label: 'Value',
          data: values,
          fill: true,
          borderColor: theme.primary,
          backgroundColor: theme.primaryLighter,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
        }]
      };
    }

    return {
      labels,
      datasets: [
        {
          label: 'Value',
          data: values,
          fill: false,
          borderColor: theme.primary,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 10,
        },
        {
          label: 'Selected Region',
          data: values,
          fill: {
            target: { value: minValue }
          },
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
            gradient.addColorStop(0, theme.selected);
            gradient.addColorStop(1, theme.selectedLight);
            return gradient;
          },
          borderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 10,
          segment: {
            backgroundColor: (ctx: unknown) => {
              const index = (ctx as any).p0DataIndex;
              const isInRange = index >= Math.min(selection.startIndex, selection.endIndex) &&
                              index <= Math.max(selection.startIndex, selection.endIndex);
              return isInRange ? theme.selected : 'transparent';
            }
          }
        },
        {
          label: 'Unselected Region',
          data: values,
          fill: {
            target: { value: minValue }
          },
          backgroundColor: theme.primaryLighter,
          borderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 10,
          segment: {
            backgroundColor: (ctx: unknown) => {
              const index = (ctx as any).p0DataIndex;
              const isInRange = index >= Math.min(selection.startIndex, selection.endIndex) &&
                              index <= Math.max(selection.startIndex, selection.endIndex);
              return isInRange ? 'transparent' : theme.primaryLighter;
            }
          }
        }
      ]
    };
  }, [filteredData, selection, theme]);

  const options = useMemo(() => {
    const baseOptions = getBaseChartOptions(theme);
    return {
      ...baseOptions,
      scales: {
        ...baseOptions.scales,
        y: {
          ...baseOptions.scales?.y,
          min: filteredData.length 
            ? Math.min(...filteredData.map(d => d.value).filter(v => v !== null && !isNaN(v))) * 0.95 
            : 0,
          ticks: {
            ...baseOptions.scales?.y?.ticks,
            callback: function(this: Scale<CoreScaleOptions>, tickValue: string | number) {
              return formatValue(Number(tickValue));
            },
          },
        },
      },
      onHover: (event: any, elements: any[]) => {
        if (!isDragging && elements.length > 0 && filteredData[elements[0].index]) {
          const dataIndex = elements[0].index;
          setHoveredPoint(filteredData[dataIndex]);
        }
      },
    };
  }, [filteredData, isDragging, theme, formatValue]);

  const getDataIndexFromX = (x: number) => {
    if (!chartRef.current || !filteredData.length) return -1;
    const chart = chartRef.current;
    const xScale = chart.scales.x;
    const dataIndex = Math.round(xScale.getValueForPixel(x));
    return Math.max(0, Math.min(dataIndex, filteredData.length - 1));
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!chartRef.current || !containerRef.current || !filteredData.length) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const dataIndex = getDataIndexFromX(x);
    
    if (dataIndex >= 0 && filteredData[dataIndex]) {
      setIsDragging(true);
      setSelection({
        startX: x,
        endX: x,
        startIndex: dataIndex,
        endIndex: dataIndex,
        startValue: filteredData[dataIndex].value,
        endValue: filteredData[dataIndex].value,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !chartRef.current || !containerRef.current || !selection || !filteredData.length) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const dataIndex = getDataIndexFromX(x);
    
    if (dataIndex >= 0 && filteredData[dataIndex]) {
      setSelection({
        ...selection,
        endX: x,
        endIndex: dataIndex,
        endValue: filteredData[dataIndex].value,
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const hasSelection = selection && 
      Math.abs(selection.startIndex - selection.endIndex) > 0;
    
    setIsDragging(false);
    
    if (!hasSelection) {
      setSelection(null);
    }
  };

  const calculateSelectionMetrics = () => {
    if (!selection || !filteredData.length) return null;
    
    const startPoint = filteredData[selection.startIndex];
    const endPoint = filteredData[selection.endIndex];
    
    if (!startPoint || !endPoint) return null;
    
    const startValue = startPoint.value;
    const endValue = endPoint.value;
    const percentChange = startValue !== 0 ? ((endValue - startValue) / startValue) * 100 : 0;
    const absoluteChange = endValue - startValue;
    
    return {
      percentChange,
      absoluteChange,
      startDate: startPoint.date,
      endDate: endPoint.date,
    };
  };

  const metrics = calculateSelectionMetrics();

  return (
    <div className="relative h-full">
      {filteredData.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4">
            {/* Change Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg ${
                change.percentage >= 0 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-red-50 text-red-600'
              }`}
            >
              <span className="text-2xl font-bold">
                {change.percentage >= 0 ? '+' : ''}{change.percentage.toFixed(2)}%
              </span>
              <span className="ml-2 text-sm opacity-75">
                ({formatChange(change.value)})
              </span>
            </motion.div>

            {/* Time Range Selector */}
            {showTimeRangeSelector && (
              <div className="flex space-x-1">
                {timeRanges.map(({ label }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRange(label)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedRange === label
                        ? `bg-[${theme.primary}] text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: selectedRange === label ? theme.primary : undefined
                    }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Chart Container */}
          <div 
            ref={containerRef}
            className="relative select-none flex-grow"
            style={{ 
              height: `${height}px`,
              minHeight: '300px',
              width: '100%'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute inset-0">
              <Line ref={chartRef} data={data} options={options} />
            </div>
            
            {/* Visual Guide Lines */}
            {isDragging && selection && (
              <>
                <div 
                  className="absolute top-0 bottom-0 w-px pointer-events-none"
                  style={{ 
                    left: selection.startX,
                    backgroundColor: theme.primaryLight
                  }} 
                />
                <div 
                  className="absolute top-0 bottom-0 w-px pointer-events-none"
                  style={{ 
                    left: selection.endX,
                    backgroundColor: theme.primaryLight
                  }} 
                />
              </>
            )}
            
            {/* Selection Metrics */}
            {metrics && !isDragging && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${
                  metrics.percentChange >= 0 
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium mb-1">
                    {metrics.startDate} → {metrics.endDate}
                  </div>
                  <div className="text-2xl font-bold">
                    {metrics.percentChange >= 0 ? '+' : ''}{metrics.percentChange.toFixed(2)}%
                  </div>
                  <div className="text-sm opacity-75">
                    {formatChange(metrics.absoluteChange)}
                  </div>
                </div>
                <button
                  onClick={() => setSelection(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-100 
                           flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-md"
                >
                  ×
                </button>
              </motion.div>
            )}

            {/* Hover Tooltip */}
            {hoveredPoint && !isDragging && !selection && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bg-white p-3 rounded-lg shadow-lg border border-gray-200"
                style={{
                  left: chartRef.current?.canvas.getBoundingClientRect().left || 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}
              >
                <p className="text-sm text-gray-600">{hoveredPoint.date}</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatValue(hoveredPoint.value)}
                </p>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No data available for the selected time range</p>
        </div>
      )}
    </div>
  );
}; 