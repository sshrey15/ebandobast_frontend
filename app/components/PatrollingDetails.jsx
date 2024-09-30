import React from 'react';
import { FaRoute, FaCar, FaUserTie, FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

const PatrollingDetails = ({ data }) => {
  return (
    <div className="max-w-lg mx-auto p-6   shadow-lg rounded-lg transition-transform transform">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">{data.name}</h2>
      <div className="mb-4 flex items-center border-b pb-4">
        <FaRoute className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">Route:</strong>
        <p className="text-gray-900 ml-2">{data.route.join(' → ')}</p>
      </div>
      <div className="mb-4 flex items-center border-b pb-4">
        <FaCar className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">Vehicle Number:</strong>
        <p className="text-gray-900 ml-2">{data.vehicleNumber}</p>
      </div>
      <div className="mb-4 flex items-center border-b pb-4">
        <FaUserTie className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">Supervisor:</strong>
        <p className="text-gray-900 ml-2">{data.supervisor}</p>
      </div>
      <div className="mb-4 flex items-center border-b pb-4">
        <FaCalendarAlt className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">Date:</strong>
        <p className="text-gray-900 ml-2">{new Date(data.date).toLocaleDateString()}</p>
      </div>
      <div className="mb-4 flex items-center border-b pb-4">
        <FaClock className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">Start Time:</strong>
        <p className="text-gray-900 ml-2">{new Date(data.startTime).toLocaleTimeString()}</p>
      </div>
      <div className="mb-4 flex items-center border-b pb-4">
        <FaClock className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">End Time:</strong>
        <p className="text-gray-900 ml-2">{new Date(data.endTime).toLocaleTimeString()}</p>
      </div>
      <div className="mb-4 flex items-center">
        <FaInfoCircle className="text-gray-700 mr-2 text-xl" />
        <strong className="block text-gray-700">Description:</strong>
        <p className="text-gray-900 ml-2">{data.description}</p>
      </div>
    </div>
  );
};

export default PatrollingDetails;
