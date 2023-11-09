import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Styles/SearchForm.css";
import { CgCalendarToday } from "react-icons/fa";
const DatePickerComponent = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      className="input-date"
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      placeholderText={new Date().toLocaleDateString()}
    />
  );
};

export default DatePickerComponent;
