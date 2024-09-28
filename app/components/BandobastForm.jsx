'use client';
import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import { useRouter } from "next/navigation";

const BandobastForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state

  const goaLocations = [
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Calangute",
    "Candolim",
    "Mapusa",
    "Ponda",
    "Baga",
    "Colva",
    "Anjuna",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const url = `http://localhost:8000/api/bandobast/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response: ", data);
      if (data.error) {
        console.error("Error: ", data.error);
      } else {
        // Save bandobastId to localStorage
        localStorage.setItem("bandobastId", data.bandobast.id);

        setLoading(false); // Set loading to false
        alert("Bandobast created successfully!"); // Show alert
        router.push("/excelupload"); // Redirect to dashboard
        setFormData({
          name: "",
          date: "",
          location: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-extrabold text-center text-blue-600 mb-6">Bandobast Form</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
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

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
            Location
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
              Select a location
            </option>
            {goaLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter a description"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={24} /> // Use ClipLoader from react-spinners
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BandobastForm;