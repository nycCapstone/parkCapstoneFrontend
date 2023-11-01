import React from "react";
import { smilingadult } from "../../assets/smilingadult.jpeg";

import "./Main.css";

function MainImage() {
  return (
    <div className="main-image-container">
      <img
        className="main-image opacity-25 img-fluid"
        src={smilingadult}
        alt="smilingadult"
        style={{ maxHeight: "80vh" }}
      />
      <div className="overlay">
        <div className="fw-bold text-warning">
          <span style={{ fontSize: "1.3rem" }}>Placeholder 1</span>{" "}
          <span style={{ fontsize: "1rem" }}>Placeholder 2</span>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
