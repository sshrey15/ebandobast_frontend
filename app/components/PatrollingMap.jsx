import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const PatrollingMap = () => {
  const mapRef = useRef(null); // To reference the map container div

  useEffect(() => {
    // Initialize the map once the component is mounted
    const map = new Map({
      target: mapRef.current, // Reference to the div where the map will be rendered
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap layer
        }),
      ],
      view: new View({
        center: fromLonLat([72.8777, 19.0760]), // Mumbai's coordinates as center (example)
        zoom: 12, // Initial zoom level
      }),
    });

    // Clean up map on component unmount
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      {/* The map will be rendered inside this div */}
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default PatrollingMap;
