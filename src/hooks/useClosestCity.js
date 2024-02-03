import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/client/locationSlice";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from "axios";

const useClosestCity = () => {
  const [closestCity, setClosestCity] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const getCity = async () => {
      const location = await getLocation();
      if (location) {
        const { latitude, longitude } = location;
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_KEY}`,
          );

          if (response.data.results.length > 0) {
            // Extract the city from the API response
            const city = response.data.results[0].address_components.find(
              (component) => component.types.includes("locality"),
            );

            if (city) {
              dispatch(
                setLocation({
                  latitude: latitude,
                  longitude: longitude,
                  city: city.long_name,
                }),
              );
              setClosestCity(city.long_name);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              if (result.state === "granted") {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    resolve({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    });
                  },
                  (error) => {
                    console.error(error);
                    reject(error);
                  },
                  options,
                );
              } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    resolve({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    });
                  },
                  (error) => {
                    console.error(error);
                    reject(error);
                  },
                  options,
                );
              } else if (result.state === "denied") {
                resolve(null);
              }
            });
        } else {
          // Geolocation not supported by the browser
          console.log("Geolocation is not supported by your browser.");
          reject(new Error("Geolocation not supported"));
        }
      });
    };
    getCity();
  }, []);
  return closestCity;
};

export default useClosestCity;
