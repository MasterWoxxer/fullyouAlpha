import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import RelationshipScale from '@/components/dashboard/RelationshipScale';
import TimeDistribution from '@/components/dashboard/TimeDistribution';
import WellnessIndicators from '@/components/dashboard/WellnessIndicators';
import WorkflowBuilder from '@/components/workflow/WorkflowBuilder';
import CustomerRelationshipScale from '@/components/customer/CustomerRelationshipScale';
import InteractionTimeline from '@/components/customer/InteractionTimeline';

import { 
  WorkflowIcon, 
  HappyIcon, 
  TimeIcon,
  ArrowUpIcon
} from '@/components/icons';

import { 
  createDefaultTeamScales, 
  updateScaleValue, 
  calculateBurnoutRisk, 
  createDefaultTimeDistribution,
  createDefaultCustomerScales,
  createDefaultCustomerInteractions
} from '@/lib/relationshipUtils';

const Dashboard: React.FC = () => {
  // Team Assessment State
  const [teamScales, setTeamScales] = useState(createDefaultTeamScales());
  const [lastVacation, setLastVacation] = useState(124);
  const [lastSelfCare, setLastSelfCare] = useState(14);
  
  // Time Distribution State
  const [timeData, setTimeData] = useState(createDefaultTimeDistribution());
  
  // Customer Relationship State
  const [customerScales, setCustomerScales] = useState(createDefaultCustomerScales());
  const [customerInteractions, setCustomerInteractions] = useState(createDefaultCustomerInteractions());
  
  // Calculate burnout risk based on assessment data
  const burnoutRisk = calculateBurnoutRisk(
    lastVacation,
    lastSelfCare,
    teamScales[0].value, // Energy level
    teamScales[2].value  // Hope level
  );
  
  // Handler for team scale changes
  const handleTeamScaleChange = (index: number, newValue: number) => {
    setTeamScales(updateScaleValue(teamScales, index, newValue));
  };
  
  // Handler for customer scale changes
  const handleCustomerScaleChange = (index: number, newValue: number) => {
    setCustomerScales(updateScaleValue(customerScales, index, newValue));
  };
  
  // Metric card data
  const metricCards = [
    {
      title: 'Active Workflows',
      value: '24',
      change: 12,
      changeLabel: 'from last month',
      icon: <WorkflowIcon className="h-5 w-5" />,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-primary'
    },
    {
      title: 'Customer Satisfaction',
      value: '89%',
      change: 5,
      changeLabel: 'from last month',
      icon: <HappyIcon className="h-5 w-5" />,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-secondary'
    },
    {
      title: 'Response Time',
      value: '3.2m',
      change: 18,
      changeLabel: 'improvement',
      icon: <TimeIcon className="h-5 w-5" />,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-accent'
    }
  ];

  return (
    <>
      <Header title="Customer Service Workflow Automation" />
      
      <div className="p-6">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {metricCards.map((card, index) => (
            <MetricCard key={index} data={card} />
          ))}
        </div>

        {/* Relationship Assessment Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Team Relationship Assessment</h3>
          
          <RelationshipScale 
            scales={teamScales}
            onScaleChange={handleTeamScaleChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Distribution */}
            <TimeDistribution data={timeData} />
            
            {/* Wellness Indicators */}
            <WellnessIndicators 
              lastVacation={lastVacation}
              lastSelfCare={lastSelfCare}
              burnoutRisk={burnoutRisk}
            />
          </div>
        </div>

        {/* Workflow Builder Section */}
        <WorkflowBuilder />
        
        {/* Customer Relationship Context Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Customer Relationship Context</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Assessment Scale */}
            <div>
              <h4 className="text-lg font-medium mb-4">Customer Relationship Assessment</h4>
              <CustomerRelationshipScale 
                scales={customerScales}
                onScaleChange={handleCustomerScaleChange}
              />
            </div>
            
            {/* Customer Interaction History */}
            <div>
              <h4 className="text-lg font-medium mb-4">Customer Interaction Timeline</h4>
              <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto" style={{ maxHeight: '320px' }}>
                <InteractionTimeline interactions={customerInteractions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
