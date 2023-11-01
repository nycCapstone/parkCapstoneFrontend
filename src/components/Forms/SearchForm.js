import { searchResultsSuccess } from "../../redux/search/searchResultsSlice";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Styles/SearchForm.css";
import axios from "../../api/axios";

const SearchForm = () => {
  const [searchResult, setSearchResult] = useState("Result: none");
  const [placesLibrary, setPlacesLibrary] = useState(["places"]);
  const [formattedAddress, setFormattedAddress] = useState('');
  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const fA = place.formatted_address;

      console.log(`Formatted Address: ${fA}`);
      setFormattedAddress(fA)
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const getGeocodeData = async () => {


    await axios
      .post(`/get-spaces/address/a`, { addr: formattedAddress })
      .then((res) => {
        dispatch(searchResultsSuccess(res.data));
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <div>
        <h2>Search for a Space</h2>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder="100 east street, NYC, NY"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </Autocomplete>
      </div>
      <button onClick={getGeocodeData}>Get Address Data</button>
    </div>
  );
};

export default SearchForm;