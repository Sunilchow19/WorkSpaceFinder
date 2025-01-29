import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch } from 'react-redux';
import { loc } from '../Redux/global';

// Fix default Leaflet marker issue in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import LoadingMap from './loadingMap';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        dispatch(loc({ latitude, longitude }));
        await fetchNearbyPlaces(latitude, longitude);
      },
      (error) => {
        console.error("Error obtaining location", error);
      }
    );
  }, [dispatch]);

  const fetchNearbyPlaces = async (latitude, longitude) => {
    const url = `${process.env.REACT_APP_MAP_CONNECTION}&lon=${longitude}&lat=${latitude}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
          'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST
        }
      });

      console.log("API Response:", response.data); // Debugging log

      if (Array.isArray(response.data)) {
        setNearbyPlaces(response.data);
      } else {
        console.error("API did not return an array:", response.data);
        setNearbyPlaces([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setNearbyPlaces([]); // Avoid breaking .map()
    }
  };

  if (!currentLocation) return <div><LoadingMap/></div>;

  return (
    <MapContainer center={currentLocation} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* User's Current Location */}
      <Marker position={currentLocation} icon={defaultIcon}>
        <Popup>You are here!</Popup>
      </Marker>

      {/* Nearby Places - Safe mapping with fallback */}
      {Array.isArray(nearbyPlaces) &&
        nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            position={[
              place?.point?.lat || 0, 
              place?.point?.lon || 0
            ]}
            icon={defaultIcon}
          >
            <Popup>{place?.name || "Unknown Place"}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
