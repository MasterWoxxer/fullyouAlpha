import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import MetricsChart from '@/components/analytics/MetricsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from '@/components/icons';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  
  // Sample data for charts
  const relationshipScoreData = [
    { month: 'Jan', customers: 65, team: 78, satisfaction: 82 },
    { month: 'Feb', customers: 68, team: 80, satisfaction: 85 },
    { month: 'Mar', customers: 72, team: 79, satisfaction: 83 },
    { month: 'Apr', customers: 75, team: 82, satisfaction: 87 },
    { month: 'May', customers: 73, team: 85, satisfaction: 89 },
    { month: 'Jun', customers: 78, team: 87, satisfaction: 92 }
  ];
  
  const resolutionTimeData = [
    { month: 'Jan', versionA: 4.8, versionB: 3.6 },
    { month: 'Feb', versionA: 4.6, versionB: 3.4 },
    { month: 'Mar', versionA: 4.5, versionB: 3.2 },
    { month: 'Apr', versionA: 4.3, versionB: 3.0 },
    { month: 'May', versionA: 4.2, versionB: 2.8 },
    { month: 'Jun', versionA: 4.0, versionB: 2.6 }
  ];
  
  const workflowEfficiencyData = [
    { month: 'Jan', automatedTasks: 320, manualTasks: 180 },
    { month: 'Feb', automatedTasks: 350, manualTasks: 160 },
    { month: 'Mar', automatedTasks: 410, manualTasks: 145 },
    { month: 'Apr', automatedTasks: 440, manualTasks: 130 },
    { month: 'May', automatedTasks: 495, manualTasks: 110 },
    { month: 'Jun', automatedTasks: 520, manualTasks: 90 }
  ];

  return (
    <>
      <Header title="Analytics Dashboard" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Performance Metrics</h3>
          <div className="flex space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="180">Last 6 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              Export Report
            </Button>
          </div>
        </div>
        
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Relationship Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">78%</p>
                  <div className="text-sm flex items-center text-success">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span>+5.2%</span>
                  </div>
                </div>
                <div className="h-16 w-24">
                  <div className="h-full w-full bg-gray-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[78%] bg-primary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Workflow Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">85%</p>
                  <div className="text-sm flex items-center text-success">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span>+8.1%</span>
                  </div>
                </div>
                <div className="h-16 w-24">
                  <div className="h-full w-full bg-gray-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[85%] bg-secondary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">2.6m</p>
                  <div className="text-sm flex items-center text-success">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span>+12.3%</span>
                  </div>
                </div>
                <div className="h-16 w-24">
                  <div className="h-full w-full bg-gray-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[68%] bg-accent"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="relationship">
          <TabsList className="mb-6">
            <TabsTrigger value="relationship">Relationship Metrics</TabsTrigger>
            <TabsTrigger value="workflows">Workflow Performance</TabsTrigger>
            <TabsTrigger value="testing">A/B Testing Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="relationship" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                title="Relationship Scores Over Time"
                data={relationshipScoreData}
                chartType="line"
                metrics={[
                  { key: 'customers', name: 'Customer Relations', color: '#3B82F6', type: 'percentage' },
                  { key: 'team', name: 'Team Cohesion', color: '#10B981', type: 'percentage' },
                  { key: 'satisfaction', name: 'Satisfaction', color: '#8B5CF6', type: 'percentage' }
                ]}
                xAxisKey="month"
                xAxisLabel="Month"
                yAxisLabel="Score (%)"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Relationship Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Customer Relationships</h4>
                      <div className="space-y-3">
                        {['Acme Corp', 'TechStart Inc', 'Global Services', 'Local Business'].map((name, index) => {
                          const score = Math.floor(Math.random() * 30) + 70;
                          return (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{name}</span>
                              <div className="flex items-center">
                                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                  <div className="bg-primary h-2 rounded-full" style={{ width: `${score}%` }}></div>
                                </div>
                                <span className="text-sm">{score}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Team Relationships</h4>
                      <div className="space-y-3">
                        {['Support Team', 'Sales Team', 'Development', 'Marketing'].map((name, index) => {
                          const score = Math.floor(Math.random() * 20) + 80;
                          return (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{name}</span>
                              <div className="flex items-center">
                                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                  <div className="bg-secondary h-2 rounded-full" style={{ width: `${score}%` }}></div>
                                </div>
                                <span className="text-sm">{score}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="workflows" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                title="Workflow Task Distribution"
                data={workflowEfficiencyData}
                chartType="bar"
                metrics={[
                  { key: 'automatedTasks', name: 'Automated Tasks', color: '#3B82F6', type: 'count' },
                  { key: 'manualTasks', name: 'Manual Tasks', color: '#EF4444', type: 'count' }
                ]}
                xAxisKey="month"
                xAxisLabel="Month"
                yAxisLabel="Number of Tasks"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Performing Workflows</h4>
                      <div className="space-y-3">
                        {[
                          'Customer Support Ticket Routing',
                          'Relationship-Based Prioritization',
                          'Sentiment Analysis Response',
                          'Email Template Selection'
                        ].map((name, index) => {
                          const efficiency = Math.floor(Math.random() * 15) + 85;
                          return (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm truncate max-w-[250px]">{name}</span>
                              <div className="flex items-center">
                                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                  <div className="bg-secondary h-2 rounded-full" style={{ width: `${efficiency}%` }}></div>
                                </div>
                                <span className="text-sm">{efficiency}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Automation Impact</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Time Saved (monthly)</p>
                            <p className="text-xl font-bold">128 hours</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Productivity Increase</p>
                            <p className="text-xl font-bold">37%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Error Reduction</p>
                            <p className="text-xl font-bold">85%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Cost Savings</p>
                            <p className="text-xl font-bold">$12,450</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                title="A/B Testing - Resolution Time Comparison"
                data={resolutionTimeData}
                chartType="line"
                metrics={[
                  { key: 'versionA', name: 'Version A', color: '#3B82F6', type: 'time' },
                  { key: 'versionB', name: 'Version B', color: '#10B981', type: 'time' }
                ]}
                xAxisKey="month"
                xAxisLabel="Month"
                yAxisLabel="Resolution Time (minutes)"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Active Tests & Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {[
                        {
                          name: 'Customer Support Workflow',
                          metric: 'Resolution Time',
                          improvement: 33
                        },
                        {
                          name: 'Email Response Templates',
                          metric: 'Customer Satisfaction',
                          improvement: 12
                        },
                        {
                          name: 'Relationship-Based Routing',
                          metric: 'First Response Time',
                          improvement: 28
                        }
                      ].map((test, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{test.name}</h4>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Active</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Primary metric: {test.metric}</span>
                            <span className="flex items-center text-success">
                              <ArrowUpIcon className="h-4 w-4 mr-1" />
                              {test.improvement}% improvement
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${Math.random() * 50 + 50}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>In progress</span>
                              <span>{Math.floor(Math.random() * 5) + 5} days remaining</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <h4 className="font-medium mb-3">Completed Tests</h4>
                      <div className="space-y-2">
                        {[
                          'Customer Intake Form',
                          'Onboarding Sequence',
                          'Follow-up Timing'
                        ].map((name, index) => {
                          const improvement = Math.floor(Math.random() * 20) + 10;
                          return (
                            <div key={index} className="flex justify-between items-center text-sm py-2">
                              <span>{name}</span>
                              <div className="flex items-center">
                                <span className="text-success mr-4">+{improvement}%</span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Version B Won</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Analytics;
