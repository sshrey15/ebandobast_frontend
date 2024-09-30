"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import { useRouter } from "next/navigation";



const PatrollingForm = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routes, setRoutes] = useState([]);
  const [numPersonnel, setNumPersonnel] = useState(0);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [officers, setOfficers] = useState([]);
  const [dutyOfficers, setDutyOfficers] = useState([]); // State to store duty officers
  const [supervisor, setSupervisor] = useState(""); // State to store supervisor name
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();

  useEffect(() => {
    // Fetch duty officers
    const fetchDutyOfficers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/dutyofficer");
        const data = await response.json();
        setDutyOfficers(data.dutyOfficers);
      } catch (error) {
        console.error("Error fetching duty officers: ", error);
      }
    };

    fetchDutyOfficers();
  }, []);

  useEffect(() => {
    // Retrieve supervisor name from local storage
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("name");
      if (user) {
        setSupervisor(user);
      }
    }
  }, []);

  // Route handling
  const handleRouteChange = (event) => {
    const selected = event.target.value;
    if (selected && !routes.includes(selected)) {
      setRoutes([...routes, selected]);
    }
    setSelectedRoute("");
  };

  const removeRoute = (routeToRemove) => {
    setRoutes(routes.filter((route) => route !== routeToRemove));
  };

  // Personnel and Officer handling
  const handlePersonnelChange = (event) => {
    const num = parseInt(event.target.value, 10);
    setNumPersonnel(num || 0);
    setOfficers([]);
  };

  const handleOfficerChange = (event) => {
    const selected = event.target.value;
    if (selected && !officers.includes(selected)) {
      setOfficers([...officers, selected]);
    }
    setSelectedOfficer("");
  };

  const removeOfficer = (officerToRemove) => {
    setOfficers(officers.filter((officer) => officer !== officerToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    // Combine startDate with startTime and endTime to create full Date objects
    const startDateTime = new Date(startDate);
    const [startHour, startMinute] = startTime.split(":");
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(startDate);
    const [endHour, endMinute] = endTime.split(":");
    endDateTime.setHours(endHour, endMinute);

    const formData = {
      name,
      vehicleNumber: vehicleNum,
      numofOfficers: numPersonnel,
      patrolOfficers: officers.slice(0, numPersonnel),
      supervisor,
      route: routes,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      date: startDate.toISOString(),
      description,
    };

    const url = `http://localhost:8000/api/patrols`;
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
        alert("Form submitted successfully!"); // Show alert
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setLoading(false); // Set loading to false
    setSelectedRoute("");
    setNumPersonnel("");
    setSelectedOfficer("");
    setRoutes([]);
    setDescription("");
    setName("");
    setVehicleNum("");
    setEndTime("");
    setStartTime("");
    setOfficers([]);
  };

 
  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen p-4">
      <div className="bg-white shadow-xl rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mt-6 p-6">
        <h1 className=" sm:text-xl font-semibold mb-4 text-center">
          Patrolling Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border rounded-lg w-full px-3 py-2 mt-1"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1">Vehicle Number</label>
              <input
                type="text"
                value={vehicleNum}
                onChange={(event) => setVehicleNum(event.target.value)}
                className="border rounded-lg w-full px-3 py-2 mt-1"
                placeholder="Enter Vehicle Number"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1">
                Number of Police Personnel
              </label>
              <input
                type="number"
                value={numPersonnel}
                onChange={handlePersonnelChange}
                className="border rounded-lg w-full px-3 py-2 mt-1"
                placeholder="Enter Number"
                required
              />
            </div>
          </div>

          {/* Officer Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-1">Select Officers</label>
            <select
              value={selectedOfficer}
              onChange={handleOfficerChange}
              className="border rounded-lg px-4 py-2 w-full mt-1"
            >
              <option value="" disabled>
                Select an officer
              </option>
              {dutyOfficers.map((officer) => (
                <option key={officer.id} value={officer.name}>
                  {officer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {officers.slice(0, numPersonnel).map((officer, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
              >
                <span className="mr-2">{officer}</span>
                <button
                  onClick={() => removeOfficer(officer)}
                  className="text-red-500 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {/* Supervisor Display */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-1">Supervisor</label>
            <input
              type="text"
              value={supervisor}
              readOnly
              className="border rounded-lg w-full px-3 py-2 mt-1 bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-1">Routes</label>
            <select
              value={selectedRoute}
              onChange={handleRouteChange}
              className="border rounded-lg px-4 py-2 w-full mt-1"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Ponda">Ponda</option>
              <option value="Fatorda">Fatorda</option>
              <option value="Navelim">Navelim</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {routes.map((route, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
              >
                <span className="mr-2">{route}</span>
                <button
                  onClick={() => removeRoute(route)}
                  className="text-red-500 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1">Time:</label>
              <div className="flex items-center">
                <input
                  type="time"
                  className="w-36 border rounded-lg px-2 py-1"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  placeholder="Start"
                  required
                />
                <span className="mx-2">to</span>
                <input
                  type="time"
                  className="w-36 border rounded-lg px-2 py-1"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  placeholder="End"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1">Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border rounded-lg w-full px-3 py-2 mt-1"
                placeholderText="Select Date"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-1">Description</label>
            <textarea
              className="border rounded-lg w-full px-3 py-2 mt-1"
              placeholder="Enter Description"
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold w-full"
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
    </div>
  );
};

export default PatrollingForm;