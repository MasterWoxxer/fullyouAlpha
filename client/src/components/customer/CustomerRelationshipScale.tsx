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

  const startDrag = (index: number) => {
    setActiveMarkerIndex(index);
  };

  const stopDrag = () => {
    setActiveMarkerIndex(null);
  };

  const moveMarker = (e: MouseEvent) => {
    if (activeMarkerIndex === null) return;
    
    const scaleElement = scaleRefs.current[activeMarkerIndex];
    if (!scaleElement) return;
    
    const scaleRect = scaleElement.getBoundingClientRect();
    
    // Calculate position percentage
    let percentage = ((e.clientX - scaleRect.left) / scaleRect.width) * 100;
    
    // Clamp between 5% and 95% to keep marker visible
    percentage = Math.max(5, Math.min(95, percentage));
    
    // Update the marker position and notify parent
    onScaleChange(activeMarkerIndex, percentage);
  };

  useEffect(() => {
    // Add event listeners for dragging
    document.addEventListener('mousemove', moveMarker);
    document.addEventListener('mouseup', stopDrag);
    
    return () => {
      document.removeEventListener('mousemove', moveMarker);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [activeMarkerIndex]);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="mb-6">
        {scales.map((scale, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">{scale.name}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-right text-sm pr-4">{scale.leftLabel}</span>
              <div 
                ref={el => scaleRefs.current[index] = el} 
                className="relative flex-1 h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
              >
                <div
                  ref={el => markerRefs.current[index] = el}
                  className="scale-marker absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md cursor-pointer flex items-center justify-center"
                  style={{ left: calculateMarkerPosition(scale.value) }}
                  onMouseDown={() => startDrag(index)}
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="w-32 text-left text-sm pl-4">{scale.rightLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRelationshipScale;
