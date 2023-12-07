import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import {
  searchResultsSuccess,
  searchResultsLoading,
  searchResultsError,
  setSearchResults,
} from "../../redux/search/searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { checkDates } from "../../constants/helper/helper";
import {
  searchLandingBookings,
  resetLandingCache,
} from "../../redux/landing/landingSearchSlice";
import axios from "../../api/axios";
import { FaArrowAltCircleDown } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./Styles/SearchForm.css";
import { current } from "@reduxjs/toolkit";

const SearchForm = () => {
  const [placesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const [searchResult, setSearchResult] = useState("");
  const [locationdata, setGeoLocation] = useState({});
  const placeHolder = useSelector((state) => {
    if (state.searchResults.data?.results?.length) {
      return state.searchResults.data.results[0].prop_address;
    } else {
      return "Search for a spot (eg. NYC NY 1001)";
    }
  });
  const [checkInDate, setCheckInDate] = useState(roundToNearest30());
  const [checkOutDate, setCheckOutDate] = useState(checkOutLoad(checkInDate));
  const [timeQuery, setTimeQuery] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [err, setErr] = useState(false);
  const searchRef = useRef();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function checkOutLoad(date = new Date()){
    let tempCheck = new Date(date)
    tempCheck.setHours(date.getHours()+3)
    return tempCheck
  }

  function roundToNearest30(date = new Date()) {
    const minutes = 30;
    const ms = 1000 * 60 * minutes;
  
    //replace Math.round with Math.ceil to always round UP
    return new Date(Math.round(date.getTime() / ms) * ms);
  }

  function handleCheckIn (date) {
    setCheckInDate(date)
    let tempCheck = new Date(date)
    tempCheck.setHours(date.getHours()+3)
    if (tempCheck.getTime() > checkOutDate.getTime()){
      setCheckOutDate(tempCheck)
    }
  }
  function handleCheckOut(date) {
    setCheckOutDate(date)
  }
  function filterPassedTime(time) {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  }
  function filterPassedTimeCheckOut(time) {
    const currentDate = checkInDate;
    const selectedDate = new Date(time);
    let tempCheck = new Date(currentDate)
    tempCheck.setHours(tempCheck.getHours()+3)

    if (tempCheck.getHours()==selectedDate.getHours() && selectedDate.getDate() === tempCheck.getDate()){
      return (!(selectedDate.getMinutes() < currentDate.getMinutes()))
    }else if (selectedDate.getDate() === currentDate.getDate()+1 && (((currentDate.getHours()+3)%24 >= 0) && ((currentDate.getHours()+3)%24 <= 3))){
      return (!(selectedDate.getHours() < tempCheck.getHours())) 
    } else 
    return ((selectedDate.getHours()>= currentDate.getHours()+3) || !(currentDate.getDate() === selectedDate.getDate()));
  }

  useEffect(() => {
    if (err) {
      setErr(false);
    }
  }, [checkOutDate, checkInDate]);

  useEffect(() => {
    if (locationdata?.lng || timeQuery !== null) {
      btnRef.current.focus();
    }
  }, [checkOutDate, locationdata]);

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
      if (
        !place?.address_components?.some((item) => {
          let c = item;
          if (item?.types?.includes("postal_code")) {
            const z = c?.long_name || c?.short_name;
            setFormattedAddress({ addr: fA, zipCode: z });
            return true;
          } else {
            return false;
          }
        })
      ) {
        setFormattedAddress({ addr: fA, zipCode: "" });
      }
      console.log(`Formatted Address: ${fA}`);
    }
  }

  const getRelevantSpots = async (e) => {
    e.preventDefault();
    if (!locationdata?.lat || !locationdata?.lng) {
      searchRef.current.focus();
      return;
    }
    if (checkOutDate && timeQuery) {
      const selectedDateTime = new Date(checkInDate);
      if (
        new Date(checkOutDate) <= selectedDateTime ||
        !checkDates(checkInDate, checkOutDate)
      ) {
        setErr(true);
        return;
      }
      dispatch(
        searchLandingBookings([
          locationdata.lat,
          locationdata.lng,
          checkInDate.toISOString(),
          checkOutDate.toISOString(),
        ])
      );
    }
    if (!checkOutDate) {
      dispatch(resetLandingCache());
    }
    dispatch(searchResultsLoading());
    await axios
      .get(
        `/get-spaces/geolocation?lat=${locationdata.lat}&lng=${locationdata.lng}`
      )
      .then((res) => {
        let searchStore = {
          results: res.data,
          location: {
            addr: formattedAddress.addr,
            zipCode: formattedAddress.zipCode,
            lat: locationdata.lat,
            lng: locationdata.lng,
          },
        };
        if (res.data?.length > 0) {
          dispatch(setSearchResults(searchStore));
          dispatch(searchResultsSuccess(searchStore));
        }
        if (res.data?.length === 0) {
          dispatch(searchResultsError("no results found"));
        }
        navigate("/search-result", { state: searchStore.location });
      })
      .catch((e) => {
        console.error(e);
        dispatch(searchResultsError(e));
      });
  };

  return (
    <form onSubmit={getRelevantSpots} className="search-form">
      <div className="landing-searchbar">
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            className="g-search"
            type="text"
            placeholder={placeHolder}
            ref={searchRef}
          />
        </Autocomplete>
      </div>
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
            {<DatePicker
              className="select-time"
              selected={checkInDate}
              onChange={(date) => { 
                handleCheckIn(date)}}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={filterPassedTime}
            />}
        </div>
        <div className="end-container">
          <label className="end-label">Check-Out:</label>
          <DatePicker
            className="input-date"
            selectsEnd
            selected={checkOutDate}
            minDate={checkInDate}
            onChange={(date) => handleCheckOut(date)}
            onInputClick={() =>{ setTimeQuery(true);}}
            shouldCloseOnSelect={false}
            timeIntervals={30}
            showTimeSelect
            filterTime={filterPassedTimeCheckOut}
          />


            {" "}
            {err
              ? <p className="select-time">
                Book 3 hour Difference
              </p>
          
              :     <DatePicker
              className="select-time"
              selected={checkOutDate}
              onChange={(date) => handleCheckOut(date)}
              onInputClick={() =>{ setTimeQuery(true);}}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={filterPassedTimeCheckOut}
            />}
        </div>
        <div className="end-time"></div>
        <div className="end-time"></div>
      </div>

      <button className="submit-button" type="submit" ref={btnRef}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
