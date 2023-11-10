import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { searchBookings } from "../../redux/client/clientSearchSlice";
import DatePicker from "react-datepicker";
import { checkDates } from "../../constants/helper/helper";
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

  return (
    <div>
      <form onSubmit={searchForAvail}>
        <h2>Search for a Space</h2>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder={
              isLoading || error
                ? "Search for a spot (eg. NYC NY 1001)"
                : userData.address
            }
            className="g-search"
            ref={searchRef}
          />
        </Autocomplete>
        <div style={{ cursor: "pointer" }}>
          <label>Enter After: </label>
          <DatePicker
            selectsStart
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            startDate={checkInDate}
            minDate={new Date()}
            shouldCloseOnSelect={false}
            timeIntervals={15}
            value={`${checkInDate.toLocaleDateString()} ${checkInDate.toLocaleTimeString()}`}
            showTimeSelect
            style={{ innerWidth: "4rem" }}
          />
        </div>
        <div style={{ cursor: "pointer" }}>
          <label>Leave Before:</label>
          <DatePicker
            selectsEnd
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            endDate={checkOutDate}
            minDate={checkInDate}
            shouldCloseOnSelect={false}
            value={
              err
                ? "Book 3 hour difference"
                : `${checkOutDate.toLocaleDateString()} ${checkOutDate.toLocaleTimeString()}`
            }
            style={{ innerWidth: "4rem" }}
            timeIntervals={15}
            showTimeSelect
          />
        </div>
        <button className="button-cta" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default ClientSearchForm;
