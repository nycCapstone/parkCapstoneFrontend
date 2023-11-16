import { searchLandingBookings } from "../../../redux/landing/landingSearchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { checkDates } from "../../../constants/helper/helper";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FaArrowAltCircleDown } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/ChangeTime.css"
import "../../Forms/Styles/SearchForm.css";

const ChangeTime = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(checkInDate);
  const [err, setErr] = useState(false);
  const query = useSelector(state => state.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (err) {
      setErr(false);
    }
  }, [checkOutDate]);

  const getNewTimeSpot = async (e) => {
    e.preventDefault();

    if (checkOutDate) {
      const selectedDateTime = new Date(checkInDate);
      if (
        new Date(checkOutDate) <= selectedDateTime ||
        !checkDates(checkInDate, checkOutDate)
      ) {
        setErr(true);
        return;
      }

      let params = [
        checkInDate && checkInDate.toISOString(),
        checkOutDate && checkOutDate.toISOString(),
      ];
      dispatch(searchLandingBookings([query[0][0], query[0][1], ...params]));
    }
  };

  return (
    <div className="chtime-page-search">
      {err && <p className="min-parking-errormsg">3 hour time blocks. Try Again!</p>}
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
                onChange={(date) => setCheckInDate(date)}
                minDate={new Date()}
                shouldCloseOnSelect={false}
                timeIntervals={30}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="time_icon">
              <p className="time-field"> {checkInDate.toLocaleTimeString()}</p>
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
                onChange={(date) => setCheckOutDate(date)}
                shouldCloseOnSelect={false}
                timeIntervals={30}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="time_icon">
              <p className="time-field"> {checkOutDate.toLocaleTimeString()}</p>
              <FcAlarmClock size={25} className="icon-style" />
            </div>
          </div>
        </div>

        <button className="chtime-search-button" type="submit">
          Submit new time
        </button>
        <div className="change-time-reset">
          <FaArrowAltCircleDown
            onClick={() => {
              setCheckInDate(new Date());
              setCheckOutDate(checkInDate);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeTime;
