import React from 'react';
import Header from '@/components/layout/Header';

const WorthIt = () => {
  return (
    <>
      <Header title="Worth-It Filter" />
      <div className="flex-1 p-0">
        <iframe
          title="Worth-It Bubble Map"
          src="/worth-it/index.html?userId=demo-user"
          className="w-full h-[calc(100vh-90px)] border-0"
        />
      </div>
    </>
  );
};

export default WorthIt;
