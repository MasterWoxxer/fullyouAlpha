import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@/components/icons';

const ABTesting: React.FC = () => {
  const activeTests = [
    {
      id: 1,
      name: 'Customer Support Workflow',
      metrics: [
        { name: 'Resolution Time', versionA: 4.8, versionB: 3.2, unit: 'hours', improvement: 33 },
        { name: 'Customer Satisfaction', versionA: 85, versionB: 92, unit: '%', improvement: 8 },
        { name: 'First Response Time', versionA: 36, versionB: 14, unit: 'minutes', improvement: 61 }
      ],
      status: 'active',
      progress: 67,
      daysRemaining: 5,
      confidence: 94
    },
    {
      id: 2,
      name: 'Email Response Templates',
      metrics: [
        { name: 'Open Rate', versionA: 28, versionB: 42, unit: '%', improvement: 50 },
        { name: 'Response Rate', versionA: 12, versionB: 18, unit: '%', improvement: 50 },
        { name: 'Customer Satisfaction', versionA: 78, versionB: 82, unit: '%', improvement: 5 }
      ],
      status: 'active',
      progress: 45,
      daysRemaining: 9,
      confidence: 76
    }
  ];

  return (
    <>
      <Header title="A/B Testing" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Active A/B Tests</h3>
          <Button>Create Test</Button>
        </div>
        
        {activeTests.map(test => (
          <Card key={test.id} className="mb-8">
            <CardHeader className="bg-blue-50">
              <div className="flex justify-between items-center">
                <CardTitle>{test.name}</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="font-medium">Progress: </span>
                    <span>{test.progress}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Days remaining: </span>
                    <span>{test.daysRemaining}</span>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
              <Progress value={test.progress} className="mt-2" />
            </CardHeader>
            
            <CardContent className="pt-6">
              <Tabs defaultValue="metrics">
                <TabsList className="mb-4">
                  <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic Distribution</TabsTrigger>
                  <TabsTrigger value="settings">Test Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="metrics">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-sm font-medium pb-2 border-b">
                      <span className="w-1/3">Metric</span>
                      <span className="w-1/4 text-center">Version A</span>
                      <span className="w-1/4 text-center">Version B</span>
                      <span className="w-1/4 text-center">Improvement</span>
                    </div>
                    
                    {test.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="w-1/3 font-medium">{metric.name}</span>
                        <span className="w-1/4 text-center">{metric.versionA} {metric.unit}</span>
                        <span className="w-1/4 text-center">{metric.versionB} {metric.unit}</span>
                        <span className="w-1/4 text-center flex items-center justify-center text-success">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          {metric.improvement}%
                        </span>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t mt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Statistical Confidence</h4>
                          <p className="text-sm text-gray-500">Based on current sample size</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold">{test.confidence}%</span>
                          <p className="text-sm text-gray-500">confidence level</p>
                        </div>
                      </div>
                      <Progress value={test.confidence} className="mt-2" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="traffic">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-4">Traffic Distribution</h4>
                      <div className="flex h-8 rounded-md overflow-hidden">
                        <div className="bg-blue-500 w-1/2 flex items-center justify-center text-white text-sm font-medium">
                          Version A: 50%
                        </div>
                        <div className="bg-green-500 w-1/2 flex items-center justify-center text-white text-sm font-medium">
                          Version B: 50%
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">User Engagement</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="text-2xl font-bold">{Math.floor(Math.random() * 500) + 500}</div>
                          <div className="text-sm text-gray-500">Version A users</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="text-2xl font-bold">{Math.floor(Math.random() * 500) + 500}</div>
                          <div className="text-sm text-gray-500">Version B users</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium mb-4">Test Configuration</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-sm font-medium">Test Duration</span>
                          <span className="text-sm">14 days</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-sm font-medium">Primary Metric</span>
                          <span className="text-sm">Customer Satisfaction</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-sm font-medium">Secondary Metrics</span>
                          <span className="text-sm">Resolution Time, First Response Time</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="text-sm font-medium">Segment</span>
                          <span className="text-sm">All Users</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Actions</h4>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">Edit Test Configuration</Button>
                        <Button variant="outline" className="w-full justify-start">Pause Test</Button>
                        <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
                          Declare Winner (Version B)
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ABTesting;
