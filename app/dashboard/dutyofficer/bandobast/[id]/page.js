"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BandobastData from '@/app/components/BandobastData';

const Page = () => {
  const { id } = useParams();
  const [bandobastData, setBandobastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBandobastData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/bandobast/${id}`);
          const data = await response.json();
          setBandobastData(data.bandobast); // Access the bandobast property
          setLoading(false);
        } catch (error) {
          console.error('Error fetching bandobast data:', error);
          setLoading(false);
        }
      };

      fetchBandobastData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!bandobastData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
        <BandobastData/>
        
    </div>
  );
};

export default Page;