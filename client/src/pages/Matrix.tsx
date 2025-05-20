import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WoxxerMatrix from '@/components/matrix/WoxxerMatrix';

// Sample data for the matrix visualization
const dimensions = [
  { id: 'industry', name: 'Industry/Sector' },
  { id: 'management', name: 'Management Team' },
  { id: 'scenario', name: 'Scenario Analysis' },
  { id: 'market', name: 'Compared to Market' },
  { id: 'client', name: 'Client/Objective Data' },
  { id: 'readiness', name: 'Readiness' },
];

// Generate some sample data points
const generateSampleDataPoints = () => {
  const dataPoints = [];
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'];
  
  // Create data points for each sector with varying positions and properties
  for (let i = 0; i < sectors.length; i++) {
    const xBase = (i % 3) * 30 + 10; // Spread across x axis
    const yBase = Math.floor(i / 3) * 30 + 10; // Spread across y axis
    
    // Create 1-3 data points for each sector
    const pointCount = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < pointCount; j++) {
      // Add some randomness to position
      const xOffset = Math.random() * 20 - 10;
      const yOffset = Math.random() * 20 - 10;
      
      dataPoints.push({
        id: `point-${i}-${j}`,
        label: `${sectors[i]} Project ${j+1}`,
        xValue: Math.min(95, Math.max(5, xBase + xOffset)),
        yValue: Math.min(95, Math.max(5, yBase + yOffset)),
        size: Math.floor(Math.random() * 4) + 2, // Size between 2-5
        color: '#4B5563', // Default gray color
        layers: Math.floor(Math.random() * 3) + 1, // 1-3 layers
      });
    }
  }
  
  return dataPoints;
};

const MatrixPage: React.FC = () => {
  const [xDimension, setXDimension] = useState('industry');
  const [yDimension, setYDimension] = useState('management');
  const [dataPoints] = useState(generateSampleDataPoints());
  
  const handleDimensionChange = (axis: 'x' | 'y', dimensionId: string) => {
    if (axis === 'x') {
      setXDimension(dimensionId);
    } else {
      setYDimension(dimensionId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Matrix</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Visualize multi-dimensional data relationships with interactive matrices
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Multi-Dimensional Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This matrix lets you position items on multiple dimensions. Choose any two dimensions for 
            X and Y axes, while other dimensions can be represented through additional visual variables 
            like size, color, or stacking.
          </p>
          
          <WoxxerMatrix 
            dimensions={dimensions}
            dataPoints={dataPoints}
            xDimension={xDimension}
            yDimension={yDimension}
            onDimensionChange={handleDimensionChange}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About Woxxer Matrix Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Woxxer Matrix provides a powerful way to visualize multi-dimensional data. Any Woxxable scale 
            can be displayed as X or Y axes, while other dimensions can be shown through visual variables like:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Stacking Depth:</strong> Shows layers similar to cards in solitaire</li>
            <li><strong>Border Styles:</strong> Different border types represent categories</li>
            <li><strong>Shading/Colors:</strong> Intensity or hue conveys additional dimensions</li>
            <li><strong>Size:</strong> Object size corresponds to quantitative values</li>
            <li><strong>Shape:</strong> Different shapes represent categorical data</li>
          </ul>
          
          <p>
            This approach allows for analyzing complex relationships across 6+ dimensions simultaneously, 
            creating a rich information environment that helps identify patterns and insights that might 
            be missed in traditional visualization methods.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatrixPage;