"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PatrollingData from '@/app/components/PatrollingData';
import { FaSpinner } from 'react-icons/fa';

const Page = () => {
  const { id } = useParams();
  const [patrollingData, setPatrollingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPatrollingData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/patrols/${id}`);
          const data = await response.json();
          setPatrollingData(data); // Assuming the API returns the data directly
          setLoading(false);
        } catch (error) {
          console.error('Error fetching patrolling data:', error);
          setLoading(false);
        }
      };

      fetchPatrollingData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!patrollingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <PatrollingData data={patrollingData} />
    </div>
  );
};

export default Page;