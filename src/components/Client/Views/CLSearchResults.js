import { useGetAvailLandingSpotsQuery } from "../../../redux/client/searchApiSlice";
import { getCarTruckPrice } from "../../../constants/reducers/searchform";
import MapView from "../../Maps/MapView";
import * as geolib from "geolib";
import { useEffect, useState } from "react";
import Loading from "../../../assets/Spinners/Loading";
import SearchChangeTime from "../../Spaces/Component/SearchChangeTime";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import "../Styles/CLSearchResults.css";
import "../Styles/Client.css";

const CLSearchResults = () => {
  const searchArr = useSelector((state) => state.landing);
  const destination = useSelector((state) => state.client.go);
  const loc = useSelector((state) => state.searchResults.location);

  const {
    data: clientSearches,
    error,
    isLoading,
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1]);
  const [useArray, setUseArray] = useState(null);
  const [selectedOption, setSelectedOption] = useState("distance");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (clientSearches?.length > 0) {
      setUseArray(
        chooseArray({ type: selectedOption, payload: clientSearches })
      );
    }
  }, [clientSearches]);

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
          (item) => +item.row_num === 1
        );
        return filteredResults
          .map((item) => ({
            ...item,
            distance: calculateDistance(loc, item),
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
        distance: calculateDistance(loc, item),
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
    return <Navigate to="/client/search" />;
  }

  if (isLoading || !useArray) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  } else if (useArray && useArray?.length) {
    return (
      <div className="cl-s-and-map-container">
        <main className="cl-search-main">
          <div className="cl-sort-button-container">
            <div className="cl-destination-container">
              {loc && (
                <>
                  <i
                    className="fa-solid fa-location-dot fa-flip"
                    style={{ color: "#f41901" }}
                  ></i>

                  <div className="destination-info">
                    <h3 className="destination-title">Your Destination</h3>
                    <p className="destination-address">{destination}</p>
                  </div>
                </>
              )}
            </div>
            <label htmlFor="sortByPrice">Filter:</label>
            <select
              id="sortByPrice"
              className="sort-dropdown"
              value={selectedOption}
              onChange={(e) => {
                setUseArray(
                  chooseArray({
                    type: e.target.value,
                    payload: clientSearches.filter(
                      (item) => +item.row_num === 1
                    ),
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

          <div className="cl-search-reslist">
            <SearchChangeTime isOpen={modalOpen} onClose={closeModal} />
            {useArray.map((item, i) => {
              let cartruckp = getCarTruckPrice(
                clientSearches,
                item.property_id
              );
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
                  <p className="cl_search_results_address">
                    Address: {item.prop_address}
                  </p>
                  {item.count_spaces > 0 && (
                    <p className="cl_search_results_avinfo">
                      Number Available Spaces: {item.count_spaces}
                    </p>
                  )}
                  <p>
                    <span className="cl_search_results_distance">
                      Distance: {item.distance.toFixed(2)} miles{" "}
                    </span>{" "}
                    <i
                      className="fa-solid fa-person-walking"
                      aria-hidden="true"
                      style={{ color: "#000000" }}
                    ></i>
                  </p>
                  <p className="cl_search_results_billing_type">
                    Billing Type:{" "}
                    {item.billing_type === "fixed" ? "full day" : "hourly"}
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          Small Vehicle <i className="fa-solid fa-car-side"></i>
                        </th>
                        <th>
                          Large vehicle
                          <i className="fa-solid fa-truck"></i>
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
                  {item.picture && <img alt="propimage" src={item.picture} />}
                  <div className="button-container">
                    <Link
                      to={`/parking-spots/${item.space_id}?starts=${
                        searchArr[searchArr.length - 1][2]
                      }&ends=${searchArr[searchArr.length - 1][3]}`}
                    >
                      <button className="cl-show-me-button">
                        View Details
                      </button>
                    </Link>

                    {item.available && (
                      <Link
                        to={`/checkout/${item.property_id.substring(
                          0,
                          13
                        )}/?starts=${searchArr[searchArr.length - 1][2]}&ends=${
                          searchArr[searchArr.length - 1][3]
                        }`}
                      >
                        <button className="cl-checkout-button">Book Now</button>
                      </Link>
                    )}
                    {!item.available && (
                      <button
                        className="cl-checkout-button"
                        onClick={openModal}
                      >
                        Change Time
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <section className="cl-s-res-mapview">
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
                price: getCarTruckPrice(clientSearches, item.property_id)[0],
              };
            })}
          />
        </section>
      </div>
    );
  } else {
    return (
      <div>
        <div className="cl-h-svgleft">
          <Link to="/client/search">
            <FaChevronCircleLeft />
          </Link>
        </div>
        Empty Result Set
      </div>
    );
  }
};

export default CLSearchResults;
