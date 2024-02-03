import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import UserAction from "../../redux/userActions/UserAction";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import {
  Michael_profile,
  Isabelle_profile,
  Isabelle_square,
  Isabelle_rectang,
  Michael_square,
  Michael_rectang,
} from "../../assets";
import { RatingStars } from "../Location/RatingStars";
import Loading from "../../assets/Spinners/Loading";
import "./AdminPage.css";

const AdminPage = () => {
  const { data: userInfo, isSuccess, isLoading, error } = useGetUserInfoQuery();

  if (isLoading) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Server Fetching Error</div>;
  }

  const userAddress = userInfo?.address ? userInfo.address.split(",") : [];
  const userStateAndZip =
    userAddress.length > 2 ? userAddress[2].split(" ") : [];

  if (isSuccess)
    return (
      <div className="admin-page">
        <div className="user-profile-container">
          <div className="user-profile-box-div">
            <section className="user-profile-box">
              <div className="roles">
                <div className="role-list">
                  <div className="role-item">
                    {userInfo.roles.ClientOnly && <h4>Driver Account</h4>}
                    {!userInfo.roles.ClientOnly && <h4>Spot Owner Account</h4>}
                  </div>
                </div>
              </div>
              <div className="user-profile-picture-box">
                <div className="profile-picture-div">
                  <img
                    className="profile-picture"
                    src={
                      userInfo.first_name === "Isabelle"
                        ? Isabelle_square
                        : userInfo.first_name === "Michael"
                          ? Michael_square
                          : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                    alt="usrpageprofilepic"
                  />
                </div>
                <div className="profile-title">
                  <p>{userInfo.first_name}</p>
                </div>
              </div>
              <div className="user-insights">
                <div className="insight">
                  <span className="rating-number">
                    4.97 <IoIosStar className="star" />
                  </span>
                  <span className="rating-title">Rating</span>
                </div>
              </div>
              <div className="user-navigation">
                <div className="link">
                  <Link to="/client/" className="profile-nav-link">
                    <button className="my-activity-button">My Activity</button>
                  </Link>
                </div>
                {userInfo?.roles?.Renter && (
                  <div className="link">
                    <Link to="/renter" className="profile-nav-link">
                      <button className="parking-spot-owner-button">
                        Spot Owner
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        <div className="user-info-container">
          <div className="user-profile-overview">
            <div className="user-about">
              <h2>
                About{" "}
                {userInfo.first_name[0].toUpperCase() +
                  userInfo.first_name.slice(1).toLowerCase()}
              </h2>
              <p>
                I am often frustrated when having to deal with street parking
                and don't like having to pay expensive fees for parking lots.{" "}
              </p>
            </div>
            <div className="user-info-box">
              <h2>Your Info</h2>
              <div className="user-info">
                <div className="user-data name">
                  <p className="user-data-title">NAME </p>
                  <p>
                    {userInfo.first_name} {userInfo.last_name}
                  </p>
                </div>
                <div className="user-data address">
                  <p className="user-data-title">ADDRESS</p>
                  <p>{userAddress[0]}</p>
                </div>
                <div className="user-data city">
                  <p className="user-data-title">CITY</p>
                  <p>{userAddress[1]}</p>
                </div>
                <div className="user-data state">
                  <p className="user-data-title">STATE</p>
                  <p>{userStateAndZip[1]}</p>
                </div>
                <div className="user-data zipcode">
                  <p className="user-data-title">ZIP CODE</p>
                  <p>{userStateAndZip[2]} </p>
                </div>

                <div className="user-data email">
                  <p className="user-data-title">EMAIL</p>
                  <p>{userInfo.email}</p>
                </div>
                <UserAction />
              </div>
            </div>
            <div className="user-reviews">
              <h2>{userInfo.first_name}'s reviews</h2>

              <div className="user-review-sample">
                <div className="review">
                  <span className="review-text">
                    <div className="reviewer-info">
                      <div className="reviewer-pfp-box">
                        <img
                          className="reviewer-pfp"
                          src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                          alt="usrdepositphoto"
                        />
                        <div className="name-date">
                          <p className="reviewer-name">user21</p>
                          <p className="review-date">December 2023</p>
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="stars">
                          <RatingStars rating="5" />
                        </div>
                        <div className="review-1star">
                          <IoIosStar className="star" />{" "}
                          <p className="star">5</p>
                        </div>
                      </div>
                    </div>
                    <p>
                      The parking space was easily accessible and the host was
                      awesome! Thank you! A++
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="user-listing">
              <h2>{userInfo.first_name}'s listings</h2>
              <div className="listing-box">
                <span className="listing">
                  <img
                    className="listing-photo"
                    src="https://media.npr.org/assets/img/2013/06/14/parking_wide-c0a616c65dc3a049ff06c4e95844202491483669.jpg"
                    alt="usrlistingimg"
                  />
                </span>
                <span className="listing">
                  <img
                    className="listing-photo"
                    src="https://media.npr.org/assets/img/2013/06/14/parking_wide-c0a616c65dc3a049ff06c4e95844202491483669.jpg"
                    alt="usercomponentimg"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminPage;
