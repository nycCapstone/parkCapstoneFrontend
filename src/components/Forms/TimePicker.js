import React from "react";
import "./Styles/SearchForm.css";
const TimePickerComponent = ({ selectedTime, handleTimeChange, options }) => {
  return (
    <select
      className="select-time"
      value={selectedTime}
      onChange={handleTimeChange}
    >
      {options.map((time, index) => (
        <option className=".timePicker" key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimePickerComponent;
