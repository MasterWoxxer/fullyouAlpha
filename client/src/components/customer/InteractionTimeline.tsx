import React from 'react';
import { InteractionItem } from '@/lib/types';
import { format } from 'date-fns';

interface InteractionTimelineProps {
  interactions: InteractionItem[];
}

const InteractionTimeline: React.FC<InteractionTimelineProps> = ({ interactions }) => {
  // Get status colors based on interaction type
  const getStatusColor = (type: string) => {
    switch (type) {
      case 'support':
        return 'bg-green-100 text-green-700';
      case 'purchase':
        return 'bg-blue-100 text-blue-700';
      case 'demo':
        return 'bg-yellow-100 text-yellow-700';
      case 'signup':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Get dot color based on interaction type
  const getDotColor = (type: string) => {
    switch (type) {
      case 'support':
        return 'bg-green-500';
      case 'purchase':
        return 'bg-blue-400';
      case 'demo':
        return 'bg-yellow-400';
      case 'signup':
        return 'bg-purple-400';
      default:
        return 'bg-gray-400';
    }
  };
  
  // Format the relative time (e.g., "2 days ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 60) {
      return '1 month ago';
    } else if (diffInDays < 365) {
      return `${Math.floor(diffInDays / 30)} months ago`;
    } else {
      return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="relative">
      {interactions.map((interaction, index) => (
        <div 
          key={interaction.id} 
          className={`relative border-l-2 border-gray-300 pl-6 ${
            index < interactions.length - 1 ? 'pb-4' : ''
          }`}
        >
          <div className={`absolute w-4 h-4 ${getDotColor(interaction.type)} rounded-full -left-2 top-0 border-2 border-white`}></div>
          <div className="mb-1 flex justify-between">
            <h5 className="font-medium">{interaction.title}</h5>
            <span className="text-xs text-gray-500">{formatRelativeTime(interaction.date)}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{interaction.description}</p>
          <div className="flex justify-between items-center text-xs">
            <span className={`${getStatusColor(interaction.type)} px-2 py-1 rounded-full`}>
              {interaction.status}
            </span>
            <span className="text-gray-500">
              {interaction.metadata && Object.entries(interaction.metadata)[0]?.join(': ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InteractionTimeline;
