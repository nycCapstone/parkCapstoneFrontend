import { useGetAvailLandingSpotsQuery } from "../../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../../redux/landing/landingSearchSlice";
import { getCarTruckPrice } from "../../../constants/reducers/searchform";
import { searchBookings } from "../../../redux/client/clientSearchSlice";
import { useEffect, useState } from "react";
import * as geolib from "geolib";
import CLLoading from "./CLLoading";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/CLSearchResults.css";
import "../Styles/Client.css";

const CLSearchResults = () => {
  const searchStatus = useSelector(getLanSearchStatus);
  const searchArr = useSelector((state) => state.landing);
  const searchLocation = useSelector((state) => state.searchResults.location);
  const dispatch = useDispatch();

  const {
    data: clientSearches,
    isSuccess,
    isFetching,
    error,
    isLoading,
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1], {
    skip: searchStatus,
  });

  useEffect(() => {
    if (clientSearches?.length && searchLocation) {
      dispatch(searchBookings());
    }
  }, [clientSearches, searchLocation]);

  const [useArray, setUseArray] = useState(null);
  const [selectedOption, setSelectedOption] = useState("distance");

  useEffect(() => {
    let results = clientSearches;

    if (searchStatus || isSuccess) {
      setUseArray(chooseArray({ type: selectedOption, payload: results }));
    }
  }, [clientSearches, searchStatus, isSuccess, searchArr]);

  const calculateDistance = (searchLocation, result) => {
    const startPoint = {
      latitude: searchLocation.lat,
      longitude: searchLocation.lng,
    };

    const endPoint = {
      latitude: result.latitude,
      longitude: result.longitude,
    };

    if (
      !startPoint.latitude ||
      !startPoint.longitude ||
      !endPoint.latitude ||
      !endPoint.longitude
    ) {
      return 0;
    }

    const distance = geolib.getDistance(startPoint, endPoint);

    return distance * 0.00062137119;
  };

  const chooseArray = (action) => {
    let filteredResults;

    switch (action.type) {
      case "distance":
        filteredResults = action.payload;
        return filteredResults
          ? filteredResults
              .map((item) => {
                const distance = calculateDistance(
                  searchArr[searchArr.length - 1][1],
                  item
                );
                return {
                  ...item,
                  distance: distance !== null ? distance : "N/A",
                };
              })
              .sort((a, b) => a.distance - b.distance)
          : [];

      case "high":
        filteredResults = [...action.payload].sort((a, b) => a.price - b.price);
        break;

      case "low":
        filteredResults = [...action.payload].sort((a, b) => b.price - a.price);
        break;

      default:
        return [];
    }

    return filteredResults.map((item) => {
      const distance = calculateDistance(
        searchArr[searchArr.length - 1][1],
        item
      );
      return {
        ...item,
        distance: distance !== null ? distance : "N/A",
      };
    });
  };

  if (isLoading || isFetching) {
    return <CLLoading />;
  }

  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    const clSearchResults = clientSearches.filter(
      (item) => +item.row_num === 1
    );
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
              <div className="sort-button-container">
                <label htmlFor="sortByPrice">Filter:</label>
                <select
                  id="sortByPrice"
                  className="sort-dropdown"
                  value={selectedOption}
                  onChange={(e) => {
                    setUseArray(
                      chooseArray({
                        type: e.target.value,
                        payload: clSearchResults,
                      })
                    );

                    setSelectedOption(e.target.value);
                  }}
                >
                  <option value="high">Price: Low to High</option>
                  <option value="low">Price: High to Low</option>
                  <option value="distance">Distance: Closest</option>
                </select>
              </div>
              <div>
                <div className="destination-container">
                  {useArray?.length > 0 && (
                    <>
                      <i
                        className="fa-solid fa-location-dot fa-flip"
                        style={{ color: "#f41901" }}
                      ></i>

                      <div className="destination-info">
                        <h3 className="destination-title">Your Destination</h3>
                        <p className="destination-address">
                          {searchArr?.addr || "N/A"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="search-reslist">
                {useArray?.length > 0 &&
                  useArray.map((item, i) => {
                    let cartruckp = getCarTruckPrice(
                      clSearchResults,
                      item.property_id
                    );
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
                          )}/?starts=${
                            searchArr[searchArr.length - 1][2]
                          }&ends=${searchArr[searchArr.length - 1][3]}`}
                        >
                          Book Now
                        </Link>
                        <div className="cl-st-continer">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Commuter price</th>
                                <th>Large vehicle price</th>
                                <th>Distance (miles)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>${cartruckp[0]}</td>
                                <td>${cartruckp[1]}</td>
                                <td>
                                  {typeof item.distance === "number"
                                    ? item.distance.toFixed(2)
                                    : "N/A"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="button-container">
                            {item.picture && (
                              <img alt="propimage" src={item.picture} />
                            )}
                            <Link to={`/parking-spots/${item.space_id}`}>
                              <button className="show-me-button">
                                Show More
                              </button>
                            </Link>
                            {!searchStatus && (
                              <Link
                                className="button-square button-primary"
                                to={`/checkout/${item.property_id.substring(
                                  0,
                                  13
                                )}/?starts=${
                                  searchArr[searchArr.length - 1][2]
                                }&ends=${searchArr[searchArr.length - 1][3]}`}
                              >
                                Book Now
                              </Link>
                            )}
                          </div>
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
