import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAvailLandingSpotsQuery } from "../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../redux/landing/landingSearchSlice";
import { getCarTruckPrice } from "../../constants/reducers/searchform";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { Link } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults.data);
  const searchLocation = useSelector((state) => state.searchResults.location);

  const searchStatus = useSelector(getLanSearchStatus);
  const searchArr = useSelector((state) => state.landing);
  const {
    data: landingSearchResults,
    isSuccess,
    isLoading,
    //this sorts by time and distance
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1], {
    skip: searchStatus,
  });
  const [useArray, setUseArray] = useState(null);
  const [selectedOption, setSelectedOption] = useState("distance");

  useEffect(() => {
    if (searchStatus || isSuccess) {
      setUseArray(chooseArray({ type: "distance" }));
    }
  }, [landingSearchResults]);

  const chooseArray = (action) => {
    switch (action.type) {
      case "distance":
        if (searchStatus) {
          return searchResults.results.filter((item) => +item.row_num === 1);
        } else if (isSuccess) {
          return landingSearchResults.filter((item) => +item.row_num === 1);
        }
      case "high":
        return action.payload.sort((a, b) => a.price - b.price);
      case "low":
        return action.payload.sort((a, b) => b.price - a.price);
      default:
        return [];
    }
  };

  if (isLoading || !useArray) {
    return <SearchLoading />;
  } else if (useArray) {
    let results = searchResults?.results || landingSearchResults;

    return (
      <main className="search-main">
        <h1 className="s-res-header-text">Search Results</h1>

        <div className="sort-button-container">
          <label htmlFor="sortByPrice">Sort by Price:</label>
          <select
            id="sortByPrice"
            className="sort-dropdown"
            value={selectedOption}
            onChange={(e) => {
              setUseArray(
                chooseArray({
                  type: e.target.value,
                  payload: results.filter((item) => +item.row_num === 1),
                })
              );

              setSelectedOption(e.target.value);
            }}
          >
            <option value="high">Low to High</option>
            <option value="low">High to Low</option>
            <option value="distance">distance</option>
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
          {useArray?.length > 0 &&
            useArray.map((item, i) => {
              let avail = item.count_spaces !== item.occupied;
              let cartruckp = getCarTruckPrice(useArray, item.property_id);

              return (
                <div className="spot-info" key={i}>
                  <p>Address: {item.prop_address}</p>
                  <p>Zip Code: {item.zip}</p>
                  {searchStatus && (
                    <>
                      <p>Available now: {avail ? "Yes" : "No"}</p>
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
    );
  } else {
    return <div>Empty Results</div>;
  }
};

export default SearchResults;
