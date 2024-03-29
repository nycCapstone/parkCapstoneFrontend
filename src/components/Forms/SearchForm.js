import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { setSearchResults } from "../../redux/search/searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { searchLandingBookings } from "../../redux/landing/landingSearchSlice";
import { resetBookings } from "../../redux/client/clientSearchSlice";
import {
  checkOutLoad,
  roundToNearest30,
  filterPassedTime,
  filterPassedTimeCheckOut,
} from "../../constants/helper/time";
import "react-datepicker/dist/react-datepicker.css";
import "./Styles/SearchForm.css";

const SearchForm = () => {
  const [placesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const clientLocation = useSelector((state) => state.user_location);
  const [searchResult, setSearchResult] = useState("");
  const [locationdata, setGeoLocation] = useState(
    clientLocation?.latitude && clientLocation?.longitude
      ? {
          lat: clientLocation.latitude,
          lng: clientLocation.longitude,
        }
      : {},
  );
  const placeHolder = useSelector((state) => {
    if (state.searchResults?.location?.addr?.length) {
      return state.searchResults?.location?.addr;
    } else {
      return "Search for a spot (eg. NYC NY 10001)";
    }
  });
  const [checkInDate, setCheckInDate] = useState(roundToNearest30());
  const [checkOutDate, setCheckOutDate] = useState(checkOutLoad(checkInDate));
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [err, setErr] = useState(false);
  const searchRef = useRef();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCheckIn(date) {
    setCheckInDate(date);
    let tempCheck = new Date(date);
    tempCheck.setHours(date.getHours() + 3);
    if (tempCheck.getTime() > checkOutDate.getTime()) {
      setCheckOutDate(tempCheck);
    }
  }
  function handleCheckOut(date) {
    setCheckOutDate(date);
  }

  useEffect(() => {
    if (err) {
      setErr(false);
    }
  }, [checkOutDate, checkInDate]);

  useEffect(() => {
    if (locationdata?.lng && btnRef?.current) {
      btnRef.current.focus();
    }
  }, [locationdata]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const fA = place.formatted_address;
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setGeoLocation({ lat, lng });
      } else {
        console.error("No geometry information found for the selected place.");
      }
      setFormattedAddress(fA);
    }
  }

  const getRelevantSpots = async (e) => {
    e.preventDefault();
    if (!locationdata?.lat || !locationdata?.lng) {
      searchRef.current.focus();
      return;
    }
    if (checkOutDate) {
      const selectedDateTime = new Date(checkInDate);
      if (new Date(checkOutDate) <= selectedDateTime) {
        setErr(true);
        return;
      }
      dispatch(resetBookings());
      dispatch(
        searchLandingBookings([
          locationdata.lat,
          locationdata.lng,
          checkInDate.toISOString(),
          checkOutDate.toISOString(),
        ]),
      );

      let searchStore = {
        location: {
          addr:
            formattedAddress ||
            (clientLocation?.city ? clientLocation.city : ""),
          lat: locationdata.lat,
          lng: locationdata.lng,
          options: !formattedAddress,
        },
      };

      dispatch(setSearchResults(searchStore));

      navigate("/search-result");
    }
  };

  return (
    <form onSubmit={getRelevantSpots} className="search-form">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <input
          className="g-search"
          type="text"
          placeholder={placeHolder}
          ref={searchRef}
        />
      </Autocomplete>
      <div className="search-landing-container">
        <div className="start-container">
          <label className="start-label">Check-In:</label>
          <DatePicker
            className="input-date"
            showTimeSelect
            selectsStart
            selected={checkInDate}
            onChange={(date) => handleCheckIn(date)}
            minDate={new Date()}
            shouldCloseOnSelect={false}
            timeIntervals={30}
            filterTime={filterPassedTime}
          />
          {
            <DatePicker
              className="select-time"
              selected={checkInDate}
              onChange={(date) => {
                handleCheckIn(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={filterPassedTime}
            />
          }
        </div>
        <div className="end-container">
          <label className="end-label">Check-Out:</label>
          <DatePicker
            className="input-date"
            selectsEnd
            selected={checkOutDate}
            minDate={checkInDate}
            onChange={(date) => handleCheckOut(date)}
            shouldCloseOnSelect={false}
            timeIntervals={30}
            showTimeSelect
            filterTime={(date) => filterPassedTimeCheckOut(date, checkInDate)}
          />{" "}
          {err ? (
            <p className="select-time">Book 3 hour Difference</p>
          ) : (
            <DatePicker
              className="select-time"
              selected={checkOutDate}
              onChange={(date) => handleCheckOut(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={(date) => filterPassedTimeCheckOut(date, checkInDate)}
            />
          )}
        </div>
      </div>

      <button className="submit-button" type="submit" ref={btnRef}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
