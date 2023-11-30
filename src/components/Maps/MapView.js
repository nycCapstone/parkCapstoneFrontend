import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapView = ({ lat, lng, zoom, markerArray }) => {
  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "260%",
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
      zoom={zoom || 12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markerArray.length > 0 &&
        markerArray.map((item, i) => {
          return (
            <Marker
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: i === 0 ? "blue" : "red",
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 10,
              }}
              position={{ lat: item.lat, lng: item.lng }}
            />
          );
        })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapView);
