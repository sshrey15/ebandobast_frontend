'use client';

import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const MeetingForm = () => {
  const [receiverId, setReceiverId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatorId, setCreatorId] = useState("");
  const [receiverOptions, setReceiverOptions] = useState([]);

  const router = useRouter();

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

  useEffect(() => {
    // Retrieve creatorId from local storage

    // Fetch receiver options from the API
    const fetchReceiverOptions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/admin");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReceiverOptions(data.admins || []); // Make sure data is an array
      } catch (error) {
        console.error("Error fetching receiver options: ", error);
      }
    };

    fetchReceiverOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const creatorId = localStorage.getItem("senderIds"); // Ensure you're getting the correct ID
  
    // Combine date and time for proper formatting
    const combinedDateTime = new Date(`${date}T${time}`).toISOString();
  
    const formDataToSend = {
      creatorId: creatorId,
      receiverId,
      name,
      date: new Date(date).toISOString(),  // Send date as ISO string
      time: combinedDateTime,  // Send time as part of the date-time
      location,
      agenda,
    };
  
    console.log('FormData being sent:', formDataToSend); // Log the data
  
    const url = `http://localhost:8000/api/meetings`;
  
 
  
     // Log the token to ensure it is retrieved correctly
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           // Include the token
        },
        body: JSON.stringify(formDataToSend),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.error) {
        console.error("Error: ", data.error);
      } else {
        alert("Form submitted successfully!");
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setLoading(false);
    setReceiverId("");
    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setAgenda("");
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
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a receiver
            </option>
            {Array.isArray(receiverOptions) &&
              receiverOptions.map((receiver) => (
                <option key={receiver.id} value={receiver.id}>
                  {receiver.name}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
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
            className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#ffffff" size={24} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;