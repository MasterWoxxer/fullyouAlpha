import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IntegrationsIcon } from '@/components/icons';

const Integrations: React.FC = () => {
  const availableIntegrations = [
    { 
      id: 'slack', 
      name: 'Slack', 
      description: 'Connect your Slack workspace for real-time notifications and updates',
      category: 'communication',
      isConnected: true
    },
    { 
      id: 'zendesk', 
      name: 'Zendesk', 
      description: 'Integrate with Zendesk to synchronize customer support tickets',
      category: 'support',
      isConnected: true
    },
    { 
      id: 'salesforce', 
      name: 'Salesforce', 
      description: 'Connect to Salesforce CRM to access customer relationship data',
      category: 'crm',
      isConnected: false
    },
    { 
      id: 'gmail', 
      name: 'Gmail', 
      description: 'Connect your Gmail account to process customer emails automatically',
      category: 'communication',
      isConnected: false
    },
    { 
      id: 'hubspot', 
      name: 'HubSpot', 
      description: 'Integrate with HubSpot for marketing automation and customer data',
      category: 'crm',
      isConnected: false
    },
    { 
      id: 'intercom', 
      name: 'Intercom', 
      description: 'Connect to Intercom to manage customer conversations and support',
      category: 'support',
      isConnected: false
    }
  ];

  return (
    <>
      <Header title="Integrations" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Available Integrations</h3>
          <div className="flex space-x-4">
            <Button variant="outline">Import Data</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">Active Integrations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableIntegrations
              .filter(integration => integration.isConnected)
              .map(integration => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="bg-blue-50 pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Connected
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{integration.category}</span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Available Integrations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableIntegrations
              .filter(integration => !integration.isConnected)
              .map(integration => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <div className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                        Not Connected
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{integration.category}</span>
                      <Button size="sm">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            
            {/* Add Integration Card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-4">
                <IntegrationsIcon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg mb-2">Add Custom Integration</h3>
              <p className="text-gray-500 text-sm text-center mb-4">Connect to any service that supports our API</p>
              <Button variant="outline">Request Integration</Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integrations;
