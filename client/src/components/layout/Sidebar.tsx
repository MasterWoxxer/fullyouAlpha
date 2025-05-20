import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  DashboardIcon, 
  WorkflowIcon, 
  IntegrationsIcon, 
  ABTestingIcon, 
  RelationshipIcon, 
  AnalyticsIcon, 
  SettingsIcon,
  UserIcon
} from '../icons';

const Sidebar = () => {
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon className="text-lg" /> },
    { path: '/workflows', label: 'Workflows', icon: <WorkflowIcon className="text-lg" /> },
    { path: '/integrations', label: 'Integrations', icon: <IntegrationsIcon className="text-lg" /> },
    { path: '/ab-testing', label: 'A/B Testing', icon: <ABTestingIcon className="text-lg" /> },
    { path: '/relationship', label: 'Relationship', icon: <RelationshipIcon className="text-lg" /> },
    { path: '/matrix', label: 'Matrix', icon: <AnalyticsIcon className="text-lg" /> },
    { path: '/fan-rating', label: 'Fan Rating', icon: <RelationshipIcon className="text-lg" /> },
    { path: '/analytics', label: 'Analytics', icon: <AnalyticsIcon className="text-lg" /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon className="text-lg" /> },
  ];

  return (
    <aside className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 flex justify-center md:justify-start items-center border-b border-gray-200">
        <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white">
          <WorkflowIcon className="h-5 w-5" />
        </div>
        <h1 className="hidden md:block ml-2 font-bold text-xl">Woxxer</h1>
      </div>
      
      <nav className="flex-grow py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                href={item.path} 
                className={`flex items-center px-4 py-3 ${
                  location === item.path 
                    ? 'text-primary bg-blue-50 border-r-4 border-primary' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="hidden md:block ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Link href="/profile" className="flex items-center text-gray-600">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5" />
          </div>
          <span className="hidden md:block ml-3">John Doe</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
