import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { searchBookings } from "../../redux/client/clientSearchSlice";
import DatePicker from "react-datepicker";
import { checkDates } from "../../constants/helper/helper";
import { FcCalendar } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";
import "../Forms/Styles/SearchForm.css";

const ClientSearchForm = () => {
  const [placesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const { data: userData, isLoading, error } = useGetUserInfoQuery();
  const [searchResult, setSearchResult] = useState("");
  const [formattedAddress, setFormattedAddress] = useState({});
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();
  const searchRef = useRef();

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

  const searchForAvail = (e) => {
    e.preventDefault();
    const selectedDateTime = new Date(checkInDate);
    if (!formattedAddress?.addr) {
      searchRef.current.focus();
      return;
    }
    if (
      new Date(checkOutDate) <= selectedDateTime ||
      !checkDates(checkInDate, checkOutDate)
    ) {
      setErr(true);
      return;
    }
    dispatch(
      searchBookings([
        formattedAddress?.zipCode || "",
        formattedAddress?.addr || "",
        checkInDate.toISOString(),
        checkOutDate.toISOString(),
      ])
    );
  };
  console.log(checkInDate);
  return (
    <div className="client-page-search">
      <p className="client-header">Reserve your spot</p>
      {err && <p className="min-parking-errormsg">Min: 30 mins. Try Again!</p>}
      <form onSubmit={searchForAvail}>
        <p>Book Parking Near</p>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder={
              isLoading || error
                ? "Search for a spot (eg. NYC NY 1001)"
                : userData.address
            }
            className="cl-search"
            ref={searchRef}
          />
        </Autocomplete>
        <div className="client-search-space">
          <div className="client-search-checkIn">
            <p className="table-header">Check-In</p>
            <div className="date_icon">
              <DatePicker
                className="date-field"
                selectsStart
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                startDate={new Date()}
                minDate={new Date()}
                shouldCloseOnSelect={false}
                placeholderText={checkInDate}
                timeIntervals={15}
                showTimeSelect
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="time_icon">
              <p className="time-field"> {checkInDate.toLocaleTimeString()}</p>
              <FcAlarmClock size={25} className="icon-style" />
            </div>
          </div>

          <div className="client-search-checkout">
            <p className="table-header">Check-Out</p>

            <div className="date_icon">
              <DatePicker
                className="date-field"
                selectsEnd
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                endDate={checkOutDate}
                minDate={checkInDate}
                shouldCloseOnSelect={false}
                timeIntervals={15}
                showTimeSelect
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="time_icon">
              <p className="time-field"> {checkOutDate.toLocaleTimeString()}</p>
              <FcAlarmClock size={25} className="icon-style" />
            </div>
          </div>
        </div>

        <button className="client-search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default ClientSearchForm;
