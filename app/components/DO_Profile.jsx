import React from "react";
import { FaUserShield } from "react-icons/fa";
import { PiPoliceCarFill } from "react-icons/pi";
import { IoAlertCircleOutline } from "react-icons/io5";

const DO_Profile = () => {
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
      <div className="flex justify-center gap-4 mt-8">
        <div
          className="bg-white w-32 h-46 border-2 border-gray-300 shadow-md rounded-lg pl-5 pt-12
          items-center"
        >
          <FaUserShield className="text-blue-600 text-xl size-12 ml-6" />
          <p className="text-base font-semibold ml-1">Bandobast</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-blue-900 text-white w-32 h-28 shadow-md rounded-lg pl-8 pt-6">
            <p className="text-base font-semibold">Patrolling</p>
            <PiPoliceCarFill className="size-10 ml-2" />
          </div>
          <div className="bg-white w-32 h-16 shadow-md rounded-lg flex items-center justify-center border-2 border-gray-300 gap-1">
            <p className="text-base font-semibold">Alerts</p>
            <IoAlertCircleOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DO_Profile;
