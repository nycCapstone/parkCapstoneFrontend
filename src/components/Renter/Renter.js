import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { Link } from "react-router-dom";
import PropertyForm from "../Forms/PropertyForm";
import PropertySpace from "./PropertySpace";
import { useState, useEffect } from "react";
import Loading from "../../assets/Spinners/Loading";

const Renter = () => {
  const { data: userData } = useGetUserInfoQuery();
  const {
    data: renterData,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetPropertiesQuery();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== renterData[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <section className="renter-section">
        {userData?.all_is_auth && (
          <>
            <PropertyForm />
          </>
        )}
        <div className="renter-prop">
          <h3 className="">Your current properties</h3>
          {renterData?.length > 0 &&
            renterData.map((item, i) => {
              return (
                <div className="lot-info" key={i}>
                  <h3>{i + 1}</h3>
                  <p>ID: {item.property_id}</p>
                  <p>Address: {item.prop_address}</p>
                  <p>Zip Code: {item.zip}</p>
                  <p>
                    Location Verified?: {item.location_verified ? "Yes" : "No"}
                  </p>
                  {!item.location_verified && (
                    <Link to="/admin/confirm-details">
                      Confirm your Property Location
                    </Link>
                  )}
                  <p>Number of Spaces: {item.number_spaces}</p>
                  <div className="lot-earn-info">
                    <h3>Statement</h3>
                    <div className="lot-list">
                      <div className="lot-earn-item">
                        <p>Billing Type: {item.billing_type}</p>
                      </div>
                    </div>
                  </div>
                  {item.picture && <img src={item.picture} alt="placeholder" />}
                  <div>
                    <button type="click" onClick={() => setShowDetails(i)}>
                      Space Details at this Property
                    </button>
                    {showDetails === i && (
                      <PropertySpace propertyId={item.property_id} />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flexGrow">
          <Link to="/home">Home</Link>
        </div>
      </section>
    );
  }

  if (error) {
    return <div>Api Error</div>;
  }
};

export default Renter;
