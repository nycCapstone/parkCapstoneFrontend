import React from "react";

const TimePickerComponent = ({ selectedTime, handleTimeChange, options }) => {
  return (
    <select value={selectedTime} onChange={handleTimeChange}>
      {options.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimePickerComponent;
