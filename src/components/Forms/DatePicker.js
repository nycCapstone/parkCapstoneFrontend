import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      placeholderText={new Date().toLocaleDateString()}
    />
  );
};

export default DatePickerComponent;
