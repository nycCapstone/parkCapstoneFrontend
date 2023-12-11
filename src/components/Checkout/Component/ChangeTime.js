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
  const location = useSelector((state) => state.searchResults.location)
  const [checkInDate, setCheckInDate] = useState(location.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(location.checkOut);
  const [err, setErr] = useState(false);
  const query = useSelector(state => state.landing);
  const dispatch = useDispatch();

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
                filterTime={filterPassedTime}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
          
            <div className="time_icon">
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
                filterTime={filterPassedTimeCheckOut}
              />
              <FcCalendar size={25} className="icon-style" />
            </div>
            <div className="time_icon">
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
