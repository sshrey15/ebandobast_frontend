// AlertInfo.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const AlertInfo = () => {
  const [formData, setFormData] = useState({
    description: "",
    images: [],
    location: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Request the user's geolocation
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);

          // Fetch location data from Nominatim API
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            console.log("Location Data:", data);

            // Update the location input field with the display_name
            setFormData((prevData) => ({
              ...prevData,
              location: data.display_name,
            }));
          } catch (error) {
            console.error("Error fetching location data:", error);
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files);
      setFormData((prevData) => ({ ...prevData, images: selectedFiles }));

      // Preview the images
      const imagePreviewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(imagePreviewUrls);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Convert images to base64
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const base64Images = await Promise.all(
      formData.images.map((file) => convertToBase64(file))
    );

    const payload = {
      description: formData.description,
      imgURL: base64Images,
      location: formData.location,
      bandobastId: localStorage.getItem("bandobastId"),
      patrolId: localStorage.getItem("patrolId"),
    };

    try {
      const response = await fetch("/api/alertinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Alert info submitted successfully:", result);
      } else {
        console.error("Error submitting alert info:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);

      // Reset the form after submission
      setFormData({
        description: "",
        images: [],
        location: "",
      });

      setImagePreviews([]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Alert Information
        </h2>

        {/* Description Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
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

        {/* Image Upload Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="images"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {imagePreviews.map((preview, index) => (
                <Image
                  key={index}
                  src={preview}
                  width={200}
                  height={200}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-auto rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={
              loadingLocation ? "Adding location..." : "Enter the location"
            }
            required
            disabled={loadingLocation}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlertInfo;
