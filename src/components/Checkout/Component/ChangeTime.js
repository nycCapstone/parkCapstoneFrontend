import { searchLandingBookings } from "../../../redux/landing/landingSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  checkOutLoad,
  roundToNearest30,
  filterPassedTime,
  filterPassedTimeCheckOut,
} from "../../../constants/helper/time";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FaArrowAltCircleDown } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/ChangeTime.css";
import "../../Forms/Styles/SearchForm.css";

const ChangeTime = () => {
  const [checkInDate, setCheckInDate] = useState(roundToNearest30());
  const [checkOutDate, setCheckOutDate] = useState(checkOutLoad(checkInDate));
  const [err, setErr] = useState(false);
  const query = useSelector((state) => state.landing);
  const dispatch = useDispatch();

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
  }, [checkOutDate]);

  const getNewTimeSpot = async (e) => {
    e.preventDefault();

    if (checkOutDate) {
      const selectedDateTime = new Date(checkInDate);
      if (new Date(checkOutDate) <= selectedDateTime) {
        setErr(true);
        return;
      }

      let params = [
        checkInDate && checkInDate.toISOString(),
        checkOutDate && checkOutDate.toISOString(),
      ];
      dispatch(searchLandingBookings([query[0][0], query[0][1], ...params]));
      alert("The changes will be visible after you close this!");
    }
  };

  return (
    <div className="chtime-page-search">
      {err && (
        <p className="min-parking-errormsg">3 hour time blocks. Try Again!</p>
      )}
      <form onSubmit={getNewTimeSpot}>
        <div className="chtime-search-space">
          <div className="chtime-search-checkIn">
            <p className="table-header">Check-In</p>
            <div className="date_icon">
              <DatePicker
                className="date-field"
                selectsStart
                showTimeSelect
                selected={checkInDate}
                onChange={(date) => handleCheckIn(date)}
                minDate={new Date()}
                shouldCloseOnSelect={false}
                timeIntervals={30}
                filterTime={filterPassedTime}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>

            <div className="time_icon">
              {
                <DatePicker
                  className="time-field"
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
              <FcAlarmClock size={25} className="icon-style" />
            </div>
          </div>

          <div className="chtime-search-checkout">
            <p className="table-header">Check-Out</p>

            <div className="date_icon">
              <DatePicker
                className="date-field"
                selectsEnd
                showTimeSelect
                selected={checkOutDate}
                minDate={checkInDate}
                onChange={(date) => handleCheckOut(date)}
                shouldCloseOnSelect={false}
                timeIntervals={30}
                filterTime={(date) =>
                  filterPassedTimeCheckOut(date, checkInDate)
                }
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="time_icon">
              {
                <DatePicker
                  className="time-field"
                  selected={checkOutDate}
                  onChange={(date) => {
                    handleCheckOut(date);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  filterTime={(date) =>
                    filterPassedTimeCheckOut(date, checkInDate)
                  }
                />
              }
              <FcAlarmClock size={25} className="icon-style" />
            </div>
          </div>
        </div>

        <button className="chtime-search-button" type="submit">
          Submit
        </button>
        <div className="change-time-reset">
          <FaArrowAltCircleDown
            onClick={() => {
              setCheckInDate(roundToNearest30());
              setCheckOutDate(checkOutLoad());
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeTime;
