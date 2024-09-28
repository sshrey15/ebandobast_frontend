import React from "react";
import { FaRegClipboard } from "react-icons/fa"; // Using React Icons for clipboard (agenda)
import { FiUser, FiMapPin, FiClock } from "react-icons/fi"; // React Icons for user, map pin, and clock

const MeetingCard = ({ agenda, createdBy, dateTime, location, createdAt }) => {
  return (
    <div className="w-full max-w-xl p-4 bg-white shadow-md rounded-lg flex items-center justify-between space-x-4">
      {/* Left Section: Icon & Meeting Details */}
      <div className="flex items-center space-x-4">
        {/* Clipboard Icon */}
        <div className="bg-blue-100 rounded-full p-3">
          <FaRegClipboard className="text-blue-600 text-xl" />
        </div>

        {/* Meeting Details */}
        <div>
          {/* Agenda */}
          <div className="text-xl font-semibold text-gray-800">{agenda}</div>

          {/* Created By */}
          <div className="flex items-center text-sm text-gray-600">
            <FiUser className="mr-1" /> Created by: {createdBy}
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FiMapPin className="mr-1" /> Location: {location}
          </div>

          {/* Date & Time */}
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FiClock className="mr-1" /> {dateTime}
          </div>

          {/* Created At */}
          <div className="text-xs text-gray-500">Created: {createdAt}</div>
        </div>
      </div>

      {/* Right Section: Placeholder or Action Button */}
      <div className="text-right space-y-2">
        {/* Placeholder Action Button */}
        <button className="px-3 py-1 text-sm border border-blue-500 text-black-500 rounded-full hover:bg-blue-500 hover:text-white transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
