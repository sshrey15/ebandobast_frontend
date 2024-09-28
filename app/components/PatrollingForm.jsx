// "use client";

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const PatrollingForm = () => {
//   const [selectedRoute, setSelectedRoute] = useState("");
//   const [routes, setRoutes] = useState([]);
//   const [numPersonnel, setNumPersonnel] = useState(0);
//   const [selectedOfficer, setSelectedOfficer] = useState("");
//   const [officers, setOfficers] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [name, setName] = useState("");
//   const [vehicleNum, setVehicleNum] = useState("");
//   const [description, setDescription] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const availableOfficers = [
//     "Officer A",
//     "Officer B",
//     "Officer C",
//     "Officer D",
//   ];

//   const handleRouteChange = (event) => {
//     const selected = event.target.value;
//     if (selected && !routes.includes(selected)) {
//       setRoutes([...routes, selected]);
//     }
//     setSelectedRoute("");
//   };

//   const removeRoute = (routeToRemove) => {
//     setRoutes(routes.filter((route) => route !== routeToRemove));
//   };

//   const handlePersonnelChange = (event) => {
//     const num = parseInt(event.target.value, 10);
//     setNumPersonnel(num || 0);
//     setOfficers([]);
//   };

//   const handleOfficerChange = (event) => {
//     const selected = event.target.value;
//     if (selected && !officers.includes(selected)) {
//       setOfficers([...officers, selected]);
//     }
//     setSelectedOfficer("");
//   };

//   const removeOfficer = (officerToRemove) => {
//     setOfficers(officers.filter((officer) => officer !== officerToRemove));
//   };

//   const handleSubmit = () => {
//     const formData = {
//       name,
//       vehicleNum,
//       numPersonnel,
//       officers: officers.slice(0, numPersonnel),
//       routes,
//       startTime,
//       endTime,
//       startDate,
//       description,
//     };

//     console.log(formData);

//     setSelectedRoute("");
//     setNumPersonnel("");
//     setSelectedOfficer("");
//     setRoutes([]);
//     setDescription("");
//     setName("");
//     setVehicleNum("");
//     setEndTime("");
//     setStartTime("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-start bg-white min-h-screen p-4">
//       <div className="bg-white shadow-lg rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mt-6 p-6">
//         <h1 className=" sm:text-xl font-semibold mb-4 text-center">
//           Patrolling Form
//         </h1>

//         <div className="mb-4">
//           <label className="text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             className="border rounded-lg w-full px-3 py-2 mt-1"
//             placeholder="Enter Name"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="text-sm font-medium mb-1">Vehicle Number</label>
//             <input
//               type="text"
//               value={vehicleNum}
//               onChange={(event) => setVehicleNum(event.target.value)}
//               className="border rounded-lg w-full px-3 py-2 mt-1"
//               placeholder="Enter Vehicle Number"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium mb-1">
//               Number of Police Personnel
//             </label>
//             <input
//               type="number"
//               value={numPersonnel}
//               onChange={handlePersonnelChange}
//               className="border rounded-lg w-full px-3 py-2 mt-1"
//               placeholder="Enter Number"
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="text-sm font-medium mb-1">Select Officers</label>
//           <select
//             value={selectedOfficer}
//             onChange={handleOfficerChange}
//             className="border rounded-lg px-4 py-2 w-full mt-1"
//           >
//             <option value="" disabled>
//               Select an officer
//             </option>
//             {availableOfficers.map((officer) => (
//               <option key={officer} value={officer}>
//                 {officer}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {officers.slice(0, numPersonnel).map((officer, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
//             >
//               <span className="mr-2">{officer}</span>
//               <button
//                 onClick={() => removeOfficer(officer)}
//                 className="text-red-500 font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//           ))}
//         </div>

//         <div>
//           <label className="flex flex-wrap gap-2 mb-4 font-semibold">
//             Supervisor: <span className=" font-normal">Singham</span>
//           </label>
//         </div>

//         <div className="mb-4">
//           <label className="text-sm font-medium mb-1">Routes</label>
//           <select
//             value={selectedRoute}
//             onChange={handleRouteChange}
//             className="border rounded-lg px-4 py-2 w-full mt-1"
//           >
//             <option value="" disabled>
//               Select an option
//             </option>
//             <option value="Ponda">Ponda</option>
//             <option value="Fatorda">Fatorda</option>
//             <option value="Navelim">Navelim</option>
//           </select>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {routes.map((route, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
//             >
//               <span className="mr-2">{route}</span>
//               <button
//                 onClick={() => removeRoute(route)}
//                 className="text-red-500 font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="text-sm font-medium mb-1">Time:</label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 className="w-16 border rounded-lg px-2 py-1"
//                 value={startTime}
//                 onChange={(event) => setStartTime(event.target.value)}
//                 placeholder="Start"
//               />
//               <span className="mx-2">to</span>
//               <input
//                 type="text"
//                 className="w-16 border rounded-lg px-2 py-1"
//                 value={endTime}
//                 onChange={(event) => setEndTime(event.target.value)}
//                 placeholder="End"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium mb-1">Date:</label>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               className="border rounded-lg w-full px-3 py-2 mt-1"
//               placeholderText="Select Date"
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="text-sm font-medium mb-1">Description</label>
//           <textarea
//             className="border rounded-lg w-full px-3 py-2 mt-1"
//             placeholder="Enter Description"
//             rows="4"
//             value={description}
//             onChange={(event) => setDescription(event.target.value)}
//           ></textarea>
//         </div>

//         <div className="flex justify-center">
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold w-full"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatrollingForm;

"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PatrollingForm = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routes, setRoutes] = useState([]);
  const [numPersonnel, setNumPersonnel] = useState(0);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [officers, setOfficers] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const availableOfficers = [
    "Officer A",
    "Officer B",
    "Officer C",
    "Officer D",
  ];
  const availableSupervisors = ["Supervisor X", "Supervisor Y", "Supervisor Z"];

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

  // Supervisor handling
  const handleSupervisorChange = (event) => {
    const selected = event.target.value;
    if (selected && !supervisors.includes(selected)) {
      setSupervisors([...supervisors, selected]);
    }
    setSelectedSupervisor("");
  };

  const removeSupervisor = (supervisorToRemove) => {
    setSupervisors(
      supervisors.filter((supervisor) => supervisor !== supervisorToRemove)
    );
  };

  const handleSubmit = () => {
    const formData = {
      name,
      vehicleNum,
      numPersonnel,
      officers: officers.slice(0, numPersonnel),
      supervisors,
      routes,
      startTime,
      endTime,
      startDate,
      description,
    };

    console.log(formData);

    setSelectedRoute("");
    setNumPersonnel("");
    setSelectedOfficer("");
    setSelectedSupervisor("");
    setRoutes([]);
    setDescription("");
    setName("");
    setVehicleNum("");
    setEndTime("");
    setStartTime("");
    setSupervisors([]);
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen p-4">
      <div className="bg-white shadow-xl rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mt-6 p-6">
        <h1 className=" sm:text-xl font-semibold mb-4 text-center">
          Patrolling Form
        </h1>

        <div className="mb-4">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border rounded-lg w-full px-3 py-2 mt-1"
            placeholder="Enter Name"
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
            {availableOfficers.map((officer) => (
              <option key={officer} value={officer}>
                {officer}
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

        {/* Supervisor Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-1">Select Supervisor</label>
          <select
            value={selectedSupervisor}
            onChange={handleSupervisorChange}
            className="border rounded-lg px-4 py-2 w-full mt-1"
          >
            <option value="" disabled>
              Select a supervisor
            </option>
            {availableSupervisors.map((supervisor) => (
              <option key={supervisor} value={supervisor}>
                {supervisor}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {supervisors.map((supervisor, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
            >
              <span className="mr-2">{supervisor}</span>
              <button
                onClick={() => removeSupervisor(supervisor)}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </div>
          ))}
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
              />
              <span className="mx-2">to</span>
              <input
                type="time"
                className="w-36 border rounded-lg px-2 py-1"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                placeholder="End"
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
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatrollingForm;
