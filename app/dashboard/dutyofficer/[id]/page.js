"use client"
import { useEffect, useState } from 'react';
import DO_Profile from '../../../components/DO_Profile';

const Page = ({ params: { id } }) => {
  const [dutyOfficer, setDutyOfficer] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDutyOfficer = async () => {
      try {
        const id = localStorage.getItem('dutyofficerId');
        const res = await fetch(`http://localhost:8000/api/auth/dutyofficer/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('API response data:', data); // Log the entire data object
        if (data.dutyOfficer) {
          setDutyOfficer(data.dutyOfficer);
        } else {
          console.error('No duty officer data available');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getDutyOfficer();
  }, [id]);

 

  return (
    <div>
      <DO_Profile officer={dutyOfficer} />
    </div>
  );
};

export default Page;