import { useGetAvailLandingSpotsQuery } from "../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../redux/landing/landingSearchSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCarTruckPrice } from "../../constants/reducers/searchform";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { Link } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults.data);
  const searchStatus = useSelector(getLanSearchStatus);
  //when a booking time block is requested on the landing search bar.
  const searchArr = useSelector((state) => state.landing);
  //api call to include booking time.
  const {
    data: landingSearchResults,
    isSuccess,
    isLoading,
    error,
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length-1], { skip: searchStatus });
  const [useArray, setUseArray] = useState(null);

  useEffect(() => {
    if (searchStatus) {
      setUseArray(searchResults);
    } else if (isSuccess) {
      setUseArray(landingSearchResults);
    }
  }, [landingSearchResults]);

  if (!searchResults) return <div>No Searches</div>;

  if (useArray) {
    let results = useArray?.results ? useArray.results : landingSearchResults;
    results = results.filter((item) => +item.row_num === 1);
    return (
      <div>
        <main className="search-main">
          <h1 className="s-res-header-text">Search Results</h1>
          <div className="search-reslist">
            {results.map((item, i) => {
              let avail;
              let cartruckp = getCarTruckPrice(results, item.property_id);
              if (useArray?.results) {
                avail = item.count_spaces !== item.occupied;
              }
              return (
                <div className="spot-info" key={i}>
                  <p>Address: {item.prop_address}</p>
                  <p>Zip Code: {item.zip}</p>
                  {useArray?.results && (
                    <>
                      <p>Availability: {avail ? "Yes" : "No"}</p>
                      <p>Number of spaces: {item.count_spaces}</p>
                    </>
                  )}
                  <p>Billing Type: {item.billing_type}</p>
                  {!searchStatus && (
                    <Link
                      to={`/checkout/${item.property_id.substring(
                        0,
                        13
                      )}/?starts=${searchArr[searchArr.length-1][2]}&ends=${searchArr[searchArr.length-1][3]}`}
                    >
                      Checkout
                    </Link>
                  )}
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
                  <div>
                    {item.picture && <img alt="propimage" src={item.picture} />}
                    <Link to={`/parking-spots/${item.space_id}`}>
                      <button className="show-me-button">Show More</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  if (isLoading || !useArray) {
    return <SearchLoading />;
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default SearchResults;
