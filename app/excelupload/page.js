"use client";
import { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import "ol/ol.css";
import Modal from "react-modal";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Fill, Stroke } from "ol/style";
import Draw from "ol/interaction/Draw";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
import Drawer from "../components/Drawer";

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [drawingMode, setDrawingMode] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const mapRef = useRef(null);
  const mainMap = useRef(null);
  const drawInteraction = useRef(null);
  const vectorLayer = useRef(null);

  const teamColors = {
    ALPHA: "rgba(255, 0, 0, 0.5)", // Red
    BRAVO: "rgba(0, 255, 0, 0.5)", // Green
    CHARLIE: "rgba(0, 0, 255, 0.5)", // Blue
    DELTA: "rgba(255, 255, 0, 0.5)", // Yellow
  };

  // Handle file upload and extract data
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(jsonData);
      console.log("mc_data: ", jsonData);

      const locationIndex = jsonData[0].indexOf("Duty Location");
      const teamIndex = jsonData[0].indexOf("teamName");
      const startTimeIndex = jsonData[0].indexOf("startTime");
      const endTimeIndex = jsonData[0].indexOf("endTime");

      const extractedLocations = jsonData.slice(1).map((row) => ({
        name: row[locationIndex],
        teamName: row[teamIndex],
        startTime: formatExcelTime(row[startTimeIndex]),
        endTime: formatExcelTime(row[endTimeIndex]),
        lat: null,
        lng: null,
      }));
      setLocations(extractedLocations);
    };

    reader.readAsArrayBuffer(file);
  };

  // Format Excel time to readable format
  const formatExcelTime = (excelDate) => {
    const epoch = new Date(1899, 11, 30);
    return new Date(epoch.getTime() + excelDate * 86400000).toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Toggle drawing mode and handle drawing interaction
  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    if (!drawingMode) {
      drawInteraction.current = new Draw({
        source: vectorLayer.current.getSource(),
        type: "Polygon",
      });

      drawInteraction.current.on("drawend", (event) => {
        const coordinates = event.feature.getGeometry().getCoordinates();
        const transformedCoords = coordinates[0].map((coord) => toLonLat(coord));
        setPolygonCoordinates(transformedCoords);

        const teamColor = teamColors[selectedTeam] || "rgba(255, 0, 0, 0.5)";
        event.feature.setStyle(
          new Style({
            fill: new Fill({
              color: teamColor,
            }),
            stroke: new Stroke({
              color: "#333",
              width: 2,
            }),
          })
        );
      });

      mainMap.current.addInteraction(drawInteraction.current);
    } else {
      mainMap.current.removeInteraction(drawInteraction.current);
    }
  };

  // Post data to backend
  const postData = async () => {
    setLoading(true);
    setLoadingMessage(
      <div className="flex items-center space-x-4">
        <ClipLoader size={35} color={"#123abc"} loading={true} />
        <p>Getting Excel data...</p>
      </div>
    );

    setTimeout(async () => {
      setLoadingMessage(
        <div className="flex items-center space-x-4">
          <ClipLoader size={35} color={"#123abc"} loading={true} />
          <p>Analyzing data...</p>
        </div>
      );

      const bandobastId = localStorage.getItem("bandobastId"); // Retrieve bandobastId from localStorage

      // Post coordinates data
      if (polygonCoordinates.length > 0) {
        const logData = {
          teamName: selectedTeam,
          latitude1: polygonCoordinates[0][1],
          longitude1: polygonCoordinates[0][0],
          latitude2: polygonCoordinates[1][1],
          longitude2: polygonCoordinates[1][0],
          latitude3: polygonCoordinates[2][1],
          longitude3: polygonCoordinates[2][0],
          latitude4: polygonCoordinates[3][1],
          longitude4: polygonCoordinates[3][0],
          bandobastId: bandobastId || "some-bandobast-id", // Use bandobastId from localStorage or fallback
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        console.log("Polygon Data:", JSON.stringify(logData, null, 2));

        try {
          const response = await fetch("http://localhost:8000/api/coordinates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseData = await response.json();
          console.log("Response Data:", responseData);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      }

      // Post Excel data
      const formattedData = data.slice(1).map((row, index) => {
        const [
          teamNameRaw,
          officerNameRaw,
          mobileNumberRaw,
          , // Skipping the 4th column
          supervisionOfficerRaw,
          charterOfDutyRaw,
          startTimeRaw,
          endTimeRaw,
          callSignRaw
        ] = row;

        const teamName = teamNameRaw?.trim();
        const officerName = officerNameRaw?.trim();
        const mobileNumber = mobileNumberRaw?.toString();
        const supervisionOfficer = supervisionOfficerRaw?.trim();
        const charterOfDuty = charterOfDutyRaw?.trim();
        const startTime = startTimeRaw?.trim();
        const endTime = endTimeRaw?.trim();
        const callSign = callSignRaw?.trim();

        console.log("Row Data:", {
          teamName,
          officerName,
          mobileNumber,
          supervisionOfficer,
          charterOfDuty,
          startTime,
          endTime,
          callSign,
        });

        // Validate and format time values
        const isValidTime = (time) => /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.test(time);
        const formatTime = (time) => {
          const [_, hours, minutes, period] = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i) || [];
          if (!hours || !minutes || !period) return null;
          const date = new Date();
          date.setHours(period.toUpperCase() === 'PM' ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12);
          date.setMinutes(parseInt(minutes));
          date.setSeconds(0);
          return date.toISOString();
        };

        const formattedStartTime = isValidTime(startTime) ? formatTime(startTime) : null;
        const formattedEndTime = isValidTime(endTime) ? formatTime(endTime) : null;

        console.log("Formatted Times:", {
          formattedStartTime,
          formattedEndTime,
        });

        if (!teamName || !officerName || !mobileNumber || !supervisionOfficer || !charterOfDuty || !formattedStartTime || !formattedEndTime || !callSign) {
          console.error(`Invalid data at row ${index + 1}:`, {
            teamName,
            officerName,
            mobileNumber,
            supervisionOfficer,
            charterOfDuty,
            startTime,
            endTime,
            callSign,
          });
          return null;
        }

        // Get today's date and format it to the required format
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0] + "T00:00:00.000Z";

        return {
          teamName,
          officerName,
          mobileNumber,
          supervisionOfficer,
          charterOfDuty,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          date: formattedDate,
          callSign,
          bandobastId: bandobastId || "some-bandobast-id", // Use bandobastId from localStorage or fallback
        };
      }).filter(item => item !== null); // Filter out invalid entries

      // Log each object in the formattedData array separately
      formattedData.forEach((item, index) => {
        console.log(`Formatted Data [${index + 1}]:`, item);
      });

      for (const item of formattedData) {
        try {
          const response = await fetch("http://localhost:8000/api/bandoass", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseData = await response.json();
          console.log("Response Data:", responseData);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      }

      setLoadingMessage(
        <div className="flex items-center space-x-4">
          <ClipLoader size={35} color={"#123abc"} loading={true} />
          <p>Posting data success...</p>
        </div>
      );
      setTimeout(() => {
        setLoading(false);
        setLoadingMessage("");
      }, 2000);
    }, 2000);
  };

  // Initialize map and vector layer
  useEffect(() => {
    if (mapRef.current && !mainMap.current) {
      const boundingBox = [73.947, 15.265, 73.9686, 15.2856];
      const extent = fromLonLat([boundingBox[0], boundingBox[1]]).concat(
        fromLonLat([boundingBox[2], boundingBox[3]])
      );

      mainMap.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([73.9578, 15.2753]),
          zoom: 15,
          extent: extent,
        }),
      });

      const vectorSource = new VectorSource();
      vectorLayer.current = new VectorLayer({
        source: vectorSource,
      });

      mainMap.current.addLayer(vectorLayer.current);
      mainMap.current.getView().fit(extent, {
        size: mainMap.current.getSize(),
        padding: [50, 50, 50, 50],
      });
    }
  }, [locations]);

  return (
    <>
      <Head>
        <title>Excel Upload</title>
      </Head>
      <div className="flex h-screen bg-gray-100 ml-12">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">{loadingMessage}</p>
            </div>
          </div>
        )}
        <div className="w-1/4 p-4 bg-white shadow-md overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Excel Upload</h2>
          <div className="mb-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Excel File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="team-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Team
            </label>
            <select
              id="team-select"
              value={selectedTeam || ""}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">--Select Team--</option>
              {Array.from(new Set(locations.map((location) => location.teamName)))
                .map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
            </select>
          </div>

          <button
            onClick={toggleDrawingMode}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              drawingMode ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            } transition-colors duration-300`}
          >
            {drawingMode ? "Stop Drawing" : "Start Drawing"}
          </button>

          <button
            onClick={postData}
            className="w-full py-2 px-4 mt-4 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            Post Data
          </button>
        </div>

        <div className="flex-1 p-4">
          <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
            <div ref={mapRef} className="w-full h-full"></div>
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default ExcelUpload;