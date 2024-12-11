import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Dialog, DialogContent } from "@mui/material"; 
import BusinessInfo from "./BusinessInfo";
import "./Map.css";

//nyc as a defult location 
function Map({ location = { lat: 40.758, lng: -73.9855 } }) {
  const [markers, setMarkers] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const [selectionError, setSelectionError] = useState("");

  //fetch the places from google API
  useEffect(() => {
    async function fetchBusinesses() {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&key=AIzaSyBZXuHIU60qWW19XNt80r4gtvox6WEXdb0`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMarkers(data.results.map(place => ({
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          name: place.name,
          rating: place.rating || "No rating available",
          imageUrl: place.photos && place.photos.length > 0
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyBZXuHIU60qWW19XNt80r4gtvox6WEXdb0`
            : "https://via.placeholder.com/150",
          address: place.vicinity || "Address not available",
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchBusinesses();
  }, [location]);

  //mark palces on the map
  function handleMarkerClick(clickedBusiness) {
    const isAlreadySelected = selectedBusinesses.some(business => business.name === clickedBusiness.name);
    if (isAlreadySelected) {
      setSelectedBusinesses(prev => prev.filter(business => business.name !== clickedBusiness.name));
    } else if (selectedBusinesses.length >= 3) {
      setSelectionError("You can only select up to 3 businesses."); 
    } else {
      setSelectedBusinesses(prev => [...prev, clickedBusiness]);
      setSelectionError(""); 
    }
  }

  function handleShowSelected() {
    setShowSelected(!showSelected);
  }

  function handleClose() {
    setSelectedBusiness(null);
  }

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerClassName="map-container"
          center={location}
          zoom={15}
          options={{
            gestureHandling: "auto",
            draggable: true,
            scrollwheel: true,
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.name}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {selectionError && <p className="error-message">{selectionError}</p>}

      <button className="show-selected-button" onClick={handleShowSelected}>
        {showSelected ? "Hide Selected Businesses" : "Show Selected Businesses"}
      </button>

      {showSelected && (
        <div className="selected-businesses">
          <h3>Selected Businesses</h3>
          {selectedBusinesses.length === 0 ? (
            <p>No businesses selected. Click markers to select up to 3.</p>
          ) : (
            <ul>
              {selectedBusinesses.map((business, index) => (
                <li key={index}>
                  <img src={business.imageUrl} alt={business.name} width={50} />
                  <div>
                    <strong>{business.name}</strong>
                    <p>{business.address}</p>
                    <p>Rating: {business.rating}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selectedBusiness && (
        <Dialog open={Boolean(selectedBusiness)} onClose={handleClose}>
          <DialogContent>
            <BusinessInfo business={selectedBusiness} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default Map;