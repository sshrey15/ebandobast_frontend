import React from "react";
import { FaUserShield, FaSpinner } from "react-icons/fa"; // Using React Icons for a police shield icon and spinner
import { FiMapPin, FiClock } from "react-icons/fi"; // React Icons for map pin and clock

const BandobastCard = ({
  teamName,
  location,
  date,
  createdAt,
  startTime,
  endTime,
  supervisingOfficer,
  eventName,
  onClick,
  loading, // New prop for loading state
}) => {
  return (
    <div
      className="w-full max-w-4xl p-4 bg-white shadow-md rounded-lg flex items-center justify-between space-x-4 cursor-pointer"
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <>
          {/* Left Section: Icon & Details */}
          <div className="flex items-center space-x-4">
            {/* Shield Icon */}
            <div className="bg-blue-100 rounded-full p-3">
              <FaUserShield className="text-blue-600 text-xl" />
            </div>

            {/* Event & Team Details */}
            <div>
              {/* Event Name */}
              <div className="text-lg font-bold text-gray-800">{eventName}</div>

              {/* Team Name */}
              <div className="text-xl font-semibold text-gray-800">{teamName}</div>

              {/* Location */}
              <div className="flex items-center text-sm text-gray-600">
                <FiMapPin className="mr-1" /> {location}
              </div>

              {/* Date */}
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <FiClock className="mr-1" /> {date}
              </div>

              {/* Created At */}
              <div className="text-xs text-gray-500">Created: {createdAt}</div>
            </div>
          </div>

          {/* Right Section: Timing & Officer Details */}
          <div className="text-right space-y-2">
            {/* Start & End Time */}
            <div className="text-sm text-gray-800">
              {startTime} - {endTime}
            </div>

            {/* Supervising Officer Name */}
            <div className="text-sm text-blue-950 font-medium">
              Officer: {supervisingOfficer}
            </div>

            {/* Start Button */}
            <button className="px-3 py-1 text-sm border border-blue-500 text-black-500 rounded-full hover:bg-blue-500 hover:text-white transition">
              View
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BandobastCard;