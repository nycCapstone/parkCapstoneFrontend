import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { searchBookings } from "../../redux/client/clientSearchSlice";
import "../Forms/Styles/SearchForm.css";

const ClientSearchForm = () => {
  const [placesLibrary, setPlacesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const [searchResult, setSearchResult] = useState("");
  const [formattedAddress, setFormattedAddress] = useState({});
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const dispatch = useDispatch();
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

  const searchForAvail = (e) => {
    e.preventDefault();
    if (!formattedAddress?.addr){
      searchRef.current.focus();
      return;
    }
    dispatch(searchBookings([formattedAddress?.zipCode || '', formattedAddress?.addr || '', startTime, endTime]))

  };

  return (
    <div>
      <div>
            </div>
        <form onSubmit={searchForAvail}>
        <h2>Search for a Space</h2>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}  >
          <input
            type="text"
            placeholder="nyc"
            className="g-search"
            ref={searchRef}
            style={{

              width: `240px`,
              height: `32px`,

            }}
          />
        </Autocomplete>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" value={startTime} onChange={handleStartTimeChange} />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} />
        </div>
        {error && <p className="error">{error}</p>}
      <button className="button-cta" type="submit">
        Search
      </button>

        </form>
    </div>
  );
};

export default ClientSearchForm;