import React, { useState, useEffect, useRef } from 'react';
import { AssessmentScale } from '@/lib/types';
import { calculateMarkerPosition } from '@/lib/relationshipUtils';

interface CustomerRelationshipScaleProps {
  scales: AssessmentScale[];
  onScaleChange: (index: number, newValue: number) => void;
}

const CustomerRelationshipScale: React.FC<CustomerRelationshipScaleProps> = ({ scales, onScaleChange }) => {
  const scaleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number | null>(null);
  const [activeScale, setActiveScale] = useState<number | null>(null);
  const [scaleValues, setScaleValues] = useState<{ [key: number]: number }>({});
  
  // Initialize scale values
  useEffect(() => {
    const initialValues = scales.reduce((acc, scale, index) => {
      acc[index] = scale.value;
      return acc;
    }, {} as { [key: number]: number });
    setScaleValues(initialValues);
  }, [scales]);

  const startDrag = (index: number) => {
    setActiveMarkerIndex(index);
    setActiveScale(index);
    document.body.style.cursor = 'grabbing';
    
    // Add active class to the marker for styling
    if (markerRefs.current[index]) {
      markerRefs.current[index]?.classList.add('scale-110');
    }
  };

  const stopDrag = () => {
    // Remove active class
    if (activeMarkerIndex !== null && markerRefs.current[activeMarkerIndex]) {
      markerRefs.current[activeMarkerIndex]?.classList.remove('scale-110');
    }
    
    setActiveMarkerIndex(null);
    setActiveScale(null);
    document.body.style.cursor = 'default';
  };

  const handleMove = (clientX: number) => {
    if (activeMarkerIndex === null) return;
    
    const scaleElement = scaleRefs.current[activeMarkerIndex];
    if (!scaleElement) return;
    
    const scaleRect = scaleElement.getBoundingClientRect();
    
    // Calculate position percentage
    let percentage = ((clientX - scaleRect.left) / scaleRect.width) * 100;
    
    // Clamp between 5% and 95% to keep marker visible
    percentage = Math.max(5, Math.min(95, percentage));
    
    // Update local state
    setScaleValues(prev => ({
      ...prev,
      [activeMarkerIndex]: percentage
    }));
    
    // Update the marker position and notify parent
    onScaleChange(activeMarkerIndex, percentage);
  };

  const moveMarker = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault(); // Prevent scrolling when dragging
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Handle direct click on track (not just drag)
  const handleTrackClick = (e: React.MouseEvent, index: number) => {
    const scaleElement = scaleRefs.current[index];
    if (!scaleElement) return;
    
    const scaleRect = scaleElement.getBoundingClientRect();
    let percentage = ((e.clientX - scaleRect.left) / scaleRect.width) * 100;
    percentage = Math.max(5, Math.min(95, percentage));
    
    // Update local state
    setScaleValues(prev => ({
      ...prev,
      [index]: percentage
    }));
    
    // Update parent
    onScaleChange(index, percentage);
  };

  useEffect(() => {
    // Add event listeners for dragging (mouse)
    document.addEventListener('mousemove', moveMarker);
    document.addEventListener('mouseup', stopDrag);
    
    // Add event listeners for touch devices
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('touchcancel', stopDrag);
    
    return () => {
      document.removeEventListener('mousemove', moveMarker);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopDrag);
      document.removeEventListener('touchcancel', stopDrag);
    };
  }, [activeMarkerIndex]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="space-y-6">
        {scales.map((scale, index) => (
          <div key={index} className="scale-container">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{scale.name}</span>
              {activeScale === index && (
                <span className="text-sm font-medium text-primary animate-fadeIn">
                  {Math.round(scaleValues[index] || scale.value)}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="w-32 text-right text-sm pr-1 text-gray-600 dark:text-gray-400">{scale.leftLabel}</span>
              <div 
                ref={el => scaleRefs.current[index] = el} 
                className="relative flex-1 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 cursor-pointer"
                onClick={(e) => handleTrackClick(e, index)}
              >
                <div
                  ref={el => markerRefs.current[index] = el}
                  className="scale-marker absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white dark:bg-gray-800 rounded-full border-2 border-primary shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center transition-all duration-200 touch-manipulation z-10"
                  style={{ left: calculateMarkerPosition(scaleValues[index] ?? scale.value) }}
                  onMouseDown={() => startDrag(index)}
                  onTouchStart={() => startDrag(index)}
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="w-32 text-left text-sm pl-1 text-gray-600 dark:text-gray-400">{scale.rightLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRelationshipScale;
