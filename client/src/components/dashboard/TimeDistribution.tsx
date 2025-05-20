import React from 'react';
import { TimeDistributionData } from '@/lib/types';

interface TimeDistributionProps {
  data: TimeDistributionData;
}

const TimeDistribution: React.FC<TimeDistributionProps> = ({ data }) => {
  // Calculate total to generate proportions
  const actualTotal = data.actual.reduce((sum, item) => sum + item.hours, 0);
  const optimalTotal = data.optimal.reduce((sum, item) => sum + item.hours, 0);

  // Generate conic gradient for actual chart
  const generateConicGradient = (data: Array<{ category: string; hours: number; color: string }>, total: number) => {
    let gradient = '';
    let currentDegree = 0;
    
    data.forEach((item) => {
      const degrees = (item.hours / total) * 360;
      gradient += `${item.color} ${currentDegree}deg ${currentDegree + degrees}deg, `;
      currentDegree += degrees;
    });
    
    // Remove trailing comma and space
    return gradient.slice(0, -2);
  };

  const actualGradient = generateConicGradient(data.actual, actualTotal);
  const optimalGradient = generateConicGradient(data.optimal, optimalTotal);

  return (
    <div>
      <h4 className="text-lg font-medium mb-4">Time Distribution</h4>
      <div className="flex space-x-6">
        <div className="flex-1">
          <div className="relative h-48 w-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gray-100"></div>
            {/* Actual time chart */}
            <div className="absolute inset-0">
              <div className="h-48 w-48 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-full h-full" 
                  style={{ background: `conic-gradient(${actualGradient})` }}
                ></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center">
                <p className="text-sm font-medium">24hr<br/>ACTUAL</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="relative h-48 w-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gray-100"></div>
            {/* Optimal time chart */}
            <div className="absolute inset-0">
              <div className="h-48 w-48 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-full h-full" 
                  style={{ background: `conic-gradient(${optimalGradient})` }}
                ></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center">
                <p className="text-sm font-medium">24hr<br/>OPTIMAL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {data.actual.map((item, index) => (
          <div key={index} className="flex items-center">
            <span 
              className="h-3 w-3 inline-block rounded-sm mr-1" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeDistribution;
