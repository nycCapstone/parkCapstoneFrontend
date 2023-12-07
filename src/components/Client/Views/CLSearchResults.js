import { useGetAvailLandingSpotsQuery } from "../../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../../redux/landing/landingSearchSlice";
import { getCarTruckPrice } from "../../../constants/reducers/searchform";
import { searchBookings } from "../../../redux/client/clientSearchSlice";
import MapView from "../../Maps/MapView";
import * as geolib from "geolib";
import { useEffect, useState } from "react";
import CLLoading from "./CLLoading";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Styles/CLSearchResults.css";
import "../Styles/Client.css";

const CLSearchResults = () => {
  const searchStatus = useSelector(getLanSearchStatus);
  const searchArr = useSelector((state) => state.landing);
  const dispatch = useDispatch();
  const searchLocation = useSelector((state) => state.searchResults.location);

  const {
    data: clientSearches,
    isSuccess,
    isFetching,
    error,
    isLoading,
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1], {
    skip: searchStatus,
  });
  const [useArray, setUseArray] = useState(null);
  const [selectedOption, setSelectedOption] = useState("distance");

  useEffect(() => {
    if (clientSearches?.length) {
      dispatch(searchBookings());
      setUseArray(
        chooseArray({ type: selectedOption, payload: clientSearches }),
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

  if (isLoading || isFetching) {
    return (
      <div className="s-loading-container">
        <CLLoading />
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    return (
      <>
        {!useArray?.length ? (
          <div>No Results Yet</div>
        ) : (
          <div className="cl-s-and-map-container">
            <main className="cl-search-main">
              <div className="cl-sort-button-container">
                <div className="cl-destination-container">
                  {searchLocation && (
                    <>
                      <i
                        className="fa-solid fa-location-dot fa-flip"
                        style={{ color: "#f41901" }}
                      ></i>

                      <div className="destination-info">
                        <h3 className="destination-title">Your Destination</h3>
                        <p className="destination-address">
                          {searchLocation.addr}
                        </p>
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
                          (item) => +item.row_num === 1,
                        ),
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

              <div className="cl-search-reslist">
                {useArray.map((item, i) => {
                  let cartruckp = getCarTruckPrice(
                    clientSearches,
                    item.property_id,
                  );
                  return (
                    <div
                      className="spot-info"
                      key={i}
                      onMouseEnter={() => handleMouseEnter(i)}
                      onMouseLeave={() => handleMouseLeave(i)}
                    >
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
                          13,
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
                    price: getCarTruckPrice(
                      clientSearches,
                      item.property_id,
                    )[0],
                  };
                })}
              />
            </section>
          </div>
        )}
      </>
    );
  }
  return null;
};

export default CLSearchResults;
