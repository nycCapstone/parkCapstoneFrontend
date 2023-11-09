import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults.data);
  const paramsValues = Object.values(searchResults.params);
  if (!searchResults) return <div>No Searches</div>;
  return (
    <>
      <main className="search-main">
        <Link
          to={`/checkout?starts=${paramsValues[0] + paramsValues[1]}&ends=${
            paramsValues[2] + paramsValues[3]
          }`}
        >
          Checkout
        </Link>
        <h1 className="s-res-header-text">Search Results</h1>
        <div className="search-reslist">
          {searchResults.results.map((item, i) => {
            let avail = item.count_spaces !== item.occupied;
            return (
              <div className="spot-info" key={i}>
                <p>Address: {item.prop_address}</p>
                <p>Zip Code: {item.zip}</p>
                <p>Availability: {avail ? "Yes" : "No"}</p>
                <p>Number of spaces: {item.count_spaces}</p>
                <p>Billing Type: {item.billing_type}</p>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Avg Price</th>
                      <th>Min Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> ${item.avg_price.toFixed(2)}</td>
                      <td> ${item.min_price.toFixed(2)}</td>
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
    </>
  );
};

export default SearchResults;
