// MeetingForm.jsx
'use client';

import React, { useState } from "react";

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    receiverId: "",
    name: "",
    date: "",
    time: "",
    location: "",
    agenda: "",
  });

  const receiverOptions = [
    "SuryaPrakash Singh",
    "Mario Fernandes",
    "Sukesh Chari",
    "Sushant Sinha",
    "Gukesh Naik",
  ];

  const goaPoliceStations = [
    "Panaji Police Station",
    "Margao Police Station",
    "Vasco Police Station",
    "Calangute Police Station",
    "Mapusa Police Station",
    "Ponda Police Station",
    "Anjuna Police Station",
    "Baga Police Station",
    "Colva Police Station",
    "Candolim Police Station",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();   


    // Process form data (e.g., send to server)   

    console.log("Form Data:", formData); // Or use fetch/axios for backend interaction

    // Clear form data after submission (optional, depending on your use case)
    setFormData({
      receiverId: "",
      name: "",
      date: "",
      time: "",
      location: "",
      agenda: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-extrabold text-center text-blue-800 mb-6">Meeting Form</h2>

        {/* Receiver ID Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="receiverId">
            Receiver
          </label>
          <select
            id="receiverId"
            name="receiverId"
            value={formData.receiverId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a receiver
            </option>
            {receiverOptions.map((receiver, index) => (
              <option key={index} value={receiver}>
                {receiver}
              </option>
            ))}
          </select>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Meeting Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Time Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
            Meeting Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a police station
            </option>
            {goaPoliceStations.map((station, index) => (
              <option key={index} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        {/* Agenda Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="agenda">
            Agenda
          </label>
          <textarea
            id="agenda"
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter the meeting agenda"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;