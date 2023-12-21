import React from "react";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import { Link } from "react-router-dom";
import ClientBookingTest from "./ClientBookingTest";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";
import "./Styles/ClientTest.css";

function ClientTest() {
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
                    <Link to="/" className="new-booking-link">
                      New Booking
                    </Link>
                  </li>
                  <li className="your-booking-li">
                    <MdOutlineNotificationsActive className="your-booking-icon" />{" "}
                    <Link to="/client/transactions" className="myActivityLink">
                      My Activity
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
      <ClientBookingTest />
    </div>
  );
}

export default ClientTest;
