'use client'
import React, { useState } from 'react';
import PatrollingDetails from './PatrollingDetails';
import PatrollingAttachments from './PatrollingAttachments';
import PatrollingInfo from './PatrollingInfo';

const PatrollingData = () => {
  const [activeTab, setActiveTab] = useState('Info');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':
        return <PatrollingDetails />;
      case 'Attachments':
        return <PatrollingAttachments />;
      case 'Info':
        return <PatrollingInfo />;
      case 'Map':
        return <div>Map Content</div>; // Placeholder for Map component
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-md m-10">
      <h1 className="text-2xl font-bold mb-2">Patrolling Data</h1>

      {/* Tabs for Details, Attachments, Info, Map */}
      <div className="flex space-x-4 mb-4 border-b-2">
        {['Details', 'Attachments', 'Info', 'Map'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            } hover:text-blue-500 focus:outline-none`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render respective components based on activeTab */}
      {renderTabContent()}
    </div>
  );
};

export default PatrollingData;

