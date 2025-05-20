import React from 'react';

interface WellnessIndicatorsProps {
  lastVacation: number;
  lastSelfCare: number;
  burnoutRisk: number;
}

const WellnessIndicators: React.FC<WellnessIndicatorsProps> = ({ 
  lastVacation, 
  lastSelfCare,
  burnoutRisk 
}) => {
  // Calculate risk percentages for progress bars
  const vacationRiskPercentage = Math.min(Math.max(lastVacation / 180 * 100, 0), 100);
  const selfCareRiskPercentage = Math.min(Math.max(lastSelfCare / 30 * 100, 0), 100);

  return (
    <div>
      <h4 className="text-lg font-medium mb-4">Team Wellness Indicators</h4>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Last vacation (days ago)</span>
            <span className="text-xl font-semibold">{lastVacation}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-error h-2.5 rounded-full" 
              style={{ width: `${vacationRiskPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Self-care activities (days ago)</span>
            <span className="text-xl font-semibold">{lastSelfCare}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-warning h-2.5 rounded-full" 
              style={{ width: `${selfCareRiskPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Burnout Risk</span>
          </div>
          <div className="w-full h-24 bg-gradient-to-t from-error via-warning to-success rounded-lg relative">
            <div 
              className="absolute w-full h-1 bg-black bg-opacity-20"
              style={{ top: `${100 - burnoutRisk}%` }}
            ></div>
            <div className="absolute bottom-0 left-0 w-full px-4 py-2 flex justify-between text-xs text-white">
              <span>HIGH RISK</span>
              <span>LOW RISK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessIndicators;
