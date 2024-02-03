import { useEffect, useState } from "react";
import { useGetAvailLandingSpotsQuery } from "../../redux/client/searchApiSlice";
import { getCarTruckPrice } from "../../constants/reducers/searchform";
import { useSelector, useDispatch } from "react-redux";
import { searchResultsError } from "../../redux/search/searchResultsSlice";
import * as geolib from "geolib";
import Loading from "../../assets/Spinners/Loading";
import MapView from "../Maps/MapView";
import SearchChangeTime from "./Component/SearchChangeTime";
import { Link, Navigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const searchLocation = useSelector((state) => state.searchResults.location);
  const searchArr = useSelector((state) => state.landing);
  const {
    data: landingSearchResults,
    isSuccess,
    isLoading,
    error,
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1]);
  const role = useSelector((state) => state.auth?.accessToken);

  const [useArray, setUseArray] = useState(null);
  const [selectedOption, setSelectedOption] = useState("distance");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setUseArray(
        chooseArray({ type: selectedOption, payload: landingSearchResults }),
      );
    } else if (error) {
      dispatch(searchResultsError(error));
    }
  }, [landingSearchResults, error]);

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
        filteredResults = (action.payload || []).filter(
          (item) => +item.row_num === 1,
        );
        return filteredResults
          .map((item) => ({
            ...item,
            distance: calculateDistance(searchLocation, item),
          }))
          .filter((item) => item.distance < 51)
          .sort((a, b) => a.distance - b.distance);

      case "high":
        filteredResults = [...action.payload].sort((a, b) => a.price - b.price);
        break;

      case "low":
        filteredResults = [...action.payload].sort((a, b) => b.price - a.price);
        break;

      default:
        return [];
    }

    return filteredResults
      .map((item) => ({
        ...item,
        distance: calculateDistance(searchLocation, item),
      }))
      .filter((item) => item.distance < 51);
  };

  const handleMouseEnter = (i) => {
    let wid = document.getElementById(`${i}infowindow`);
    if (wid) {
      wid.style.color = "red";
      wid.style.fontWeight = "bold";
    }
  };

  const handleMouseLeave = (i) => {
    let wid = document.getElementById(`${i}infowindow`);
    if (wid) {
      wid.style.color = "black";
      if (i > 0) {
        wid.style.fontWeight = 300;
      }
    }
  };
  if (error) {
    return <Navigate to="/" />;
  }
  if (isLoading || !useArray) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  } else if (useArray && useArray?.length > 0) {
    let results = landingSearchResults;

    return (
      <div className="search-and-map-container">
        <main className="search-main">
          <div className="sort-button-container">
            <div className="destination-container">
              {searchLocation && (
                <>
                  <i
                    className="fa-solid fa-location-dot fa-flip"
                    style={{ color: "#f41901" }}
                  ></i>
                  <div className="destination-info">
                    <h3 className="destination-title">Your Destination</h3>
                    <p className="destination-address">
                      {!searchLocation.options
                        ? searchLocation.addr.slice(0, -5)
                        : searchLocation.addr}
                    </p>
                  </div>
                </>
              )}
            </div>
            <label htmlFor="sortByPrice">
              <i className="fa-solid fa-sort"></i> Filter:
            </label>
            <select
              id="sortByPrice"
              className="sort-dropdown"
              value={selectedOption}
              onChange={(e) => {
                setUseArray(
                  chooseArray({
                    type: e.target.value,
                    payload: results.filter((item) => +item.row_num === 1),
                  }),
                );

                setSelectedOption(e.target.value);
              }}
            >
              <option value="high">Price: Low to High</option>
              <option value="low">Price: High to Low</option>
              <option value="distance">Distance: Closest</option>
            </select>
          </div>

          <div className="search-reslist">
            <SearchChangeTime isOpen={modalOpen} onClose={closeModal} />
            {useArray?.length > 0 &&
              useArray.map((item, i) => {
                let cartruckp = getCarTruckPrice(results, item.property_id);

                return (
                  <div
                    className="spot-info"
                    key={i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "whitesmoke",
                    }}
                  >
                    <p className="search_results_address">
                      {item.prop_address.slice(0, -5)}
                    </p>
                    <p>
                      <span className="search_results_distance">
                        Distance: {item.distance.toFixed(2)} miles
                      </span>{" "}
                      <i
                        className="fa-solid fa-person-walking"
                        style={{ color: "#000000" }}
                      ></i>
                    </p>
                    <p className="search_results_billing_type">
                      Billing Type:{" "}
                      {item.billing_type === "fixed" ? "full day" : "hourly"}
                    </p>
                    {!item.available && (
                      <p className="search_results_billing_type">
                        Low Availability
                      </p>
                    )}
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="search_results_table_head">
                            Small Vehicle{" "}
                            <i className="fa-solid fa-car-side"></i>
                          </th>
                          <th className="search_results_table_head">
                            Large vehicle <i className="fa-solid fa-truck"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${cartruckp[0]}</td>
                          <td>${cartruckp[1]}</td>
                        </tr>
                      </tbody>
                    </table>{" "}
                    <div className="button-container">
                      <Link
                        to={
                          role
                            ? `/parking-spots/${item.space_id}?starts=${
                                searchArr[searchArr.length - 1]?.[2]
                              }&ends=${searchArr[searchArr.length - 1]?.[3]}`
                            : "/login/2"
                        }
                      >
                        <button className="show-me-button">View Details</button>
                      </Link>

                      {item.available && (
                        <Link
                          to={`/checkout/${item.property_id.substring(
                            0,
                            13,
                          )}/?starts=${
                            searchArr[searchArr.length - 1][2]
                          }&ends=${searchArr[searchArr.length - 1][3]}`}
                        >
                          <button className="checkout-button">Checkout</button>
                        </Link>
                      )}
                      {!item.available && (
                        <button className="checkout-button" onClick={openModal}>
                          Change Time
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
        <section className="search-res-mapview">
          <MapView
            lat={useArray[0].latitude}
            lng={useArray[0].longitude}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            markerArray={useArray.map((item) => {
              return {
                lat: item.latitude,
                lng: item.longitude,
                price: getCarTruckPrice(results, item.property_id)[0],
              };
            })}
          />
        </section>
      </div>
    );
  } else if (useArray?.length === 0) {
    return <div>Empty Results</div>;
  } else {
    return <Navigate to="/" />;
  }
};

export default SearchResults;
