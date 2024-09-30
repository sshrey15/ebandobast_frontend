'use client';
import React, { useState, useEffect } from 'react';
import PatrollingDetails from './PatrollingDetails';
import PatrollingAttachments from './PatrollingAttachments';
import PatrollingInfo from './PatrollingInfo';
import { useParams } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import PatrollingMap from './PatrollingMap';

const PatrollingData = () => {
  const [activeTab, setActiveTab] = useState('Info');
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/patrols/${id}`);
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':
        return <PatrollingDetails data={data} />;
      case 'Attachments':
        return <PatrollingAttachments data={data} />;
      case 'Info':
        return <PatrollingInfo data={data} />;
      case 'Map':
        return <PatrollingMap/>; // Placeholder for Map component
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-md m-4 md:m-10">
      <h1 className="text-xl md:text-2xl font-bold mb-2">Patrolling Data</h1>

      {/* Tabs for Details, Attachments, Info, Map */}
      <div className="flex flex-wrap space-x-2 md:space-x-4 mb-4 border-b-2">
        {['Details', 'Attachments', 'Info', 'Map'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-2 md:px-4 font-medium ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            } hover:text-blue-500 focus:outline-none`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render respective components based on activeTab */}
      {renderTabContent()}

      {/* Alert Button */}
      <div className="mt-4 flex justify-center">
        <button className="py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none">
          Alert
        </button>
        <button className="py-2 ml-4 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none">
          End Patrol
        </button>
      </div>
    </div>
  );
};

export default PatrollingData;