import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/components/theme-provider';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header title="Settings" />
      
      <div className="p-6">
        <Tabs defaultValue="account">
          <div className="flex mb-6">
            <TabsList className="mr-auto">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API Integration</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="account">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account settings and profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" defaultValue="Customer Service Manager" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          placeholder="Write a short bio..." 
                          className="min-h-[100px]"
                          defaultValue="Experienced customer service manager focused on building relationships and improving service metrics."
                        />
                      </div>
                      
                      <Button>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="two-factor">Two-factor Authentication</Label>
                            <p className="text-sm text-gray-500">Improve your account security with 2FA</p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="session-timeout">Auto-logout After Inactivity</Label>
                            <p className="text-sm text-gray-500">Automatically log out after 30 minutes of inactivity</p>
                          </div>
                          <Switch id="session-timeout" defaultChecked />
                        </div>
                      </div>
                      
                      <Button>Update Security Settings</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                    <CardDescription>Update your profile picture</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="h-32 w-32 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-semibold mb-4">
                      JD
                    </div>
                    <div className="text-center">
                      <Button variant="outline" className="mb-2">Upload Photo</Button>
                      <p className="text-xs text-gray-500">Allowed formats: JPG, PNG. Max size: 5MB</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Account Type</span>
                        <span className="text-sm">Administrator</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Member Since</span>
                        <span className="text-sm">January 15, 2022</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Last Login</span>
                        <span className="text-sm">Today, 9:42 AM</span>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button variant="destructive" className="w-full">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Customize your display and theme preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`border rounded-md p-4 cursor-pointer ${
                          theme === 'light' ? 'border-primary bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="h-20 bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-500">
                          Light Mode
                        </div>
                        <div className="flex justify-center">
                          <Switch id="light-mode" checked={theme === 'light'} />
                        </div>
                      </div>
                      
                      <div
                        className={`border rounded-md p-4 cursor-pointer ${
                          theme === 'dark' ? 'border-primary bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="h-20 bg-gray-900 border border-gray-700 rounded-md mb-2 flex items-center justify-center text-white">
                          Dark Mode
                        </div>
                        <div className="flex justify-center">
                          <Switch id="dark-mode" checked={theme === 'dark'} />
                        </div>
                      </div>
                      
                      <div
                        className={`border rounded-md p-4 cursor-pointer ${
                          theme === 'system' ? 'border-primary bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setTheme('system')}
                      >
                        <div className="h-20 bg-gradient-to-r from-white to-gray-900 border border-gray-200 rounded-md mb-2 flex items-center justify-center">
                          <span className="text-gray-700 mr-2">System</span>
                          <span className="text-white">Pref</span>
                        </div>
                        <div className="flex justify-center">
                          <Switch id="system-mode" checked={theme === 'system'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-medium">Interface Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compact-view">Compact View</Label>
                        <p className="text-sm text-gray-500">Display more content with reduced spacing</p>
                      </div>
                      <Switch id="compact-view" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animated-transitions">Animated Transitions</Label>
                        <p className="text-sm text-gray-500">Enable smooth animations between screens</p>
                      </div>
                      <Switch id="animated-transitions" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="relationship-indicators">Relationship Indicators</Label>
                        <p className="text-sm text-gray-500">Show relationship strength indicators on all contacts</p>
                      </div>
                      <Switch id="relationship-indicators" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage your team members and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <Button>Invite Member</Button>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {['John Doe', 'Sarah Kim', 'David Chen', 'Maria Lopez', 'James Wilson'].map((name, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                                  {name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">{name}</div>
                                  <div className="text-sm text-gray-500">{name.toLowerCase().replace(' ', '.')}@example.com</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                {i === 0 ? 'Admin' : i === 1 ? 'Manager' : 'Team Member'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {i === 0 ? 'Now' : `${i} hour${i > 1 ? 's' : ''} ago`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Workflow Status Changes</Label>
                          <p className="text-sm text-gray-500">Receive emails when workflow status changes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Team Relationship Updates</Label>
                          <p className="text-sm text-gray-500">Receive emails for significant relationship changes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>A/B Test Results</Label>
                          <p className="text-sm text-gray-500">Receive emails when A/B tests are completed</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Reports</Label>
                          <p className="text-sm text-gray-500">Receive weekly performance and relationship reports</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">In-app Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Real-time Workflow Updates</Label>
                          <p className="text-sm text-gray-500">Show notifications for workflow progress</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Team Member Activities</Label>
                          <p className="text-sm text-gray-500">Show notifications for team member actions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Customer Interaction Alerts</Label>
                          <p className="text-sm text-gray-500">Show notifications for important customer events</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button>Save Notification Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Integration</CardTitle>
                <CardDescription>Manage API access and integration settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">API Keys</h3>
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium">Production API Key</h4>
                          <p className="text-sm text-gray-500">Last used: 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                      <div className="flex">
                        <Input
                          readOnly
                          value="••••••••••••••••••••••••••••••"
                          className="font-mono bg-white"
                        />
                        <Button variant="ghost" className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h4 className="font-medium">Test API Key</h4>
                          <p className="text-sm text-gray-500">Last used: 5 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                      <div className="flex">
                        <Input
                          readOnly
                          value="••••••••••••••••••••••••••••••"
                          className="font-mono bg-white"
                        />
                        <Button variant="ghost" className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Webhook Configuration</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" placeholder="https://your-domain.com/webhook" />
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Events to trigger webhook</Label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Switch id="workflow-event" defaultChecked />
                            <Label htmlFor="workflow-event" className="ml-2">Workflow completed</Label>
                          </div>
                          <div className="flex items-center">
                            <Switch id="relationship-event" defaultChecked />
                            <Label htmlFor="relationship-event" className="ml-2">Relationship score changed</Label>
                          </div>
                          <div className="flex items-center">
                            <Switch id="test-event" />
                            <Label htmlFor="test-event" className="ml-2">A/B test completed</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">API Usage</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Month</p>
                          <p className="text-xl font-bold">12,584</p>
                          <p className="text-xs text-gray-500">API calls</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Daily Average</p>
                          <p className="text-xl font-bold">452</p>
                          <p className="text-xs text-gray-500">API calls</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rate Limit</p>
                          <p className="text-xl font-bold">1,000/min</p>
                          <p className="text-xs text-gray-500">API calls</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">42% of monthly quota used</p>
                    </div>
                  </div>
                  
                  <Button>Save API Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
