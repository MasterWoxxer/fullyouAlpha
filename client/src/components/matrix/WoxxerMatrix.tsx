import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Dimension {
  id: string;
  name: string;
  icon?: string;
}

interface DataPoint {
  id: string;
  xValue: number; // 0-100
  yValue: number; // 0-100
  size: number; // 1-5
  label: string;
  color?: string;
  layers?: number; // Number of layers to show (stacked rectangles)
}

interface MatrixProps {
  dimensions: Dimension[];
  dataPoints: DataPoint[];
  xDimension: string;
  yDimension: string;
  xAxisLeftLabel?: string;
  xAxisRightLabel?: string;
  yAxisTopLabel?: string;
  yAxisBottomLabel?: string;
  onDimensionChange?: (axis: 'x' | 'y', dimensionId: string) => void;
}

const WoxxerMatrix: React.FC<MatrixProps> = ({
  dimensions,
  dataPoints,
  xDimension,
  yDimension,
  xAxisLeftLabel = 'Growing Market',
  xAxisRightLabel = 'Shrinking Market',
  yAxisTopLabel = 'Blue Ocean',
  yAxisBottomLabel = 'Crowded Space',
  onDimensionChange,
}) => {
  const [selectedXDimension, setSelectedXDimension] = useState(xDimension);
  const [selectedYDimension, setSelectedYDimension] = useState(yDimension);
  const [otherDimensions, setOtherDimensions] = useState<Dimension[]>([]);
  const matrixRef = useRef<HTMLDivElement>(null);
  const gridSize = 5; // 5x5 grid

  // Extract dimensions not used for X or Y axes
  useEffect(() => {
    const unusedDimensions = dimensions.filter(
      d => d.id !== selectedXDimension && d.id !== selectedYDimension
    );
    setOtherDimensions(unusedDimensions);
  }, [dimensions, selectedXDimension, selectedYDimension]);

  const handleXDimensionChange = (value: string) => {
    setSelectedXDimension(value);
    if (onDimensionChange) {
      onDimensionChange('x', value);
    }
  };

  const handleYDimensionChange = (value: string) => {
    setSelectedYDimension(value);
    if (onDimensionChange) {
      onDimensionChange('y', value);
    }
  };

  // Map data point values to grid coordinates
  const getGridPosition = (dataPoint: DataPoint) => {
    // Convert 0-100 values to grid positions (0 to gridSize-1)
    const gridX = Math.floor((dataPoint.xValue / 100) * (gridSize - 0.01));
    const gridY = Math.floor((dataPoint.yValue / 100) * (gridSize - 0.01)); 
    
    // Invert Y axis so 0 is at the bottom
    const invertedY = (gridSize - 1) - gridY;
    
    return { gridX, gridY: invertedY };
  };

  // Generate layer rectangles for a data point
  const generateLayers = (dataPoint: DataPoint, gridX: number, gridY: number) => {
    const layers = dataPoint.layers || 1;
    const layerElements = [];
    const baseSize = 60; // Base size in pixels
    const layerOffset = 6; // Offset for each layer

    for (let i = 0; i < layers; i++) {
      const offset = i * layerOffset;
      const opacity = 1 - (i * 0.15); // Decrease opacity for deeper layers
      
      layerElements.push(
        <rect
          key={`${dataPoint.id}-layer-${i}`}
          x={offset}
          y={offset}
          width={baseSize}
          height={baseSize}
          fill={dataPoint.color || '#6B7280'}
          fillOpacity={opacity}
          stroke="#4B5563"
          strokeWidth="1"
        />
      );
    }
    
    return layerElements;
  };

  // Render grid cells
  const renderGrid = () => {
    const cells = [];
    const cellSize = 120; // Size of each cell in pixels

    // Create grid cells
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        cells.push(
          <div
            key={`cell-${x}-${y}`}
            className="border border-gray-300 dark:border-gray-700"
            style={{
              gridColumn: x + 1,
              gridRow: y + 1,
              width: '100%',
              height: '100%',
            }}
          />
        );
      }
    }

    return cells;
  };

  // Render data points
  const renderDataPoints = () => {
    return dataPoints.map(dataPoint => {
      const { gridX, gridY } = getGridPosition(dataPoint);
      const pointSize = Math.max(10, dataPoint.size * 10); // Convert size 1-5 to pixels
      
      return (
        <div
          key={dataPoint.id}
          className="absolute"
          style={{
            left: `calc(${(gridX + 0.5) * 20}% - ${pointSize/2}px)`, 
            top: `calc(${(gridY + 0.5) * 20}% - ${pointSize/2}px)`,
            zIndex: 10,
          }}
        >
          <div className="relative">
            {/* Stacked rectangles */}
            <svg 
              width={pointSize + 70} 
              height={pointSize + 70} 
              style={{ 
                transform: 'translate(-40px, -40px)',
              }}
            >
              <g transform="translate(40, 40)">
                {generateLayers(dataPoint, gridX, gridY)}
              </g>
            </svg>
            
            {/* Circle marker */}
            <div 
              className="absolute rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{
                width: pointSize,
                height: pointSize,
                backgroundColor: dataPoint.color || '#BE185D', // Use dataPoint color or default
                top: -1 * (pointSize/2),
                left: -1 * (pointSize/2),
                border: '1px solid rgba(0,0,0,0.2)',
                zIndex: 20,
              }}
              title={dataPoint.label}
            />
          </div>
        </div>
      );
    });
  };

  // Render axis labels
  const renderAxisLabels = () => {
    return (
      <>
        {/* X-axis labels */}
        <div 
          className="absolute text-center font-medium text-gray-700 dark:text-gray-300"
          style={{ left: '12%', top: '-30px', width: '20%' }}
        >
          {xAxisLeftLabel}
        </div>
        <div 
          className="absolute text-center font-medium text-gray-700 dark:text-gray-300"
          style={{ right: '12%', top: '-30px', width: '20%' }}
        >
          {xAxisRightLabel}
        </div>
        
        {/* Y-axis labels */}
        <div 
          className="absolute transform -rotate-90 origin-left font-medium text-gray-700 dark:text-gray-300"
          style={{ left: '-60px', top: '15%', width: '20%' }}
        >
          {yAxisTopLabel}
        </div>
        <div 
          className="absolute transform -rotate-90 origin-left font-medium text-gray-700 dark:text-gray-300"
          style={{ left: '-60px', bottom: '15%', width: '20%' }}
        >
          {yAxisBottomLabel}
        </div>
      </>
    );
  };

  return (
    <div className="flex space-x-6 mt-4">
      <div className="flex-grow">
        <Card className="relative p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="mr-2 font-bold text-xl">X</span>
              <Select value={selectedXDimension} onValueChange={handleXDimensionChange}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dimensions.map((dimension) => (
                    <SelectItem key={dimension.id} value={dimension.id}>
                      <div className="flex items-center">
                        <span className="ml-2">{dimension.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center w-16">
              <button
                className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Swap axes"
                onClick={() => {
                  const tempX = selectedXDimension;
                  handleXDimensionChange(selectedYDimension);
                  handleYDimensionChange(tempX);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4M7 4L3 8M7 4L11 8" />
                  <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 font-bold text-xl">Y</span>
              <Select value={selectedYDimension} onValueChange={handleYDimensionChange}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dimensions.map((dimension) => (
                    <SelectItem key={dimension.id} value={dimension.id}>
                      <div className="flex items-center">
                        <span className="ml-2">{dimension.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="relative" style={{ height: '600px' }}>
            {renderAxisLabels()}
            
            {/* Matrix grid */}
            <div 
              ref={matrixRef}
              className="grid relative h-full w-full"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`
              }}
            >
              {renderGrid()}
              {renderDataPoints()}
            </div>
            
            {/* Reset buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Reset view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                  <path d="M17 12a5 5 0 0 0-10 0" />
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Other dimensions panel */}
      <div className="w-80">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Other Dimensions</h3>
            <p className="text-sm text-gray-500 mb-6">Drag to reorder the dimension</p>
            
            {otherDimensions.map((dimension) => (
              <div key={dimension.id} className="mb-6">
                <div className="flex items-center mb-2 gap-2">
                  <span className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                    </svg>
                  </span>
                  <span className="font-medium">{dimension.name}</span>
                  <Select defaultValue="option1">
                    <SelectTrigger className="ml-auto w-8 h-8 p-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">⌄</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Placeholder for dimension visualization */}
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  {dimension.id === 'scenario' && (
                    <div className="flex items-center">
                      <div className="flex items-end space-x-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i} 
                            className="w-6 h-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            style={{ marginTop: `${i * 2}px` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {dimension.id === 'market' && (
                    <div className="w-full h-6 bg-gradient-to-r from-white via-blue-300 to-blue-600 dark:from-gray-700 dark:to-blue-700 rounded-md"></div>
                  )}
                  
                  {dimension.id === 'client' && (
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((size) => (
                        <div 
                          key={size}
                          className="rounded-full bg-red-800"
                          style={{ 
                            width: `${size * 6}px`, 
                            height: `${size * 6}px`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  {dimension.id === 'readiness' && (
                    <div className="flex items-end space-x-1">
                      {[1, 2, 3, 4, 5].map((height) => (
                        <div 
                          key={height}
                          className="w-4 bg-gray-400 dark:bg-gray-600"
                          style={{ height: `${height * 4}px` }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WoxxerMatrix;