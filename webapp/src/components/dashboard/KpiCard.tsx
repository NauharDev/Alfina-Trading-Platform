import React from 'react';
import { motion } from 'framer-motion';
import type { Tooltip as ReactTooltip } from 'react-tooltip';
import { Tooltip } from 'react-tooltip';

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  icon, 
  gradient, 
  trend, 
  description 
}) => {
  const cardId = `kpi-card-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-r ${gradient} shadow-lg rounded-xl p-6 text-white relative overflow-hidden`}
      data-tooltip-id={cardId}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8 opacity-10">
        <div className="w-full h-full rounded-full bg-white"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              {icon}
            </div>
            <h3 className="ml-3 text-sm font-medium opacity-90">{title}</h3>
          </div>
          
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-200' : 'text-red-200'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        {/* Value */}
        <p className="text-3xl font-bold tracking-tight mb-1">
          {value}
        </p>

        {/* Subtle Description */}
        {description && (
          <p className="text-xs opacity-75">
            {description}
          </p>
        )}
      </div>

      {/* Tooltip */}
      <Tooltip
        id={cardId}
        place="top"
      />
      <div id={`tooltip-${cardId}`} className="hidden">
        <div className="p-2">
          <p className="font-semibold mb-1">{title}</p>
          <p className="text-sm opacity-90">{description}</p>
          {trend && (
            <p className="text-sm mt-1">
              {trend.isPositive ? 'Increased' : 'Decreased'} by {Math.abs(trend.value)}% from last period
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default KpiCard;