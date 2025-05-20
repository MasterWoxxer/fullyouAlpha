import React from 'react';
import { NotificationIcon, HelpIcon, PlusIcon } from '../icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <NotificationIcon className="h-6 w-6" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <HelpIcon className="h-6 w-6" />
        </button>
        <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>New Workflow</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
