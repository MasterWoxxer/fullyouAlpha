import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NodeProps {
  id: string;
  label: string;
  type: 'user' | 'customer' | 'team';
  x: number;
  y: number;
  relationshipStrength?: number;
}

interface EdgeProps {
  id: string;
  source: string;
  target: string;
  label?: string;
  value: number;
}

interface RelationshipMapProps {
  nodes: NodeProps[];
  edges: EdgeProps[];
  onNodeClick?: (nodeId: string) => void;
}

const RelationshipMap: React.FC<RelationshipMapProps> = ({ nodes, edges, onNodeClick }) => {
  const [svgWidth, setSvgWidth] = useState(800);
  const [svgHeight, setSvgHeight] = useState(600);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  // Update SVG dimensions when container size changes
  useEffect(() => {
    if (!containerRef) return;

    const updateDimensions = () => {
      if (containerRef) {
        setSvgWidth(containerRef.clientWidth);
        setSvgHeight(containerRef.clientHeight);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef]);

  // Get node color based on type
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'user':
        return '#3B82F6'; // primary
      case 'customer':
        return '#10B981'; // secondary
      case 'team':
        return '#8B5CF6'; // accent
      default:
        return '#3B82F6';
    }
  };

  // Get edge color and thickness based on relationship value
  const getEdgeStyle = (value: number) => {
    // Value between 0-100
    const normalizedValue = Math.max(0, Math.min(100, value));
    const strokeWidth = 1 + (normalizedValue / 25);
    
    // Gradient from gray (weak) to blue (strong)
    const colorStrength = Math.floor((normalizedValue / 100) * 255).toString(16).padStart(2, '0');
    return {
      stroke: `#3b82f6${colorStrength}`,
      strokeWidth
    };
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Relationship Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={setContainerRef} 
          className="w-full h-[500px] bg-gray-50 rounded-md overflow-hidden"
        >
          <svg width={svgWidth} height={svgHeight}>
            {/* Render edges first so they appear behind nodes */}
            {edges.map(edge => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              
              if (!source || !target) return null;
              
              const edgeStyle = getEdgeStyle(edge.value);
              
              return (
                <g key={edge.id}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={edgeStyle.stroke}
                    strokeWidth={edgeStyle.strokeWidth}
                    strokeOpacity={0.7}
                  />
                  {/* Optional edge label */}
                  {edge.label && (
                    <text
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2}
                      textAnchor="middle"
                      fill="#6B7280"
                      fontSize="10"
                      dy="-5"
                    >
                      {edge.label}
                    </text>
                  )}
                  {/* Display relationship value */}
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2}
                    textAnchor="middle"
                    fill="#6B7280"
                    fontSize="10"
                    dy="10"
                  >
                    {edge.value}%
                  </text>
                </g>
              );
            })}
            
            {/* Render nodes */}
            {nodes.map(node => (
              <g 
                key={node.id} 
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => onNodeClick && onNodeClick(node.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={node.relationshipStrength ? 20 + (node.relationshipStrength / 10) : 20}
                  fill={getNodeColor(node.type)}
                  fillOpacity={0.8}
                  stroke={getNodeColor(node.type)}
                  strokeWidth={2}
                />
                <text
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="bold"
                  dy="4"
                >
                  {node.label.substring(0, 2)}
                </text>
                <text
                  textAnchor="middle"
                  fill="#374151"
                  fontSize="12"
                  fontWeight="medium"
                  dy="30"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelationshipMap;
