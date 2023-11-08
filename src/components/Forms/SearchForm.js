import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import {
  searchResultsSuccess,
  searchResultsLoading,
  searchResultsError,
} from "../../redux/search/searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePickerComponent from "./DatePicker";
import TimePickerComponent from "./TimePicker";
import axios from "../../api/axios";
import "./Styles/SearchForm.css";

const SearchForm = () => {
  const [placesLibrary, setPlacesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const [searchResult, setSearchResult] = useState("");
  const [formattedAddress, setFormattedAddress] = useState({});
  const placeHolder = useSelector((state) => {
    if (state.searchResults.data?.length) {
      return state.searchResults.data[0].prop_address;
    } else {
      return "Search for a spot (eg. NYC NY 1001)";
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [checkOutTime, setCheckOutTime] = useState("12:00 am");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  const generateTimeOptionsStart = () => {
    const options = [];
    for (let hour = new Date().getHours(); hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const isPM = hour >= 12;
        const hourStr = (hour % 12 || 12).toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        const ampm = isPM ? "pm" : "am";
        options.push(`${hourStr}:${minuteStr} ${ampm}`);
      }
    }
    return options;
  };

  const generateTimeOptionsEnd = () => {
    const options = [];
    for (let hour = new Date().getHours() + 3; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const isPM = hour >= 12;
        const hourStr = (hour % 12 || 12).toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        const ampm = isPM ? "pm" : "am";
        options.push(`${hourStr}:${minuteStr} ${ampm}`);
      }
    }
    return options;
  };

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const fA = place.formatted_address;
      if (
        !place?.address_components?.some((item) => {
          let c = item;
          if (item?.types?.includes("postal_code")) {
            const z = c?.long_name || c?.short_name;
            setFormattedAddress({ addr: fA, hasZip: true, zipCode: z });
            return true;
          } else {
            return false;
          }
        })
      ) {
        setFormattedAddress({ addr: fA, hasZip: false, zipCode: "" });
      }

      console.log(`Formatted Address: ${fA}`);
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const getRelevantSpots = async (e) => {
    e.preventDefault();
    if (!formattedAddress?.addr) {
      searchRef.current.focus();
      return;
    }
    dispatch(searchResultsLoading());
    await axios
      .get(
        `/get-spaces/address/a?zipCode=${formattedAddress.zipCode}&addr=${formattedAddress.addr}`
      )
      .then((res) => {
        if (res.data?.length > 0) dispatch(searchResultsSuccess(res.data));
        if (res.data?.length === 0)
          dispatch(searchResultsError("no results found"));
        navigate("/search-result");
      })
      .catch((e) => {
        console.error(e);
        dispatch(searchResultsError(e));
      });
  };

  return (
    <div>
      <form onSubmit={getRelevantSpots}>
        <div className="landing-searchbar">
          <h2>Search for a parking space</h2>
          <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
            <input
              className="g-search"
              type="text"
              placeholder={placeHolder}
              ref={searchRef}
            />
          </Autocomplete>
        </div>

        <div className="start-container">
          <div className="start-label">Choose Start Date and Time</div>
          <div className="start-date">
            <DatePickerComponent
              selectedDate={checkInDate}
              handleDateChange={(date) => setCheckInDate(date)}
            />
          </div>
          <div className="start-time">
            <TimePickerComponent
              selectedTime={checkInTime}
              handleTimeChange={(e) => setCheckInTime(e.target.value)}
              options={generateTimeOptionsStart()}
            />
          </div>
        </div>
        <div className="end-container">
          <div className="end-label">Choose End Date and Time</div>

          <div className="end-date">
            <DatePickerComponent
              selectedDate={checkOutDate}
              handleDateChange={(date) => setCheckOutDate(date)}
            />
          </div>
          <div className="end-time">
            <TimePickerComponent
              selectedTime={checkOutTime}
              handleTimeChange={(e) => setCheckOutTime(e.target.value)}
              options={generateTimeOptionsEnd()}
            />
          </div>
        </div>
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
