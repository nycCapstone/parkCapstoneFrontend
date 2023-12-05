import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const MapView = ({ lat, lng, zoom, markerArray }) => {
  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: `1600px`,
  };

  const mapOptions = {
    mapContainerStyle: containerStyle,
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
      {...mapOptions}
      center={{ lat: lat - 0.18, lng }}
      zoom={zoom || 13}
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
              key={i}
            >
              <InfoWindow>
                <div
                  className="infowindow-price"
                  style={{ fontWeight: i === 0 ? "bold" : "300" }}
                  id={`${i}infowindow`}
                >
                  <p>${item.price}</p>
                </div>
              </InfoWindow>
            </Marker>
          );
        })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapView);
