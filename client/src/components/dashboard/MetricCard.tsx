import React from 'react';
import { ArrowUpIcon } from '../icons';
import type { MetricCardData } from '@/lib/types';

interface MetricCardProps {
  data: MetricCardData;
}

const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const { title, value, change, changeLabel, icon, iconBgColor, iconColor } = data;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <div className="flex items-center mt-2 text-sm">
        <span className="text-success flex items-center">
          <ArrowUpIcon className="h-4 w-4 mr-1" />
          {change}%
        </span>
        <span className="ml-2 text-gray-500">{changeLabel}</span>
      </div>
    </div>
  );
};

export default MetricCard;
