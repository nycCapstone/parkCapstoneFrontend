import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortByPrice,
  setSearchResults,
} from "../../redux/search/searchResultsSlice";
import { useGetAvailLandingSpotsQuery } from "../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../redux/landing/landingSearchSlice";
import { Link } from "react-router-dom";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { getCarTruckPrice } from "../../constants/reducers/searchform";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults.data);
  const searchLocation = useSelector((state) => state.searchResults.location);
  const sortByPrice = useSelector(
    (state) => state.searchResults.filters.sortByPrice
  );
  const searchStatus = useSelector(getLanSearchStatus);
  const searchArr = useSelector((state) => state.landing);
  const {
    data: landingSearchResults,
    isSuccess,
    isLoading,
    error,
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1], {
    skip: searchStatus,
  });
  const [useArray, setUseArray] = useState(null);

  useEffect(() => {
    if (searchStatus) {
      setUseArray(searchResults);
    } else if (isSuccess) {
      setUseArray(landingSearchResults);
    }
  }, [landingSearchResults, searchResults, searchStatus, isSuccess]);

  if (!useArray || isLoading) {
    return <SearchLoading />;
  }

  const results = useArray?.results ? useArray.results : landingSearchResults;

  const filteredResults = results
    ? results.filter((item) => +item.row_num === 1)
    : [];

  const getSortingFunction = () => {
    if (sortByPrice) {
      return (a, b) => a.avg_price - b.avg_price;
    }
    return () => 0;
  };

  const sortedResults = [...filteredResults].sort(getSortingFunction());

  console.log("searchLocation:", searchLocation);

  return (
    <div>
      <main className="search-main">
        <h1 className="s-res-header-text">Search Results</h1>

        <div className="sort-button-container">
          <label htmlFor="sortByPrice">Sort by Price:</label>
          <select
            id="sortByPrice"
            className="sort-dropdown"
            value={sortByPrice ? "low" : "high"}
            onChange={(e) => dispatch(setSortByPrice(e.target.value === "low"))}
          >
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div>
          {searchLocation && (
            <div className="location-info">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Destination: {searchLocation.addr}</h3>
            </div>
          )}
        </div>
        <div className="search-reslist">
          {sortedResults.map((item, i) => {
            let avail = item.count_spaces !== item.occupied;
            let cartruckp = getCarTruckPrice(results, item.property_id);

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
                    )}/?starts=${searchArr[searchArr.length - 1][2]}&ends=${
                      searchArr[searchArr.length - 1][3]
                    }`}
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
};

export default SearchResults;
