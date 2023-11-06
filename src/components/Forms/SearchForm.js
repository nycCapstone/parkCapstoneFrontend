import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { searchResultsSuccess, searchResultsLoading, searchResultsError } from "../../redux/search/searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Styles/SearchForm.css";
import axios from "../../api/axios";

const SearchForm = () => {
  const [placesLibrary, setPlacesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const [searchResult, setSearchResult] = useState("");
  const [formattedAddress, setFormattedAddress] = useState({});
  const placeHolder = useSelector(state => {
    if (state.searchResults.data?.length) {
      return state.searchResults.data[0].prop_address
    } else {
      return "Search for a spot (eg. NYC NY 1001)"
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const fA = place.formatted_address;
      if (!place?.address_components?.some((item) => {
        let c = item;
        if (item?.types?.includes("postal_code")) {
          const z = c?.long_name || c?.short_name;
          setFormattedAddress({ addr: fA, hasZip: true, zipCode: z });
          return true;
        } else {
          return false;
        }
      })) {
          setFormattedAddress({ addr: fA, hasZip: false, zipCode: '' })
      }

      console.log(`Formatted Address: ${fA}`);
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const getRelevantSpots = async () => {
    if (!formattedAddress?.addr){
      searchRef.current.focus();
      return;
    }
    dispatch(searchResultsLoading())
    await axios
      .post(`/get-spaces/address/a`, { ...formattedAddress })
      .then((res) => {
        if (res.data?.length>0) dispatch(searchResultsSuccess(res.data));
        if (res.data?.length===0) dispatch(searchResultsError("no results found"));
        navigate("/search-result");
      })
      .catch((e) =>{ console.error(e); dispatch(searchResultsError(e))});
  };


  return (
    <div>
      <div>
        <h2>Search for a Space</h2>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}  >
          <input
            type="text"
            placeholder={placeHolder}
            className="g-search"
            ref={searchRef}
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
              textOverflow: `ellipses`,
            }}
          />
        </Autocomplete>
      </div>
      <button className="button-cta" onClick={getRelevantSpots}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;