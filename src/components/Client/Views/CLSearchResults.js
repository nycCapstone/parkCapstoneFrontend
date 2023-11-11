import { useGetAvailSpotsQuery } from "../../../redux/client/searchApiSlice";
import { getCLSearchStatus } from "../../../redux/client/clientSearchSlice";
import CLLoading from "./CLLoading";
import { useSelector } from "react-redux";
import "../Styles/CLSearchResults.css";
import "../Styles/Client.css";

const CLSearchResults = () => {
  const searchStatus = useSelector(getCLSearchStatus);
  const searchArr = useSelector(state => state.client);

  const {
    data: clientSearches,
    isSuccess,
    isFetching,
    error,
    isLoading
  } = useGetAvailSpotsQuery(searchArr, { skip: searchStatus });

  if (isLoading || isFetching) {
    return (
        <CLLoading />
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    const clSearchResults = clientSearches.filter(item => +item.row_num === 1)
    return (
      <>
        {clSearchResults.length === 0 ? (
          <div>No Results Yet</div>
        ) : (
          <>
            <div className="s-res-header">
              <h1 className="s-res-header-text">Available Parking Spots</h1>
            </div>
            <main className="search-main">
              <div className="search-reslist">
                {clSearchResults.map((item, i) => {
                  return (

                    <div className="spot-info" key={i}>
                      <p>Address: {item.prop_address}</p>
                      <p>Zip Code: {item.zip}</p>
                      <p>Number Available Spaces: {item.count_spaces}</p>
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
                            <a className="button-square button-primary" href="#" style={{float: "right"}}>Book Now</a>
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
