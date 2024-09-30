"use client";
import BandobastCard from '@/app/components/BandobastCard';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

const Page = () => {
  const [bandobastData, setBandobastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBandobastData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bandobast');
        const data = await response.json();
        setBandobastData(data.bandobast);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bandobast data:', error);
        setLoading(false);
      }
    };

    fetchBandobastData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!bandobastData.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      {bandobastData.map((bandobast) => (
        <BandobastCard
          key={bandobast.id}
          teamName={bandobast.name}
          location={bandobast.location}
          date={new Date(bandobast.date).toLocaleDateString()}
          createdAt={new Date(bandobast.createdAt).toLocaleDateString()}
          startTime={new Date(bandobast.date).toLocaleTimeString()}
          endTime={new Date(bandobast.date).toLocaleTimeString()}
          supervisingOfficer="Officer Name" // Replace with actual data if available
          eventName={bandobast.name}
          onClick={() => router.push(`/dashboard/dutyofficer/bandobast/${bandobast.id}`)}
        />
      ))}
    </div>
  );
};

export default Page;