import React, { useState } from "react";
import axios from "axios";

const LocationFetcher = ({ onLocationFetched }) => {
  const [loading, setLoading] = useState(false);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (response.data && response.data.address) {
            onLocationFetched(response.data);
          } else {
            alert("Unable to retrieve address.");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Error fetching address. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please check your browser permissions.");
        setLoading(false);
      }
    );
  };

  return (
    <button
      type="button"
      onClick={fetchLocation}
      disabled={loading}
      style={{
        padding: "6px 12px",
        backgroundColor: "#dda15e",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "0.8rem",
        fontWeight: "bold",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        transition: "background-color 0.2s",
      }}
      onMouseOver={(e) => {
          if(!loading) e.currentTarget.style.backgroundColor = "#bc6c25";
      }}
      onMouseOut={(e) => {
          if(!loading) e.currentTarget.style.backgroundColor = "#dda15e";
      }}
    >
      <i className="fas fa-map-marker-alt"></i>
      {loading ? "Fetching..." : "Use Current Location"}
    </button>
  );
};

export default LocationFetcher;
