import { searchLandingMutate, searchLandingBookings } from "../../../redux/landing/landingSearchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { checkDates } from "../../../constants/helper/helper";
import { FaArrowAltCircleDown } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../../Forms/Styles/SearchForm.css";

const ChangeTime = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(null);
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
    <div className="checkout-reschedule">
      <form className="checkout-reschedule-form" onSubmit={getNewTimeSpot}>
        <div className="start-container">
          <div className="start-date">
            <label>Enter After: </label>
            <DatePicker
              selectsStart
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              shouldCloseOnSelect={false}
              timeIntervals={15}
              value={`${
                checkInDate
                  ? checkInDate.toLocaleDateString()
                  : new Date().toLocaleDateString()
              } ${
                checkInDate
                  ? checkInDate.toLocaleTimeString()
                  : new Date().toLocaleTimeString()
              }`}
              showTimeSelect
              style={{ innerWidth: "4rem" }}
            />
          </div>
          <div style={{ float: "right", marginLeft: "2rem" }}>
            <FaArrowAltCircleDown
              onClick={() => {
                setCheckInDate(new Date());
                setCheckOutDate(null);
              }}
            />
          </div>
          <div className="start-time"></div>
        </div>
        <div className="end-container">
          <div className="end-date">
            <label>Leave Before:</label>
            <DatePicker
              selectsEnd
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={checkInDate}
              shouldCloseOnSelect={false}
              value={
                err
                  ? "Book 3 hour difference"
                  : `${
                      checkOutDate
                        ? checkOutDate.toLocaleDateString()
                        : new Date().toLocaleDateString()
                    } ${
                      checkOutDate
                        ? checkOutDate.toLocaleTimeString()
                        : new Date().toLocaleTimeString()
                    }`
              }
              style={{ innerWidth: "4rem" }}
              timeIntervals={15}
              showTimeSelect
            />
          </div>
          <div className="end-time"></div>
        </div>
        <button style={{ color: "gray" }} type="submit">
          Submit new Time
        </button>
      </form>
    </div>
  );
};

export default ChangeTime;