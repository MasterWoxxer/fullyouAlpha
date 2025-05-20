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

interface RatingPoint {
  x: number;
  y: number;
  color?: string;
}

interface WoxxerFanRatingProps {
  question: string;
  xAxis: RatingAxis;
  yAxis: RatingAxis;
  onSubmitRatings?: (ratings: RatingPoint[]) => void;
  showOtherRatings?: boolean;
  otherRatings?: RatingPoint[];
  maxRatings?: number; // Maximum number of rating points allowed
}

const WoxxerFanRating: React.FC<WoxxerFanRatingProps> = ({
  question,
  xAxis,
  yAxis,
  onSubmitRatings,
  showOtherRatings = false,
  otherRatings = [],
  maxRatings = 3, // Default to 3 ratings as mentioned
}) => {
  const [ratings, setRatings] = useState<RatingPoint[]>([]);
  const [activeRatingIndex, setActiveRatingIndex] = useState<number>(-1);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<'own' | 'others' | 'aggregate'>('own');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Colors for the different rating points
  const ratingColors = [
    '#BE185D', // Pink
    '#3B82F6', // Blue
    '#10B981', // Green
  ];
  
  // When user clicks on the grid to add or move a rating
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (submitted) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Invert Y coordinate since 0 is at the top in DOM but we want it at the bottom
    const invertedY = 100 - y;
    
    // If we're already at the max number of ratings, replace the oldest one
    // unless we're in edit mode (activeRatingIndex >= 0)
    if (activeRatingIndex >= 0) {
      // Update the active rating
      const updatedRatings = [...ratings];
      updatedRatings[activeRatingIndex] = { 
        ...updatedRatings[activeRatingIndex],
        x, 
        y: invertedY 
      };
      setRatings(updatedRatings);
      setActiveRatingIndex(-1); // Exit edit mode
    } else {
      // Add a new rating
      if (ratings.length >= maxRatings) {
        // Replace oldest rating (shift and add new one)
        const updatedRatings = [...ratings.slice(1), {
          x, 
          y: invertedY,
          color: ratingColors[ratings.length % ratingColors.length]
        }];
        setRatings(updatedRatings);
      } else {
        // Add a new rating
        setRatings([...ratings, {
          x,
          y: invertedY,
          color: ratingColors[ratings.length % ratingColors.length]
        }]);
      }
    }
  };
  
  // Start editing an existing rating point
  const startEditRating = (index: number) => {
    if (!submitted) {
      setActiveRatingIndex(index);
    }
  };
  
  const handleSubmit = () => {
    if (ratings.length > 0 && onSubmitRatings) {
      onSubmitRatings(ratings);
      setSubmitted(true);
    }
  };
  
  // Render fan lines exactly like the earlier versions with finger-wide lines for precise rating
  const renderFanLines = () => {
    // We'll use paths instead of lines to create finger-wide fan segments
    const paths = [];
    
    // Create grid lines first (very light)
    const gridLineCount = 5; // 5x5 grid (subtle background)
    for (let i = 1; i < gridLineCount; i++) {
      const position = (i / gridLineCount) * 100;
      
      // Vertical grid lines
      paths.push(
        <line 
          key={`grid-v-${i}`}
          x1={`${position}%`}
          y1="0%"
          x2={`${position}%`}
          y2="100%"
          stroke="#ddd"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      );
      
      // Horizontal grid lines
      paths.push(
        <line 
          key={`grid-h-${i}`}
          x1="0%"
          y1={`${position}%`}
          x2="100%"
          y2={`${position}%`}
          stroke="#ddd"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      );
    }
    
    // Create fan lines spreading from each edge
    const fanCount = 30; // More lines for precision in 50-100 range
    
    // Function to create a fan line with finger-width
    const createFanLine = (
      startX: number, 
      startY: number, 
      endX: number, 
      endY: number, 
      index: number, 
      quadrant: string
    ) => {
      // Calculate width based on position to create finger-wide lines
      const width = 3 + (index / fanCount) * 3;
      const opacity = 0.1 + (index / fanCount) * 0.5;
      
      return (
        <line
          key={`fan-${quadrant}-${index}`}
          x1={`${startX}%`}
          y1={`${startY}%`}
          x2={`${endX}%`}
          y2={`${endY}%`}
          stroke="#666"
          strokeWidth={width}
          strokeOpacity={opacity}
          strokeLinecap="round"
        />
      );
    };
    
    // Left edge fans (horizontal)
    for (let i = 0; i <= fanCount; i++) {
      const yPos = (i / fanCount) * 100;
      paths.push(createFanLine(0, yPos, 50, 50, i, 'left'));
    }
    
    // Right edge fans (horizontal)
    for (let i = 0; i <= fanCount; i++) {
      const yPos = (i / fanCount) * 100;
      paths.push(createFanLine(100, yPos, 50, 50, i, 'right'));
    }
    
    // Top edge fans (vertical)
    for (let i = 0; i <= fanCount; i++) {
      const xPos = (i / fanCount) * 100;
      paths.push(createFanLine(xPos, 0, 50, 50, i, 'top'));
    }
    
    // Bottom edge fans (vertical)
    for (let i = 0; i <= fanCount; i++) {
      const xPos = (i / fanCount) * 100;
      paths.push(createFanLine(xPos, 100, 50, 50, i, 'bottom'));
    }
    
    return paths;
  };
  
  const renderRatingMarker = (point: RatingPoint, index: number, isActive: boolean = false) => {
    // Invert Y coordinate for display (0 is at the top in DOM)
    const displayY = 100 - point.y;
    const size = isActive ? 20 : 16;
    
    return (
      <div 
        key={`rating-point-${index}`}
        className={`absolute rounded-full border-2 border-white shadow-md transition-all duration-200 ${isActive ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          left: `${point.x}%`,
          top: `${displayY}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: point.color || '#BE185D',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          cursor: submitted ? 'default' : 'pointer'
        }}
        onClick={() => !submitted && startEditRating(index)}
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
              
              {/* Object to be rated in the center */}
              <div className="absolute left-1/4 right-1/4 top-1/3 bottom-1/3 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center border-2 border-gray-300 dark:border-gray-600 max-w-xs">
                  <p className="text-sm font-medium">{question}</p>
                </div>
              </div>
              
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
              
              {/* Display rating markers */}
              {viewMode === 'own' && ratings.map((point, i) => 
                renderRatingMarker(point, i, i === activeRatingIndex)
              )}
              
              {viewMode === 'others' && otherRatings.map((point, i) => (
                renderRatingMarker({
                  ...point, 
                  color: `hsl(${(i * 30) % 360}, 70%, 60%)`
                }, i + 100) // Add offset to ensure unique keys
              ))}
              
              {/* Rating Counter */}
              {!submitted && (
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium shadow-md">
                  {ratings.length} / {maxRatings}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-center items-center space-x-4">
            {!submitted && (
              <>
                <div className="text-sm text-gray-500">
                  {ratings.length === 0 
                    ? 'Click to add rating points (up to 3)' 
                    : ratings.length < maxRatings 
                      ? `Click to add ${maxRatings - ratings.length} more rating points` 
                      : 'Click on a point to edit its position'}
                </div>
                <Button 
                  onClick={handleSubmit}
                  disabled={ratings.length === 0}
                  className="px-8"
                >
                  Submit Ratings
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WoxxerFanRating;