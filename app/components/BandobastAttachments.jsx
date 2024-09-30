import React from 'react';

const BandobastAttachments = () => {
  // Sample data
  const attachments = [
    {
      id: 1,
      imageUrl: '/autorickshaw.png',
      description: 'Sample description 1',
      location: 'Location 1',
    },
    
  ];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {attachments.map((attachment) => (
        <div key={attachment.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={attachment.imageUrl} alt={`Attachment ${attachment.id}`} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-700 mb-4">{attachment.description}</p>
            <h3 className="text-lg font-bold mb-2">Location</h3>
            <p className="text-gray-700">{attachment.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BandobastAttachments;