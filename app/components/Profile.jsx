
import React from "react";
import { FaUserShield } from "react-icons/fa";
import { PiPoliceCarFill } from "react-icons/pi";
import { IoAlertCircleOutline } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="flex flex-col items-center  min-h-screen ">
      {/* Header */}
      <div className="bg-blue-500 w-full text-center py-6">
        <h1 className="text-white text-lg font-bold">eBandobast</h1>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/935/766/non_2x/indian-policeman-icon-flat-isolated-vector.jpg" // Placeholder for officer image
            alt="Officer"
            className="w-64 h-64 rounded-full"
          />
        </div>
        <h2 className="text-xl font-bold mt-4">SH. A.P. ANSHUMAN</h2>
        <p className="text-gray-600">Margao-Goa</p>
      </div>

      {/* Action Buttons */}
    </div>
  );
};

export default Profile;

