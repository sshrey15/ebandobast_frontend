'use client';

import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUserTag } from 'react-icons/fa';

const PiDashboard = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:px-16">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rakesh Chaudry</h1>
        <h2 className="text-xl text-gray-500">Circle Inspector</h2>
      </header>

      {/* Main Dashboard Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center mb-8">
        {/* Circle Progress Indicator */}
        <div className="relative w-40 h-40 bg-white flex items-center justify-center">
          <div className="w-36 h-36 bg-gray-50 rounded-full flex items-center justify-center">
            <div className="absolute w-32 h-32 flex items-center justify-center border-t-4 border-blue-600 rounded-full" />
            <p className="absolute text-center text-gray-700 font-bold text-2xl">600</p>
            <p className="absolute top-20 text-center text-gray-400 text-xs">Total Staff</p>
          </div>
        </div>
        <div className="flex mt-2 space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>Bandobast</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <span>Patrolling</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span>Station duty</span>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">CM Bandobast</h3>
          <span className="text-sm text-gray-400">#54321</span>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-2">
          <FaMapMarkerAlt className="text-blue-600" />
          <span>Tank Bund</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <FaClock className="text-blue-600" />
          <span>05:30 HH,MM</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span>10 Sep-14 Sep 23</span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">4 Days</span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700">Join</button>
      </div>

      {/* Cards Overview Section */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="bg-blue-800 text-white p-4 rounded-xl shadow-lg">
          <h4 className="text-sm">Today Event</h4>
          <div className="mt-1 text-lg font-bold">50 / 100</div>
          <span className="text-xs text-blue-300">Joined / Tagged</span>
        </div>

        <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg">
          <h4 className="text-sm">Bandobast</h4>
          <div className="mt-1 text-lg font-bold">30 / 50</div>
          <span className="text-xs text-blue-300">Joined / Tagged</span>
        </div>

        <div className="bg-blue-400 text-white p-4 rounded-xl shadow-lg">
          <h4 className="text-sm">Patrolling</h4>
          <div className="mt-1 text-lg font-bold">20 / 50</div>
          <span className="text-xs text-blue-300">Joined / Tagged</span>
        </div>

        <div className="bg-gray-300 text-gray-700 p-4 rounded-xl shadow-lg">
          <h4 className="text-sm">Station duty</h4>
          <div className="mt-1 text-lg font-bold">500</div>
          <span className="text-xs">Available members</span>
        </div>
      </div>
    </div>
  );
};

export default PiDashboard;

