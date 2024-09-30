import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa';

const PatrollingDetails = ({ bandobastData }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSupervisionOfficer = () => {
    if (bandobastData.bandobastAssignment && bandobastData.bandobastAssignment.length > 0) {
      return bandobastData.bandobastAssignment[0].supervisionOfficer || 'N/A';
    }
    return 'N/A';
  };

    console.log("bhai hai",bandobastData)
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{bandobastData.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{bandobastData.description}</p>
      </div>
      <div className="space-y-3">
        <InfoItem 
          icon={FaCalendarAlt} 
          value={formatDate(bandobastData.date)} 
        />
        <InfoItem 
          icon={FaMapMarkerAlt} 
          value={bandobastData.location} 
        />
        <InfoItem 
          icon={FaClock} 
          value={new Date(bandobastData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
        />
        <InfoItem 
          icon={FaUser} 
          value={getSupervisionOfficer()} 
        />
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, value }) => (
  <div className="flex items-center text-gray-700">
    <Icon className="text-gray-400 mr-3 w-5 h-5" />
    <p className="text-sm">{value}</p>
  </div>
);

export default PatrollingDetails;