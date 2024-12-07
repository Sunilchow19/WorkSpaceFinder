import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  // Fetch user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        fetchNearbyPlaces(latitude, longitude); // Fetch places after getting location
      },
      (error) => {
        console.error("Error obtaining location", error);
      }
    );
  }, []);

  // Fetch nearby places from Google Places API
  const fetchNearbyPlaces = (latitude, longitude) => {
    const apiKey = 'AIzaSyBdvoOfYo8V8ThFxzdTUGbWFFMK4P-UMTQ'; // Your API key
    const radius = 1000; // 1000 meters
    const type = 'restaurant'; // Example: find restaurants

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
    )
      .then(response => response.json())
      .then(data => {
        setNearbyPlaces(data.results);
      })
      .catch(error => console.error("Error fetching places:", error));
  };

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  if (!currentLocation) return <div>Loading map...</div>;

  return (
    <LoadScript googleMapsApiKey="AIzaSyBdvoOfYo8V8ThFxzdTUGbWFFMK4P-UMTQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={14}
      >
        <Marker position={currentLocation} />
        {nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
