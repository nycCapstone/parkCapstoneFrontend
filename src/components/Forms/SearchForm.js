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
  const [checkOutDate, setCheckOutDate] = useState(checkInDate);
  const [timeQuery, setTimeQuery] = useState(null);
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

  return (
    <div className="searchform">
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

        <div className="start-container">
          <div className="start-date">
            <label className="start-label">Enter After: </label>
            <DatePicker
              selectsStart
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              shouldCloseOnSelect={false}
              timeIntervals={30}
            />
            <p className="select-time">
              {checkInDate.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>

          <div className="start-time"></div>
        </div>
        <div className="end-container">
          <div className="end-date">
            <label className="end-label">Leave Before:</label>
            <DatePicker
              selectsEnd
              selected={checkOutDate}
              minDate={checkInDate}
              onChange={(date) => setCheckOutDate(date)}
              onInputClick={() => setTimeQuery(true)}
              shouldCloseOnSelect={false}
              timeIntervals={30}
              showTimeSelect
            />

            <p className="select-time">
              {" "}
              {err
                ? "Book 3 hour difference"
                : checkOutDate.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
            </p>
          </div>
          <div className="end-time"></div>
          <div className="end-time"></div>
        </div>
        <div style={{ float: "right", marginLeft: "2rem" }}>
          <FaArrowAltCircleDown
            onClick={() => {
              setCheckInDate(new Date());
              setCheckOutDate(checkInDate);
            }}
          />
        </div>
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
