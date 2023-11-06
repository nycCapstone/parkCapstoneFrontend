import { useSelector } from "react-redux";
import "./SearchResults.css";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults.data);
  if (!searchResults) return <div>No Searches</div>;
  return (
    <>
      <div className="s-res-header">
        <h1 className="s-res-header-text">Search Results</h1>
      </div>
      <main className="search-main">
        <div className="search-reslist">
          {searchResults.map((item, i) => {
            let avail = searchResults.some(
              (a) => a.property_id === item.property_id && a.occupied === false
            );
            return (
              <div className="spot-info" key={i}>
                <p>Address: {item.prop_address}</p>
                <p>Zip Code: {item.zip}</p>
                <p>Space type: {item.sp_type}</p>
                <p>Availability: {avail ? "Yes" : "No"}</p>
                <p>Number of spaces: {item.count_spaces}</p>
                <div className="cost-info">
                  <span>
                    <h4>Average Price</h4> <p>{item.billing_type}: {item.avg_price.toFixed(2)}</p>
                    <h4>Min Price</h4> <p>{item.billing_type}: {item.min_price.toFixed(2)}</p>
                  </span>
                </div>
                <div>
                  {item.picture && <img alt="propimage" src={item.picture} />}
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
