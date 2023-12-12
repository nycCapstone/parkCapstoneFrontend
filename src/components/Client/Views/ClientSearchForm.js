import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { searchLandingBookings } from "../../../redux/landing/landingSearchSlice";
import { searchBookings } from "../../../redux/client/clientSearchSlice";
import DatePicker from "react-datepicker";
import { checkDates } from "../../../constants/helper/helper";
import { FcCalendar } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../../Forms/Styles/SearchForm.css";

const ClientSearchForm = () => {
  const [placesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const { data: userData, isLoading, error } = useGetUserInfoQuery();
  const [searchResult, setSearchResult] = useState("");
  const [locationdata, setGeoLocation] = useState({});
  const location = useSelector((state) => state.searchResults.location)
  const [checkInDate, setCheckInDate] = useState(location.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(location.checkOut);
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const fA = place.formatted_address;
      if (place.geometry && place.geometry.location && fA?.length) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setGeoLocation({ lat, lng, fA });
      } else {
        console.error("No geometry information found for the selected place.");
      }
      console.log(`Formatted Address: ${fA}`);
    }
  }

  const searchForAvail = (e) => {
    e.preventDefault();
    const selectedDateTime = new Date(checkInDate);
    if (!locationdata?.lat) {
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
      searchLandingBookings([
        locationdata.lat,
        locationdata?.lng || "",
        checkInDate.toISOString(),
        checkOutDate.toISOString(),
      ]),
    );
    dispatch(searchBookings(locationdata.fA));
    navigate("/client/search-result");
  };
  return (
    <div className="client-page-search">
      <div className="client-s-header">
        <h3>Reserve your spot</h3>
      </div>
      {err && (
        <p className="min-parking-errormsg">3 hour time blocks. Try Again!</p>
      )}
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
            className="cl-view-searchbar"
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
                showTimeSelect
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                minDate={new Date()}
                shouldCloseOnSelect={false}
                timeIntervals={30}
                filterTime={filterPassedTime}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="cl_time_icon">
            {<DatePicker
              className="time-field"
              selected={checkInDate}
              onChange={(date) => { 
                setCheckInDate(date)}}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={filterPassedTime}
            />}
              <FcAlarmClock size={25} className="icon-style" />
            </div>
          </div>

          <div className="client-search-checkout">
            <p className="table-header">Check-Out</p>

            <div className="date_icon">
             <DatePicker
                className="date-field"
                selectsEnd
                showTimeSelect
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={(date) => setCheckOutDate(date)}
                shouldCloseOnSelect={false}
                timeIntervals={30}
                filterTime={filterPassedTimeCheckOut}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="cl_time_icon">
              {<DatePicker
              className="time-field"
              selected={checkOutDate}
              onChange={(date) => { 
                setCheckOutDate(date)}}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              filterTime={filterPassedTimeCheckOut}
            />}
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
