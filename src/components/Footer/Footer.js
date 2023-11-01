import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./Footer.css";
function Footer() {
  return (
    <footer className="container grid grid-four-columns">
      <div className="app-slogan">
        <h4>CarValet</h4>
        <p className="slogan">"Your Space Their Convenience"</p>
      </div>

      <div className="socials">
        <h5>Follow Us</h5>
        <div className="social-icons">
          <div>
            <FaInstagram className="icon" />
          </div>
          <div>
            <FaFacebookSquare className="icon" />
          </div>
          <div>
            <FaYoutube className="icon" />
          </div>
        </div>
      </div>

      <div className="contacts">
        <h5>Contacts</h5>
        <p>+1-529-529-5299</p>
        <p>hrsupport@carvalet.com</p>
      </div>

      <div className="footer-details">
        <h5>©{new Date().getFullYear()} CarValet. All Rights Reserved</h5>
        <p>Privacy Policy</p>
        <p>Terms and conditions</p>
      </div>
    </footer>
  );
}

export default Footer;
