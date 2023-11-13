import { useGetAvailLandingSpotsQuery } from "../../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../../redux/landing/landingSearchSlice";
import { getCarTruckPrice } from "../../../constants/reducers/searchform";
import { searchBookings } from "../../../redux/client/clientSearchSlice";
import { useEffect } from "react";
import CLLoading from "./CLLoading";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/CLSearchResults.css";
import "../Styles/Client.css";

const CLSearchResults = () => {
  const searchStatus = useSelector(getLanSearchStatus);
  const searchArr = useSelector(state => state.landing);
  const dispatch = useDispatch()

  const {
    data: clientSearches,
    isSuccess,
    isFetching,
    error,
    isLoading
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1], { skip: searchStatus });

  useEffect(() => {
    if (clientSearches?.length) {

      dispatch(searchBookings());
    }

  }, [clientSearches])
  

  if (isLoading || isFetching) {
    return (
        <CLLoading />
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    const clSearchResults = clientSearches.filter(item => +item.row_num === 1);
    return (
      <><div>
        Result of your Search
      </div>
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
                  let cartruckp = getCarTruckPrice(clSearchResults, item.property_id);
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
                      <Link
                      className="button-square button-primary"
                      to={`/checkout/${item.property_id.substring(
                        0,
                        13
                      )}/?starts=${searchArr[searchArr.length - 1][2]}&ends=${
                        searchArr[searchArr.length - 1][3]
                      }`}
                    >
                      Book Now
                    </Link>
                    <div className="cl-st-continer">
                                      <table className="table">
                                      <thead>
                                        <tr>
                                          <th>Commuter price</th>
                                          <th>Large vehicle price</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>${cartruckp[0]}</td>
                                          <td>${cartruckp[1]}</td>
                                        </tr>
                                      </tbody>
                                    </table>
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
