import { useGetAvailSpotsQuery } from "../../../redux/client/searchApiSlice";
import Loading from "../../../assets/Spinners/Loading";
import { useSelector } from "react-redux";
import "../../Spaces/SearchResults.css";

const CLSearchResults = () => {
  const searchArr = useSelector((state) => state.client);
  const {
    data: clientSearches,
    isSuccess,
    error,
    isLoading,
  } = useGetAvailSpotsQuery(searchArr, { skip: searchArr?.length === 0 });

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    return (
      <>
        {clientSearches.length === 0 ? (
          <div>No Results Yet</div>
        ) : (
          <>
            <div className="s-res-header">
              <h1 className="s-res-header-text">Available Parking Spots</h1>
            </div>
            <main className="search-main">
              <div className="search-reslist">
                {clientSearches.map((item, i) => {
                  return (
                    <div className="spot-info" key={i}>
                      <p>Address: {item.prop_address}</p>
                      <p>Zip Code: {item.zip}</p>
                      <p>Availability: {item.occupied ? "No" : "Yes"}</p>
                      <div className="cost-info">
                        <span className="span-info">
                          <h4>Price</h4>{" "}
                          <p>
                            {item.billing_type}: {item.price.toFixed(2)}
                          </p>
                        </span>
                      </div>
                      <div>
                        {item.picture && (
                          <img alt="propimage" src={item.picture} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </>
        )}
      </>
    );
  }
  return null;
};

export default CLSearchResults;
