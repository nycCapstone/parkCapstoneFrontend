import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import {
  searchResultsSuccess,
  searchResultsLoading,
  searchResultsError,
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

const SearchForm = () => {
  const [placesLibrary] = useState(["places"]);
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

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [err, setErr] = useState(false);
  const searchRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (err) {
      setErr(false);
    }
  }, [checkOutDate]);

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
    if (checkOutDate) {
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
          formattedAddress?.zipCode || "",
          formattedAddress?.addr || "",
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
        `/get-spaces/address/a?zipCode=${formattedAddress.zipCode}&addr=${formattedAddress.addr}`
      )
      .then((res) => {
        let searchStore = {
          results: res.data,
          params: [
            checkInDate && checkInDate.toISOString(),
            checkOutDate && checkOutDate.toISOString(),
          ],
        };
        if (res.data?.length > 0) dispatch(searchResultsSuccess(searchStore));
        if (res.data?.length === 0) {
          dispatch(searchResultsError("no results found"));
        }
        navigate("/search-result");
      })
      .catch((e) => {
        console.error(e);
        dispatch(searchResultsError(e));
      });
  };
  console.log(checkInDate);
  return (
    <div>
      <form onSubmit={getRelevantSpots}>
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
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              shouldCloseOnSelect={false}
              timeIntervals={15}
            />
            <p className="select-time" dateFormat="" showTimeSelect>
              {checkInDate.toLocaleTimeString()}
            </p>
          </div>
          <div className="end-container">
            <label className="end-label">Check-Out:</label>
            <DatePicker
              className="input-date"
              selectsEnd
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              shouldCloseOnSelect={false}
              timeIntervals={15}
              showTimeSelect
            />

            <p className="select-time"> {checkOutDate.toLocaleTimeString()}</p>
          </div>
        </div>

        <button className="submit-button" type="submit">
          Search
        </button>
        <div>
          <FaArrowAltCircleDown
            onClick={() => {
              setCheckInDate(new Date());
              setCheckOutDate(new Date());
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
