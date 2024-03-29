import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { Link } from "react-router-dom";
import PropertyForm from "../Forms/PropertyForm";
import PropertySpace from "./Components/PropertySpace";
import { useState, useEffect } from "react";
import Loading from "../../assets/Spinners/Loading";
import { GiHouse } from "react-icons/gi";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./Styles/Renter.css";

//Manage Renter Spaces
const RenterM = () => {
  const { data: userData } = useGetUserInfoQuery();
  const {
    data: renterData,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetPropertiesQuery();

  const [spaceDetails, setSpaceDetails] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== renterData[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="r-manage-container">
        {userData?.all_is_auth && (
          <>
            <header className="renter-header">
              <div className="cl-h-svgleft">
                <Link to="/renter">
                  <FaChevronCircleLeft />
                </Link>
              </div>
              <h3 className="renter-title">Listings</h3>
              <p className="renter-description">
                Create new parking spots or update existing ones. Set
                availability, and stay in control. Your parking spaces, your
                rules.
              </p>
            </header>
            <div className="prop-parent-container">
              <section className="property-container">
                <PropertyForm />

                <div className="renter-prop">
                  <div className="renter-prop-container">
                    <GiHouse className="renter-prop-icon" />
                    <h3 className="renter-prop-header">Current Properties</h3>
                  </div>
                  <div className="renter-props">
                    {renterData?.length > 0 &&
                      renterData.map((item, i) => {
                        return (
                          <div
                            className="renter-prop-info"
                            key={i}
                            id={
                              renterData.length - 1 === i
                                ? "tries"
                                : "renter_info_propdata"
                            }
                          >
                            <div className="renter-prop-info1">
                              <div className="property-img-container">
                                {item.picture && (
                                  <img
                                    className="property-img"
                                    src={item.picture}
                                    alt="placeholder"
                                  />
                                )}
                                {!item.picture && (
                                  <img
                                    className="property-img"
                                    src={
                                      "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                    }
                                    alt="imgplaceholder"
                                  ></img>
                                )}
                              </div>
                              <div className="renter-prop-info-container">
                                <p className="renter-prop-info-address">
                                  {item.prop_address}
                                </p>
                                {!item.location_verified && (
                                  <Link to="/admin/confirm-details">
                                    Confirm your Property Location
                                  </Link>
                                )}
                                <p>Spaces: {item.number_spaces}</p>
                                <div className="lot-earn-info">
                                  <div className="lot-list">
                                    <div className="lot-earn-item">
                                      <p>Billing Rate: {item.billing_type}</p>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="renter-prop-button"
                                  type="click"
                                  onClick={() => {
                                    if (i !== spaceDetails) setSpaceDetails(i);
                                    else setSpaceDetails(null);
                                  }}
                                >
                                  {spaceDetails === i
                                    ? "Close Details"
                                    : "Update"}
                                </button>
                              </div>
                            </div>

                            <div
                              className={`renter-prop-info2 ${
                                spaceDetails === i
                                  ? "renter-prop-info2-active"
                                  : ""
                              }`}
                            >
                              {spaceDetails === i && (
                                <PropertySpace propertyId={item.property_id} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
        {!userData?.all_is_auth && (
          <div>
            <h3>Confirm your primary property address</h3>
            <div className="flexGrow">
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (error) {
    return <div>Api Error</div>;
  }
};

export default RenterM;
