import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const PSMapView = ({ lat, lng, zoom }) => {
  const containerStyle = {
    width: "100%",
    height: "50vh",
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
    <div className="google-map-containerMap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={zoom || 18}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {lat && lng && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(PSMapView);
