import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, WorkflowIcon } from '@/components/icons';

const Workflows: React.FC = () => {
  const workflows = [
    {
      id: 1,
      name: 'Customer Support Ticket Routing',
      description: 'Automatically routes customer support tickets to the appropriate team based on content',
      status: 'active',
      lastModified: '2 days ago'
    },
    {
      id: 2,
      name: 'Relationship-Based Prioritization',
      description: 'Prioritizes tickets based on customer relationship data and history',
      status: 'testing',
      lastModified: '5 days ago'
    },
    {
      id: 3,
      name: 'Sentiment Analysis Response',
      description: 'Analyzes customer sentiment and guides response tone accordingly',
      status: 'draft',
      lastModified: '1 week ago'
    }
  ];

  return (
    <>
      <Header title="Workflow Management" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Your Workflows</h3>
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Workflow
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map(workflow => (
            <Card key={workflow.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{workflow.name}</CardTitle>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    workflow.status === 'active' ? 'bg-green-100 text-green-800' : 
                    workflow.status === 'testing' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {workflow.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-600 text-sm mb-4">{workflow.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Modified {workflow.lastModified}</span>
                  <Link href={`/workflows/${workflow.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Create New Workflow Card */}
          <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
              <WorkflowIcon className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-lg mb-2">Create New Workflow</h3>
            <p className="text-gray-500 text-sm text-center mb-4">Start automating your customer service processes</p>
            <Button>
              <PlusIcon className="h-5 w-5 mr-2" />
              New Workflow
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Workflows;
