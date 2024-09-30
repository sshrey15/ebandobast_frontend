import React from 'react';

export const PatrollingInfo = ({ data }) => {
  // Generate timeline data from route
  const timelineData = [
    { point: 'Start', time: new Date(data.startTime).toLocaleTimeString(), location: 'Starting Point', isCompleted: true },
    ...data.route.map((location, index) => ({
      point: location,
      time: '00:00 PM', // Placeholder time, you can adjust as needed
      location,
      isCompleted: index < 3 // Example logic for completion
    })),
    { point: 'End', time: new Date(data.endTime).toLocaleTimeString(), location: 'Ending Point', isCompleted: false }
  ];

  return (
    <div className="relative">
      <div className="absolute w-0.5 bg-green-500 h-full left-4 transform -translate-x-1/2"></div>
      {timelineData.map((item, index) => (
        <div key={index} className="relative flex items-start mb-4 pl-8">
          {/* Connector for each point */}
          <div className="absolute left-4 transform -translate-x-1/2">
            <div
              className={`w-3 h-3 rounded-full ${
                item.isCompleted ? 'bg-green-500' : 'bg-black'
              }`}
            ></div>
            {index < timelineData.length - 1 && (
              <div className={`w-0.5 h-8 mx-auto ${item.isCompleted ? 'bg-green-500' : 'bg-black'}`}></div>
            )}
          </div>

          {/* Card */}
          <div className="bg-gray-100 rounded-md p-4 shadow-md w-full">
            <p className="font-semibold">{item.point}</p>
            <p>Time: {item.time}</p>
            <p>Location: {item.location}</p>
          </div>

          <div className="flex items-center space-x-4 ml-2">
            <button className="p-1 text-blue-500 hover:bg-gray-200 rounded-full">
              A
            </button>
            {item.isCompleted ? (
              <span className="text-green-500">✔</span>
            ) : (
              <span className="text-gray-500">✔</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatrollingInfo;