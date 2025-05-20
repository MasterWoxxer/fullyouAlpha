import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface RatingAxis {
  id: string;
  name: string;
  leftLabel: string;
  rightLabel: string;
  topLabel?: string;
  bottomLabel?: string;
}

interface WoxxerFanRatingProps {
  question: string;
  xAxis: RatingAxis;
  yAxis: RatingAxis;
  onSubmitRating?: (rating: { x: number; y: number }) => void;
  showOtherRatings?: boolean;
  otherRatings?: { x: number; y: number; user?: string }[];
}

const WoxxerFanRating: React.FC<WoxxerFanRatingProps> = ({
  question,
  xAxis,
  yAxis,
  onSubmitRating,
  showOtherRatings = false,
  otherRatings = [],
}) => {
  const [rating, setRating] = useState<{ x: number; y: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<'own' | 'others' | 'aggregate'>('own');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // When user clicks on the grid to set their rating
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (submitted) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Invert Y coordinate since 0 is at the top in DOM but we want it at the bottom
    const invertedY = 100 - y;
    
    setRating({ x, y: invertedY });
  };
  
  const handleSubmit = () => {
    if (rating && onSubmitRating) {
      onSubmitRating(rating);
      setSubmitted(true);
    }
  };
  
  // Draw fan lines for axes
  const renderFanLines = () => {
    const lineCount = 20; // Number of lines in each fan
    const lines = [];
    
    // X-axis fan lines (bottom to center)
    for (let i = 0; i <= lineCount; i++) {
      const percentage = (i / lineCount) * 100;
      const startX = percentage;
      const startY = 100; // Bottom
      const endX = 50; // Center point X
      const endY = 50; // Center point Y
      
      lines.push(
        <line 
          key={`x-line-${i}`} 
          x1={`${startX}%`} 
          y1={`${startY}%`} 
          x2={`${endX}%`} 
          y2={`${endY}%`} 
          stroke="#888" 
          strokeWidth="1" 
          strokeOpacity={0.5}
        />
      );
    }
    
    // Y-axis fan lines (left to center)
    for (let i = 0; i <= lineCount; i++) {
      const percentage = (i / lineCount) * 100;
      const startX = 0; // Left
      const startY = percentage;
      const endX = 50; // Center point X
      const endY = 50; // Center point Y
      
      lines.push(
        <line 
          key={`y-line-${i}`} 
          x1={`${startX}%`} 
          y1={`${startY}%`} 
          x2={`${endX}%`} 
          y2={`${endY}%`} 
          stroke="#888" 
          strokeWidth="1" 
          strokeOpacity={0.5}
        />
      );
    }
    
    // Y-axis fan lines (right to center)
    for (let i = 0; i <= lineCount; i++) {
      const percentage = (i / lineCount) * 100;
      const startX = 100; // Right
      const startY = percentage;
      const endX = 50; // Center point X
      const endY = 50; // Center point Y
      
      lines.push(
        <line 
          key={`y2-line-${i}`} 
          x1={`${startX}%`} 
          y1={`${startY}%`} 
          x2={`${endX}%`} 
          y2={`${endY}%`} 
          stroke="#888" 
          strokeWidth="1" 
          strokeOpacity={0.5}
        />
      );
    }
    
    return lines;
  };
  
  const renderRatingMarker = (x: number, y: number, color = '#BE185D', size = 16) => {
    // Invert Y coordinate for display (0 is at the top in DOM)
    const displayY = 100 - y;
    
    return (
      <div 
        className="absolute rounded-full border-2 border-white shadow-md" 
        style={{
          left: `${x}%`,
          top: `${displayY}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      />
    );
  };
  
  const toggleViewMode = () => {
    if (viewMode === 'own') setViewMode('others');
    else if (viewMode === 'others') setViewMode('aggregate');
    else setViewMode('own');
  };

  return (
    <div className="mt-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-1">{question}</h3>
              {submitted && showOtherRatings && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleViewMode}
                  className="mt-2"
                >
                  {viewMode === 'own' ? 'View Others' : viewMode === 'others' ? 'View Heatmap' : 'View Your Rating'}
                </Button>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative aspect-square border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
            <div 
              ref={containerRef}
              className={`absolute inset-0 bg-white dark:bg-gray-900 ${!submitted ? 'cursor-crosshair' : ''}`}
              onClick={!submitted ? handleGridClick : undefined}
            >
              {/* Fan visualization */}
              <svg width="100%" height="100%" className="absolute inset-0">
                {renderFanLines()}
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>{xAxis.leftLabel}</span>
                <span>{xAxis.rightLabel}</span>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between py-4 pl-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>{yAxis.rightLabel}</span>
                <span>{yAxis.leftLabel}</span>
              </div>
              
              {/* Y-axis labels (right side) */}
              <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-between py-4 pr-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span>{yAxis.rightLabel}</span>
                <span>{yAxis.leftLabel}</span>
              </div>
              
              {/* Display rating markers based on view mode */}
              {viewMode === 'own' && rating && renderRatingMarker(rating.x, rating.y)}
              
              {viewMode === 'others' && otherRatings.map((r, i) => (
                renderRatingMarker(r.x, r.y, `hsl(${(i * 30) % 360}, 70%, 60%)`)
              ))}
            </div>
          </div>
          
          {!submitted && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleSubmit}
                disabled={!rating}
                className="px-8"
              >
                Submit Rating
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WoxxerFanRating;