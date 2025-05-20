import React, { useState, useRef } from 'react';
import { WorkflowNode, Connection } from '@/lib/types';
import { EmailIcon, AIIcon, TeamIcon, CustomerServiceIcon } from '../icons';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  connections: Connection[];
  onNodeMove: (nodeId: string, newPosition: { x: number, y: number }) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ nodes, connections, onNodeMove }) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialNodePos, setInitialNodePos] = useState({ x: 0, y: 0 });

  const getNodeIcon = (iconType: string) => {
    switch (iconType) {
      case 'mail':
        return <EmailIcon className="h-5 w-5" />;
      case 'ai':
        return <AIIcon className="h-5 w-5" />;
      case 'team':
        return <TeamIcon className="h-5 w-5" />;
      case 'customer':
        return <CustomerServiceIcon className="h-5 w-5" />;
      default:
        return <EmailIcon className="h-5 w-5" />;
    }
  };

  const getIconBgColor = (iconType: string) => {
    switch (iconType) {
      case 'mail':
        return 'bg-blue-100';
      case 'ai':
        return 'bg-purple-100';
      case 'team':
        return 'bg-green-100';
      case 'customer':
        return 'bg-yellow-100';
      default:
        return 'bg-blue-100';
    }
  };

  const getIconTextColor = (iconType: string) => {
    switch (iconType) {
      case 'mail':
        return 'text-primary';
      case 'ai':
        return 'text-accent';
      case 'team':
        return 'text-secondary';
      case 'customer':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string, position: { x: number, y: number }) => {
    e.preventDefault();
    setActiveNodeId(nodeId);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setInitialNodePos(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeNodeId || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const deltaX = e.clientX - initialMousePos.x;
    const deltaY = e.clientY - initialMousePos.y;
    
    // Calculate new position
    let newX = initialNodePos.x + deltaX;
    let newY = initialNodePos.y + deltaY;
    
    // Constrain to canvas boundaries
    const nodeWidth = 224; // 56px * 4 for w-56
    const nodeHeight = 84; // Approximate height of the node
    
    newX = Math.max(0, Math.min(newX, canvasRect.width - nodeWidth));
    newY = Math.max(0, Math.min(newY, canvasRect.height - nodeHeight));
    
    onNodeMove(activeNodeId, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setActiveNodeId(null);
  };

  const handleMouseLeave = () => {
    if (activeNodeId) {
      setActiveNodeId(null);
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="bg-gray-50 border border-gray-200 rounded-lg p-6 h-96 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* SVG Layer for Connections */}
      <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none">
        {connections.map((connection, index) => (
          <path 
            key={index} 
            d={connection.path} 
            className="stroke-primary stroke-2 stroke-dasharray-5" 
            fill="none"
          />
        ))}
      </svg>
      
      {/* Nodes Layer */}
      {nodes.map((node) => (
        <div 
          key={node.id}
          className="workflow-node absolute bg-white rounded-lg shadow-sm p-4 cursor-move hover:shadow-md transition-all duration-200 w-56"
          style={{ 
            left: `${node.position.x}px`, 
            top: `${node.position.y}px`,
            transform: activeNodeId === node.id ? 'translateY(-2px)' : 'none',
            zIndex: activeNodeId === node.id ? 10 : 1
          }}
          onMouseDown={(e) => handleNodeMouseDown(e, node.id, node.position)}
        >
          <div className="flex items-center mb-2">
            <div className={`w-8 h-8 ${getIconBgColor(node.icon)} rounded-md flex items-center justify-center ${getIconTextColor(node.icon)} mr-2`}>
              {getNodeIcon(node.icon)}
            </div>
            <h5 className="font-medium">{node.title}</h5>
          </div>
          <p className="text-sm text-gray-500">{node.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkflowCanvas;
