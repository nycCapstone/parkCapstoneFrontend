import { checkoutPrice } from "../../constants/helper/helper";
import { useState } from "react";
import { Link } from "react-router-dom";

const Reservation = ({ userData, searchResults }) => {
    const [priceData, setPriceData] = useState(searchResults.results.find(item => item.property_id.includes(searchResults.property_id)));
  
    return (
      <div >
          <div>
              <i>2</i>
              <h3>Reservation Summary</h3>
          </div>
        <div>
            <section>
                <p>Enter After</p>
                <p style={{fontWeight: "bold"}}>{`${new Date(searchResults.params[0]).toLocaleDateString()} ${new Date(searchResults.params[0]).toLocaleTimeString()}`}</p>
            </section>
            <section>
                <p>Exit Before</p>
                <p style={{fontWeight: "bold"}}>{`${new Date(searchResults.params[1]).toLocaleDateString()} ${new Date(searchResults.params[0]).toLocaleTimeString()}`}</p>
            </section>
            <section>
                <div>{(checkoutPrice(searchResults.params[0], searchResults.params[1], priceData.billing_type) * +priceData.price).toFixed(2)}</div>
            </section>
        </div>
      </div>
    );
}

export default Reservation