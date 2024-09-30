'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import PatrollingDetails from './PatrollingDetails';
import BandobastAttachments from './BandobastAttachments';
import BandobastDetails from './BandobastDetails';
import BandobastMap from './BandobastMap';
import Link from 'next/link';

const PatrollingData = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Details');
  const [bandobastData, setBandobastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBandobastData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/bandobast/${id}`);
          const data = await response.json();
          setBandobastData(data.bandobast); // Access the bandobast property
          console.log("Bandobast Data coordinates: ", data.bandobast.coordinates);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching bandobast data:', error);
          setLoading(false);
        }
      };

      fetchBandobastData();
    }
  }, [id]);

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      );
    }

    if (!bandobastData) {
      return <p>No data available</p>;
    }

    switch (activeTab) {
      case 'Details':
        return <BandobastDetails bandobastData={bandobastData} />;
      case 'Attachments':
        return <BandobastAttachments />;
      case 'Map':
        return <BandobastMap />; // Pass bandobastData to BandobastMap
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 md:p-8 bg-white shadow-2xl rounded-md m-10">
      <h1 className="text-2xl font-bold mb-2">Bandobast Data</h1>

      {/* Tabs for Details, Attachments, Info, Map */}
      <div className="flex space-x-4 mb-4 border-b-2">
        {['Details', 'Attachments', 'Map'].map((tab) => (
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

      {/* Alert Button */}
      <div className="flex justify-center mt-6">
        <Link href={`/dashboard/dutyofficer/alertinfo`}>
        <button className="bg-red-500 w-full text-center text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none flex items-center justify-center">
          <FaExclamationTriangle className="mr-2" />
          Alert
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PatrollingData;