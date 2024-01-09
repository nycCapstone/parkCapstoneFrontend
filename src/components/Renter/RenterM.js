import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { Link } from "react-router-dom";
import PropertyForm from "../Forms/PropertyForm";
import PropertySpace from "./Components/PropertySpace";
import { useState, useEffect } from "react";
import Loading from "../../assets/Spinners/Loading";
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
        <main>
          <section>
            {userData?.all_is_auth && (
              <>
                <header>
                  <div className="cl-h-svgleft">
                    <Link to="/renter">
                      <FaChevronCircleLeft />
                    </Link>
                  </div>
                  <h3 className="renterM-header">
                    This is where you can make new available spots.
                  </h3>
                </header>
                <PropertyForm />

                <div className="renter-prop">
                  <h3 className="renter-prop-header">
                    Your current properties
                  </h3>
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
                            <p>ID: {item.property_id}</p>
                            <p>Address: {item.prop_address}</p>
                            <p>Zip Code: {item.zip}</p>
                            <p>
                              Location Verified?:{" "}
                              {item.location_verified ? "Yes" : "No"}
                            </p>
                            {!item.location_verified && (
                              <Link to="/admin/confirm-details">
                                Confirm your Property Location
                              </Link>
                            )}
                            <p>Number of Spaces: {item.number_spaces}</p>
                            <div className="lot-earn-info">
                              <div className="lot-list">
                                <div className="lot-earn-item">
                                  <p>Billing Type: {item.billing_type}</p>
                                </div>
                              </div>
                            </div>
                            {item.picture && (
                              <img src={item.picture} alt="placeholder" />
                            )}
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
                                : "Update/Submit"}
                            </button>
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
          </section>
        </main>
      </div>
    );
  }
  if (error) {
    return <div>Api Error</div>;
  }
};

export default RenterM;
