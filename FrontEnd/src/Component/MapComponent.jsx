import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch } from 'react-redux';  // Import useDispatch
import { loc } from '../Redux/global';  // Import the loc action

// Fix default Leaflet marker issue in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapComponent = () => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const dispatch = useDispatch();  // Initialize dispatch

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        dispatch(loc({ latitude, longitude }));  // Dispatch latitude and longitude to Redux
        await fetchNearbyPlaces(latitude, longitude);
      },
      (error) => {
        console.error("Error obtaining location", error);
      }
    );
  }, [dispatch]);  // Adding dispatch as a dependency to avoid potential issues

  const fetchNearbyPlaces = async (latitude, longitude) => {
    // Build the URL dynamically using the latitude and longitude
    const url = `${process.env.REACT_APP_MAP_CONNECTION}&lon=${longitude}&lat=${latitude}`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST
      }
    };

    try {
      const response = await axios.get(url, options);
      setNearbyPlaces(response.data || []);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  if (!currentLocation) return <div>Loading map...</div>;

  return (
    <MapContainer center={currentLocation} zoom={14} style={{ height: "400px", width: "100%" }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* User's Current Location */}
      <Marker position={currentLocation} icon={defaultIcon}>
        <Popup>You are here!</Popup>
      </Marker>

      {/* Nearby Places */}
      {nearbyPlaces.map((place, index) => (
        <Marker key={index} position={[place.point.lat, place.point.lon]} icon={defaultIcon}>
          <Popup>{place.name || "Unknown Place"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
