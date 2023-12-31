import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const PSMapView = ({ lat, lng, zoom }) => {
  const containerStyle = {
    width: "15rem",
    height: "12rem",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={zoom || 16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {lat && lng && <Marker position={{ lat, lng }} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(PSMapView);
