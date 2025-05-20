import React, { useState } from 'react';
import WorkflowCanvas from './WorkflowCanvas';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { WorkflowNode, Connection, WorkflowTestConfig } from '@/lib/types';

// Default workflow nodes for Version A
const defaultVersionA: { nodes: WorkflowNode[], connections: Connection[] } = {
  nodes: [
    {
      id: 'a1',
      type: 'trigger',
      title: 'New Support Email',
      description: 'Trigger: New customer email',
      icon: 'mail',
      position: { x: 40, y: 20 }
    },
    {
      id: 'a2',
      type: 'action',
      title: 'AI Categorization',
      description: 'Action: Categorize request',
      icon: 'ai',
      position: { x: 200, y: 140 }
    },
    {
      id: 'a3',
      type: 'action',
      title: 'Team Assignment',
      description: 'Action: Route to team',
      icon: 'team',
      position: { x: 360, y: 220 }
    }
  ],
  connections: [
    { source: 'a1', target: 'a2', path: 'M84,72 C84,120 84,120 200,160' },
    { source: 'a2', target: 'a3', path: 'M252,182 C300,182 300,182 360,230' }
  ]
};

// Default workflow nodes for Version B
const defaultVersionB: { nodes: WorkflowNode[], connections: Connection[] } = {
  nodes: [
    {
      id: 'b1',
      type: 'trigger',
      title: 'New Support Email',
      description: 'Trigger: New customer email',
      icon: 'mail',
      position: { x: 40, y: 20 }
    },
    {
      id: 'b2',
      type: 'action',
      title: 'AI Analysis',
      description: 'Action: Analyze sentiment & intent',
      icon: 'ai',
      position: { x: 200, y: 100 }
    },
    {
      id: 'b3',
      type: 'action',
      title: 'Customer History',
      description: 'Action: Fetch relationship data',
      icon: 'customer',
      position: { x: 360, y: 180 }
    },
    {
      id: 'b4',
      type: 'action',
      title: 'Priority Assignment',
      description: 'Action: Route based on relationship',
      icon: 'team',
      position: { x: 360, y: 280 }
    }
  ],
  connections: [
    { source: 'b1', target: 'b2', path: 'M84,72 C84,120 84,120 200,120' },
    { source: 'b2', target: 'b3', path: 'M252,140 C300,140 300,140 350,180' },
    { source: 'b3', target: 'b4', path: 'M400,210 C450,210 450,260 400,280' }
  ]
};

const WorkflowBuilder: React.FC = () => {
  const [testConfig, setTestConfig] = useState<WorkflowTestConfig>({
    isEnabled: true,
    versionATraffic: 50,
    versionBTraffic: 50,
    primaryMetric: 'Customer Satisfaction',
    testDuration: '7 days'
  });
  
  const [versionA, setVersionA] = useState(defaultVersionA);
  const [versionB, setVersionB] = useState(defaultVersionB);
  
  const handleNodeMove = (version: 'A' | 'B', nodeId: string, newPosition: { x: number, y: number }) => {
    if (version === 'A') {
      setVersionA({
        ...versionA,
        nodes: versionA.nodes.map(node => 
          node.id === nodeId ? { ...node, position: newPosition } : node
        )
      });
    } else {
      setVersionB({
        ...versionB,
        nodes: versionB.nodes.map(node => 
          node.id === nodeId ? { ...node, position: newPosition } : node
        )
      });
    }
  };
  
  const handleTestEnabledChange = (enabled: boolean) => {
    setTestConfig({
      ...testConfig,
      isEnabled: enabled
    });
  };
  
  const handleMetricChange = (metric: string) => {
    setTestConfig({
      ...testConfig,
      primaryMetric: metric
    });
  };
  
  const handleDurationChange = (duration: string) => {
    setTestConfig({
      ...testConfig,
      testDuration: duration
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Workflow Builder</h3>
        <div className="flex space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish</Button>
        </div>
      </div>
      
      {/* A/B Testing Control Panel */}
      <div className="flex mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">A/B Testing Configuration</h4>
            <div className="flex items-center space-x-2">
              <Switch 
                id="test-enabled" 
                checked={testConfig.isEnabled}
                onCheckedChange={handleTestEnabledChange}
              />
              <Label htmlFor="test-enabled">Enabled</Label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Version A Traffic</Label>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={testConfig.versionATraffic}
                  readOnly
                  className="w-16 text-center"
                />
                <span className="ml-2">%</span>
              </div>
            </div>
            <div>
              <Label className="mb-1">Version B Traffic</Label>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={testConfig.versionBTraffic}
                  readOnly
                  className="w-16 text-center"
                />
                <span className="ml-2">%</span>
              </div>
            </div>
            <div>
              <Label className="mb-1">Primary Metric</Label>
              <Select 
                value={testConfig.primaryMetric}
                onValueChange={handleMetricChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer Satisfaction">Customer Satisfaction</SelectItem>
                  <SelectItem value="Resolution Time">Resolution Time</SelectItem>
                  <SelectItem value="First Response Time">First Response Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">Test Duration</Label>
              <Select 
                value={testConfig.testDuration}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7 days">7 days</SelectItem>
                  <SelectItem value="14 days">14 days</SelectItem>
                  <SelectItem value="30 days">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workflow Canvas (A/B Test Comparison) */}
      <div className="grid grid-cols-2 gap-6">
        {/* Workflow Version A */}
        <div>
          <div className="mb-4 pb-2 border-b border-gray-200">
            <h4 className="font-medium text-lg">Version A (Current)</h4>
          </div>
          
          <WorkflowCanvas 
            nodes={versionA.nodes} 
            connections={versionA.connections}
            onNodeMove={(nodeId, position) => handleNodeMove('A', nodeId, position)} 
          />
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Average Resolution Time: 4.8 hours</span>
            <span className="text-sm text-gray-500 flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-success mr-1"></span>
              Active
            </span>
          </div>
        </div>
        
        {/* Workflow Version B */}
        <div>
          <div className="mb-4 pb-2 border-b border-gray-200 flex justify-between items-center">
            <h4 className="font-medium text-lg">Version B (Testing)</h4>
            <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full">Testing</span>
          </div>
          
          <WorkflowCanvas 
            nodes={versionB.nodes} 
            connections={versionB.connections}
            onNodeMove={(nodeId, position) => handleNodeMove('B', nodeId, position)} 
          />
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Average Resolution Time: 3.1 hours</span>
            <span className="text-sm text-gray-500 flex items-center">
              <span className="inline-block h-2 w-2 rounded-full bg-warning mr-1"></span>
              Testing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
