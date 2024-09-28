import React from "react";
import { FaCarSide } from "react-icons/fa"; // Using React Icons for the car icon
import { FiClock, FiMapPin } from "react-icons/fi"; // React Icons for time and location

const PatrollingCard = ({
  teamName,
  patrollingDate,
  createdAt,
  startTime,
  endTime,
  route,
  supervisingOfficer, // Added new prop for Supervising Officer
}) => {
  return (
    <div className="w-full max-w-xl p-4 bg-white shadow-md rounded-lg flex items-center justify-between space-x-4 border-spacing-11">
      {/* Left Section: Icon & Details */}
      <div className="flex items-center space-x-4">
        {/* Car Icon */}
        <div className="bg-blue-100 rounded-full p-3">
          <FaCarSide className="text-blue-600 text-xl" />
        </div>

        {/* Patrolling Details */}
        <div>
          <div className="text-xl font-semibold text-gray-800">{teamName}</div>
          <div className="flex items-center text-sm text-gray-600">
            <FiMapPin className="mr-1" /> {route}
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FiClock className="mr-1" /> {patrollingDate}
          </div>
          <div className="text-xs text-gray-500">Created: {createdAt}</div>
        </div>
      </div>

      {/* Right Section: Time and Supervising Officer */}
      <div className="text-right space-y-2">
        {/* Patrolling Time */}
        <div className="text-sm text-gray-800">
          {startTime} - {endTime}
        </div>

        {/* Supervising Officer and Start Button */}
        <div className="flex items-center justify-between space-x-2">
          {/* Supervising Officer */}
          <span className="text-sm  text-blue-950 font-medium">
            Officer: {supervisingOfficer}
          </span>

          {/* Start Button */}
          <button className="px-3 py-1 text-sm border border-blue-500 text-blue-00 rounded-full hover:bg-blue-500 hover:text-white transition">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatrollingCard;
