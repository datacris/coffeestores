import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // separated by '%2C' for API purposes consummed in FOURSQUARE
    setLatLong(`${latitude}%2C${longitude}`);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      isFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};
export default useTrackLocation;
