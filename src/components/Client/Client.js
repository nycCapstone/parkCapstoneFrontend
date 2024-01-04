import React from "react";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import { Link } from "react-router-dom";
import ClientBookings from "./ClientBookings";
import { FaPlus } from "react-icons/fa6";
import "./Styles/Client.css";
import "./Styles/Client&ClientSearch.css";

function Client() {
  const { data: userData, isLoading } = useGetUserInfoQuery();
  const roles = useSelector((state) => state.roles);
  return (
    <div className="client-page-booking">
      <div className="">
        {isLoading ? (
          <div className="">
            <Loading />
          </div>
        ) : userData?.all_is_auth || (roles?.Renter && roles.Client.bckgr) ? (
          <div>
            <div className="your-booking">
              <p className="your-booking-header">Your Bookings</p>
              <div className="your-booking-newLinks">
                <ul>
                  <li className="your-booking-li">
                    <FaPlus className="your-booking-icon" />{" "}
                    <Link to="/client/search" className="new-booking-link">
                      New Booking
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <p className="your-booking-p">
              Welcome to your Parking History. View and manage your current and
              past reservations effortlessly. Plan ahead by exploring upcoming
              availability and securing your preferred spots with ease.
            </p>
          </div>
        ) : (
          <div className="">
            Bookings made easy after you confirm your details.
          </div>
        )}
      </div>
      <ClientBookings />
    </div>
  );
}

export default Client;
