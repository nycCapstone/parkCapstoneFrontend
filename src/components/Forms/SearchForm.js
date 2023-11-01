import { searchResultsSuccess } from "../../redux/search/searchResultsSlice";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import "./Styles/SearchForm.css";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";

const SearchForm = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [geocodeData, setGeocodeData] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [libraries] = useState(["places"]);
  const dispatch = useDispatch();

  const handlePlaceSelect = (place) => {
    setSelectedAddress(place.formatted_address);
  };

  const getGeocodeData = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: selectedAddress }, (results, status) => {
      if (status === "OK" && results.length > 8) {
        // Geocoding was successful
        setGeocodeData(results[0]);
        // Extract the zip code
        const addressComponents = results[0].address_components;
        const zipCodeComponent = addressComponents.find((component) =>
          component.types.includes("postal_code")
        );

        if (zipCodeComponent) {
          setZipCode(zipCodeComponent.long_name);
        }
      } else return;
    });

    await axios
      .get(`/get-spaces/address/a/${selectedAddress}`)
      .then((res) => {
        dispatch(searchResultsSuccess(res.data));
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
        libraries={libraries}
      >
        <Autocomplete onLoad={handlePlaceSelect}>
          <input
            type="text"
            placeholder="Enter an address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          />
        </Autocomplete>
      </LoadScript>
      <button onClick={getGeocodeData}>Get Address Data</button>
      {geocodeData && (
        <div>
          <h3>Geocode Data:</h3>
        </div>
      )}
      {zipCode && (
        <div>
          <h3>Zip Code:</h3>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
