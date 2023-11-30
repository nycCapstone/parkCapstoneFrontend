import { useEffect, useState } from "react";
import { useGetAvailLandingSpotsQuery } from "../../redux/client/searchApiSlice";
import { getLanSearchStatus } from "../../redux/landing/landingSearchSlice";
import { getCarTruckPrice } from "../../constants/reducers/searchform";
import { useSelector } from "react-redux";
import * as geolib from "geolib";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import MapView from "../Maps/MapView";
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
  } = useGetAvailLandingSpotsQuery(searchArr[searchArr.length - 1], {
    skip: searchStatus,
  });
  const [useArray, setUseArray] = useState(null);
  const [selectedOption, setSelectedOption] = useState("distance");

  useEffect(() => {
    let results = landingSearchResults || searchResults?.results;

    if (searchStatus || isSuccess) {
      setUseArray(chooseArray({ type: selectedOption, payload: results }));
    }
  }, [landingSearchResults, searchStatus, isSuccess, searchArr]);

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
  if (isLoading || !useArray) {
    return (
      <div className="s-loading-container">
        <SearchLoading />
      </div>
    );
  } else if (useArray) {
    let results = landingSearchResults || searchResults?.results;

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
                    <p className="destination-address">{searchLocation.addr}</p>
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
                    payload: results.filter((item) => +item.row_num === 1),
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

          <div className="search-reslist">
            {useArray?.length > 0 &&
              useArray.map((item, i) => {
                let avail = item.count_spaces !== item?.occupied;
                let cartruckp = getCarTruckPrice(results, item.property_id);

                return (
                  <div
                    className="spot-info"
                    key={i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    <p style={{ fontSize: "large" }}>{item.prop_address}</p>

                    {searchStatus && (
                      <>
                        <p>Available now: {avail ? "Yes" : "No"}</p>
                        <p>Number of spaces: {item.count_spaces}</p>
                      </>
                    )}
                    <p>
                      Billing Type:{" "}
                      {item.billing_type === "fixed" ? "full day" : "hourly"}
                    </p>

                    <p>
                      <i
                        class="fa-solid fa-person-walking-arrow-right fa-beat"
                        style={{ color: "#f41901" }}
                      ></i>
                      Distance(miles): {item.distance.toFixed(2)}
                    </p>

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
                    <div className="button-container">
                      {item.picture && (
                        <img alt="propimage" src={item.picture} />
                      )}
                      <Link to={`/parking-spots/${item.space_id}`}>
                        <button className="show-me-button">View Details</button>
                      </Link>
                      {!searchStatus && (
                        <Link
                          to={`/checkout/${item.property_id.substring(
                            0,
                            13
                          )}/?starts=${
                            searchArr[searchArr.length - 1][2]
                          }&ends=${searchArr[searchArr.length - 1][3]}`}
                        >
                          <button className="checkout-button">Checkout</button>
                        </Link>
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
  } else {
    return <div>Empty Results</div>;
  }
};

export default SearchResults;
