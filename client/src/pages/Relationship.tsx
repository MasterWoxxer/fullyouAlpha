import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import RelationshipMap from '@/components/relationship/RelationshipMap';
import CustomerRelationshipScale from '@/components/customer/CustomerRelationshipScale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  createDefaultCustomerScales, 
  updateScaleValue,
} from '@/lib/relationshipUtils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Relationship: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [customerScales, setCustomerScales] = useState(createDefaultCustomerScales());
  const [showTeamConnections, setShowTeamConnections] = useState(true);
  const [showCustomerConnections, setShowCustomerConnections] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Sample relationship map data
  const nodes = [
    { id: 'user1', label: 'John Doe', type: 'user', x: 400, y: 250, relationshipStrength: 80 },
    { id: 'user2', label: 'Sarah Kim', type: 'user', x: 250, y: 150, relationshipStrength: 90 },
    { id: 'user3', label: 'David Chen', type: 'user', x: 550, y: 150, relationshipStrength: 75 },
    { id: 'user4', label: 'Maria Lopez', type: 'user', x: 250, y: 350, relationshipStrength: 60 },
    { id: 'user5', label: 'James Wilson', type: 'user', x: 550, y: 350, relationshipStrength: 65 },
    
    { id: 'cust1', label: 'Acme Corp', type: 'customer', x: 100, y: 100, relationshipStrength: 85 },
    { id: 'cust2', label: 'TechStart Inc', type: 'customer', x: 700, y: 100, relationshipStrength: 70 },
    { id: 'cust3', label: 'Global Services', type: 'customer', x: 700, y: 400, relationshipStrength: 60 },
    { id: 'cust4', label: 'Local Business', type: 'customer', x: 100, y: 400, relationshipStrength: 45 },
    
    { id: 'team1', label: 'Support Team', type: 'team', x: 200, y: 250, relationshipStrength: 95 },
    { id: 'team2', label: 'Sales Team', type: 'team', x: 600, y: 250, relationshipStrength: 80 },
  ];
  
  const edges = [
    // User to Team relationships
    { id: 'e1', source: 'user1', target: 'team1', value: 90 },
    { id: 'e2', source: 'user1', target: 'team2', value: 85 },
    { id: 'e3', source: 'user2', target: 'team1', value: 95 },
    { id: 'e4', source: 'user3', target: 'team2', value: 90 },
    { id: 'e5', source: 'user4', target: 'team1', value: 80 },
    { id: 'e6', source: 'user5', target: 'team2', value: 75 },
    
    // Team to Customer relationships
    { id: 'e7', source: 'team1', target: 'cust1', value: 85 },
    { id: 'e8', source: 'team1', target: 'cust4', value: 65 },
    { id: 'e9', source: 'team2', target: 'cust2', value: 80 },
    { id: 'e10', source: 'team2', target: 'cust3', value: 70 },
    
    // Direct User to Customer relationships
    { id: 'e11', source: 'user2', target: 'cust1', value: 75 },
    { id: 'e12', source: 'user3', target: 'cust2', value: 70 },
    { id: 'e13', source: 'user4', target: 'cust4', value: 60 },
    { id: 'e14', source: 'user5', target: 'cust3', value: 65 },
  ];
  
  // Filter edges based on toggles
  const filteredEdges = edges.filter(edge => {
    // Get the node types for this edge
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return false;
    
    // Filter team connections if disabled
    if (!showTeamConnections && 
        (sourceNode.type === 'team' || targetNode.type === 'team')) {
      return false;
    }
    
    // Filter customer connections if disabled
    if (!showCustomerConnections && 
        (sourceNode.type === 'customer' || targetNode.type === 'customer')) {
      return false;
    }
    
    return true;
  });
  
  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };
  
  // Handle customer scale changes
  const handleCustomerScaleChange = (index: number, newValue: number) => {
    setCustomerScales(updateScaleValue(customerScales, index, newValue));
  };
  
  // Get selected node data
  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  return (
    <>
      <Header title="Relationship Management" />
      
      <div className="p-6">
        <div className="mb-6">
          <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="map">Network Map</TabsTrigger>
                <TabsTrigger value="assessment">Relationship Assessment</TabsTrigger>
                <TabsTrigger value="profiles">Team Profiles</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="team-connections" 
                    checked={showTeamConnections}
                    onCheckedChange={setShowTeamConnections}
                  />
                  <Label htmlFor="team-connections">Show Team Connections</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="customer-connections" 
                    checked={showCustomerConnections}
                    onCheckedChange={setShowCustomerConnections}
                  />
                  <Label htmlFor="customer-connections">Show Customer Connections</Label>
                </div>
                
                <Button variant="outline">Export Data</Button>
              </div>
            </div>
            
            <TabsContent value="map" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RelationshipMap 
                    nodes={nodes} 
                    edges={filteredEdges}
                    onNodeClick={handleNodeClick}
                  />
                </div>
                
                <div>
                  {selectedNode ? (
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>{selectedNode.label} Profile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Type</h4>
                            <p className="capitalize">{selectedNode.type}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Relationship Strength</h4>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${selectedNode.relationshipStrength}%` }}
                              ></div>
                            </div>
                            <p className="text-right text-sm text-gray-500 mt-1">{selectedNode.relationshipStrength}%</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Connected to</h4>
                            <ul className="space-y-2">
                              {filteredEdges
                                .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                                .map(edge => {
                                  const connectedNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                                  const connectedNode = nodes.find(n => n.id === connectedNodeId);
                                  
                                  return connectedNode ? (
                                    <li key={edge.id} className="flex justify-between items-center text-sm">
                                      <span>{connectedNode.label}</span>
                                      <div className="flex items-center">
                                        <span className="mr-2">{edge.value}%</span>
                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                                          <div 
                                            className="h-1.5 bg-primary rounded-full" 
                                            style={{ width: `${edge.value}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </li>
                                  ) : null;
                                })}
                            </ul>
                          </div>
                          
                          {selectedNode.type === 'customer' && (
                            <div className="mt-4">
                              <Button size="sm" className="w-full">View Full Profile</Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>Relationship Details</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                        <div className="text-gray-400 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-gray-500">Select a node on the relationship map to view details</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assessment" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Relationship Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CustomerRelationshipScale 
                      scales={customerScales}
                      onScaleChange={handleCustomerScaleChange}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between text-sm text-gray-500 font-medium pb-2 border-b">
                        <span>Date</span>
                        <span>Change</span>
                        <span>Assessor</span>
                      </div>
                      
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span>{new Date(Date.now() - i * 86400000 * 5).toLocaleDateString()}</span>
                          <div className="flex items-center">
                            <span className={i % 2 === 0 ? "text-success" : "text-error"}>
                              {i % 2 === 0 ? "+" : "-"}{Math.floor(Math.random() * 10) + 1}%
                            </span>
                          </div>
                          <span>Team Member {i}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="profiles" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nodes
                  .filter(node => node.type === 'user')
                  .map(user => (
                    <Card key={user.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{user.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                              {user.label.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-medium">{user.label}</h4>
                              <p className="text-sm text-gray-500">Team Member</p>
                              <p className="text-sm text-gray-500">Joined 2 years ago</p>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium mb-1">Relationship Strength</h5>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${user.relationshipStrength}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0%</span>
                              <span>{user.relationshipStrength}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2">Key Relationships</h5>
                          <ul className="space-y-2">
                            {edges
                              .filter(edge => edge.source === user.id || edge.target === user.id)
                              .slice(0, 3)
                              .map(edge => {
                                const connectedNodeId = edge.source === user.id ? edge.target : edge.source;
                                const connectedNode = nodes.find(n => n.id === connectedNodeId);
                                
                                return connectedNode ? (
                                  <li key={edge.id} className="flex justify-between items-center text-sm">
                                    <span>{connectedNode.label}</span>
                                    <div className="flex items-center">
                                      <span className="mr-2">{edge.value}%</span>
                                      <div className="w-12 h-1.5 bg-gray-200 rounded-full">
                                        <div 
                                          className="h-1.5 bg-primary rounded-full" 
                                          style={{ width: `${edge.value}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </li>
                                ) : null;
                              })}
                          </ul>
                        </div>
                        
                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Relationship;
