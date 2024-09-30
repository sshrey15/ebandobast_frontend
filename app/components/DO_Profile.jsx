import React, { useState, useEffect } from "react";
import { FaUserShield } from "react-icons/fa";
import { PiPoliceCarFill } from "react-icons/pi";
import { IoAlertCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners

const DO_Profile = ({ officer }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#0000ff" size={150} /> {/* Customize the spinner */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Header */}
      

      {/* Profile Image */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/935/766/non_2x/indian-policeman-icon-flat-isolated-vector.jpg" // Placeholder for officer image
            alt="Officer"
            className="w-64 h-64 rounded-full"
          />
        </div>
        <h2 className="text-xl font-bold mt-4">{officer.name}</h2>
        <p className="text-gray-600">{officer.rank}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <div
          className="bg-white w-32 h-46 border-2 border-gray-300 shadow-md rounded-lg pl-5 pt-12
          items-center"
        >
          <FaUserShield className="text-blue-600 text-xl size-12 ml-6" />
          <Link href={`/dashboard/dutyofficer/bandobast`}>
            <p className="text-base font-semibold ml-1">Bandobast</p>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
        <Link href={`/dashboard/dutyofficer/patrols`}>
          <div className="bg-blue-900 text-white w-32 h-28 shadow-md rounded-lg pl-8 pt-6">
          
            <p className="text-base font-semibold">Patrolling</p>
            
            <PiPoliceCarFill className="size-10 ml-2" />
          </div>
          </Link>
          <div className="bg-white w-32 h-16 shadow-md rounded-lg flex items-center justify-center border-2 border-gray-300 gap-1">
            <Link href={`/dashboard/dutyofficer/alertinfo`}>
            <p className="text-base font-semibold">Alerts</p>
            </Link>
            <IoAlertCircleOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DO_Profile;