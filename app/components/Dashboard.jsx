"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        {/* Circular Progress */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <svg className="w-48 h-48">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                strokeWidth="12"
                stroke="#E5E7EB"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                strokeWidth="12"
                strokeLinecap="round"
                stroke="#3B82F6"
                fill="none"
                strokeDasharray="282"
                strokeDashoffset="80"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">600</h2>
                <p className="text-gray-500">Total Staff</p>
              </div>
            </div>
          </div>
          {/* Labels */}
          <div className="mt-4 flex space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Bandobast</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              <span>Petroling</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 rounded-full bg-blue-200"></span>
              <span>Station Duty</span>
            </div>
          </div>
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">CM Bandobast</h3>
              <p className="text-sm text-gray-500">Tank Bund</p>
              <p className="text-sm text-gray-500">05:30 HH, MM</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              + Join
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <p>10 Sep - 14 Sep 23</p>
            <p>09:00 AM - 06:00 PM</p>
            <p>4 Days</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h4 className="text-lg font-semibold">Today Event</h4>
            <p className="mt-2 text-2xl font-bold">50 / 100</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h4 className="text-lg font-semibold">Bandobast</h4>
            <p className="mt-2 text-2xl font-bold">30 / 50</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h4 className="text-lg font-semibold">Petroling</h4>
            <p className="mt-2 text-2xl font-bold">20 / 50</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h4 className="text-lg font-semibold">Station Duty</h4>
            <p className="mt-2 text-2xl font-bold">500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
