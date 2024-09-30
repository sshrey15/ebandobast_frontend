"use client";

// src/components/Auth.jsx
import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import { useRouter } from "next/navigation";

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "", // Updated to match backend
    batchId: "", // Updated to match backend
    rank: "", // Added rank field
  });

  const router = useRouter();

  const [userType, setUserType] = useState("admin"); // Default to admin
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const route = userType === "admin" ? "admin" : "dutyofficer";
    const url = `http://localhost:8000/api/auth/${route}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response: ", data); // Log the response data

      if (data.error) {
        console.error("Error: ", data.error);
      } else if (data.existing_admin || data.existing_dutyOfficer) {
        // Save token and user information in local storage
        if (data.existing_admin) {
          localStorage.setItem("senderId", data.existing_admin.id); // Corrected key to "senderId"
        }
        if (data.existing_dutyOfficer) {
          localStorage.setItem("dutyofficerId", data.existing_dutyOfficer.id);
        }
        localStorage.setItem("name", formData.name);

        alert("Login successful!"); // Show alert
        const redirectId = data.existing_admin ? data.existing_admin.id : data.existing_dutyOfficer.id;
        router.push(`/dashboard/${userType}/`); // Redirect to dashboard
      } else {
        console.error("Unexpected response structure: ", data);
        alert("Unexpected response structure. Please check the console for more details.");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setLoading(false); // Set loading to false
    setFormData({
      name: "",
      phone: "", // Reset phone field
      batchId: "", // Reset batchId field
      rank: "", // Reset rank field
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Goa Police Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userType"
            >
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="admin">Admin</option>
              <option value="dutyofficer">Duty Officer</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="batchId"
            >
              Badge ID
            </label>
            <input
              type="text"
              id="batchId"
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your Badge ID"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rank"
            >
              Rank
            </label>
            <input
              type="text"
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your rank"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={24} /> // Use ClipLoader from react-spinners
              ) : (
                "Login"
              )} {/* Show loading text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;