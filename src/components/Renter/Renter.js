import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";
import { Link } from "react-router-dom";
import PropertyForm from "../Forms/PropertyForm";
import PropertySpace from "./PropertySpace";
import { useState } from "react";
import Loading from "../../assets/Spinners/Loading";

const Renter = () => {
  const {
    data: renterData,
    isLoading,
    isSuccess,
    error,
  } = useGetPropertiesQuery();
  const [showDetails, setShowDetails] = useState(null);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (isSuccess) {
    return (
      <section>
        <h1>Renter Page</h1>
        <br />
        <p>This is where you can make new available spots.</p>
        <PropertyForm />
        <div className="renter-prop-elem">
          <h3>Your current properties</h3>
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
