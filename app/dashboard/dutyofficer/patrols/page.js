"use client";
import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import PatrollingCard from '@/app/components/PatrollingCard';
import { useRouter } from 'next/navigation';

const PatrollingPage = () => {
  const [patrols, setPatrols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const router = useRouter();

  useEffect(() => {
    const fetchPatrols = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/patrols');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPatrols(data);
      } catch (e) {
        setError(`Failed to fetch patrol data: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPatrols();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Patrolling Schedules</h1>
        <div className="flex flex-col items-center space-y-4">
          {patrols.length > 0 ? (
            patrols.map((patrol) => (
              <PatrollingCard
                key={patrol.id}
                teamName={patrol.name}
                patrollingDate={new Date(patrol.date).toLocaleDateString()}
                createdAt={new Date(patrol.createdAt).toLocaleString()}
                startTime={new Date(patrol.startTime).toLocaleTimeString()}
                endTime={new Date(patrol.endTime).toLocaleTimeString()}
                route={patrol.route.join(' → ')}
                supervisingOfficer={patrol.supervisor}
                onClick={()=>router.push(`/dashboard/dutyofficer/patrols/${patrol.id}`)}
              />
            ))
          ) : (
            <div className="text-center">No patrols available at the moment.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatrollingPage;