import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Polygon } from "ol/geom";
import { Feature } from "ol";
import { Style, Fill, Stroke } from "ol/style";

const BandobastMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [bandobastData, setBandobastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBandobastData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bandobast/9b4e8c25-661e-4698-9e30-e50d81e80f47');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBandobastData(data);
      } catch (e) {
        setError(`Failed to fetch bandobast data: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBandobastData();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const initialMap = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([73.956, 15.276]), // Center of the map (adjusted to your data)
          zoom: 14,
        }),
      });

      setMap(initialMap);

      return () => {
        initialMap.setTarget(null);
      };
    }
  }, [loading, error]);

  useEffect(() => {
    if (map && bandobastData && bandobastData.bandobast && bandobastData.bandobast.coordinates) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({ source: vectorSource });
      map.addLayer(vectorLayer);

      bandobastData.bandobast.coordinates.forEach(coord => {
        const polygonCoords = [
          [
            fromLonLat([parseFloat(coord.longitude1), parseFloat(coord.latitude1)]),
            fromLonLat([parseFloat(coord.longitude2), parseFloat(coord.latitude2)]),
            fromLonLat([parseFloat(coord.longitude3), parseFloat(coord.latitude3)]),
            fromLonLat([parseFloat(coord.longitude4), parseFloat(coord.latitude4)]),
            fromLonLat([parseFloat(coord.longitude1), parseFloat(coord.latitude1)]), // Close the polygon
          ],
        ];

        const polygonFeature = new Feature({
          geometry: new Polygon(polygonCoords),
          name: coord.teamName,
        });

        const teamColors = {
          ALPHA: "rgba(255, 0, 0, 0.4)", // Red
          BRAVO: "rgba(0, 255, 0, 0.4)", // Green
          DELTA: "rgba(0, 0, 255, 0.4)", // Blue
        };

        const teamColor = teamColors[coord.teamName.trim()] || "rgba(0, 0, 0, 0.4)"; // Default color
        polygonFeature.setStyle(new Style({
          fill: new Fill({ color: teamColor }),
          stroke: new Stroke({ color: "#000", width: 2 }),
        }));

        vectorSource.addFeature(polygonFeature);
      });

      const extent = vectorSource.getExtent();
      map.getView().fit(extent, { padding: [20, 20, 20, 20], duration: 1000 });
    }
  }, [map, bandobastData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default BandobastMap;