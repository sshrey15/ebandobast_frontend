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
import Drawer from "../components/Drawer";

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [drawingMode, setDrawingMode] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [selectedPlatoon, setSelectedPlatoon] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const mapRef = useRef(null);
  const mainMap = useRef(null);
  const drawInteraction = useRef(null);
  const vectorLayer = useRef(null);

  const platoonColors = {
    ALPHA: "rgba(255, 0, 0, 0.5)", // Red
    Bravo: "rgba(0, 255, 0, 0.5)", // Green
    Charlie: "rgba(0, 0, 255, 0.5)", // Blue
    Delta: "rgba(255, 255, 0, 0.5)", // Yellow
  };

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
      const platoonIndex = jsonData[0].indexOf("Platoon");
      const startTimeIndex = jsonData[0].indexOf("startTiming");
      const endTimeIndex = jsonData[0].indexOf("EndTiming");

      const extractedLocations = jsonData.slice(1).map((row) => ({
        name: row[locationIndex],
        platoon: row[platoonIndex],
        startTime: formatExcelTime(row[startTimeIndex]),
        endTime: formatExcelTime(row[endTimeIndex]),
        lat: null,
        lng: null,
      }));
      setLocations(extractedLocations);
    };

    reader.readAsArrayBuffer(file);
  };

  const formatExcelTime = (excelDate) => {
    const epoch = new Date(1899, 11, 30);
    return new Date(epoch.getTime() + excelDate * 86400000).toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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

        const logData = {
          id: "some-unique-id",
          teamName: selectedPlatoon,
          latitude1: transformedCoords[0][1],
          longitude1: transformedCoords[0][0],
          latitude2: transformedCoords[1][1],
          longitude2: transformedCoords[1][0],
          latitude3: transformedCoords[2][1],
          longitude3: transformedCoords[2][0],
          latitude4: transformedCoords[3][1],
          longitude4: transformedCoords[3][0],
          bandobastId: "some-bandobast-id",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        console.log("Polygon Data:", JSON.stringify(logData, null, 2));

        const platoonColor = platoonColors[selectedPlatoon] || "rgba(255, 0, 0, 0.5)";
        event.feature.setStyle(
          new Style({
            fill: new Fill({
              color: platoonColor,
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
            <label htmlFor="platoon-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Platoon
            </label>
            <select
              id="platoon-select"
              value={selectedPlatoon || ""}
              onChange={(e) => setSelectedPlatoon(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">--Select Platoon--</option>
              {Array.from(new Set(locations.map((location) => location.platoon)))
                .map((platoon, index) => (
                  <option key={index} value={platoon}>
                    {platoon}
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
            onClick={() => setIsDrawerOpen(true)}
            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            View Locations
          </button>
        </div>

        <div className="flex-1 p-4">
          <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
            <div ref={mapRef} className="w-full h-full"></div>
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">Uploaded Locations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platoon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{location.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{location.platoon}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{location.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{location.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Drawer>
    </>
  );
};

export default ExcelUpload;