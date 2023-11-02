import React from "react";
import { smilingadult } from "../../assets";

import "./MainImage.css";

function MainImage() {
  return (
    <div className="main-image-container">
      <img className="main-image" src={smilingadult} alt="smilingadult" />
      <div className="overlay">
        <div className="fw-bold">Your Space. Their convenience.</div>
        <form className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Enter location or zip code"
          />
          <div className="date-picker-start">
            <input
              className="check-in"
              type="text"
              placeholder="Choose check-in date"
            />
            <button className="date-button">Check-in Date</button>
          </div>
          <div className="date-picker-end">
            <input
              className="check-out"
              type="text"
              placeholder="Choose check-out date"
            />
            <button className="date-button">Check-out Date</button>
          </div>
          <button className="search-button">Search</button>
        </form>
      </div>
    </div>
  );
}

export default MainImage;

// import React from "react";
// import { smilingadult } from "../../assets";

// import "./MainImage.css";

// function MainImage() {
//   return (
//     <div className="main-image-container">
//       <img className="main-image" src={smilingadult} alt="smilingadult" />
//       <div className="overlay">
//         <div className="fw-bold">Your Space. Their convenience.</div>
//         <div className="search-bar">
//           <input
//             className="searchbar"
//             type="text"
//             placeholder="Enter location or zip code"
//           />
//           <div className="date-picker">
//             <button>Check-in Date</button>
//             <button>Check-out Date</button>
//           </div>
//           <button className="button">Search</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainImage;
