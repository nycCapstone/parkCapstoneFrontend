import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "25rem",
  height: "25rem",
};

const MapView = ({ lat, lng, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // const bounds = new window.google.maps.LatLngBounds({ lat, lng });
    // map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={zoom || 18}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {lat && lng && <Marker position={{ lat, lng }} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapView);
