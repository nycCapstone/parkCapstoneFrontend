import { useSelector } from "react-redux";
import { checkoutPrice, formData } from "../../constants/helper/helper";
import ChangeTime from "./Component/ChangeTime";
import { useState, useEffect } from "react";
import "./Styles/ChangeTime.css"
import SearchLoading from "../../assets/Spinners/SearchLoading";

const Reservation = ({ checkoutData }) => {
  const searchObj = useSelector((state) => state.checkout);
  const [chTime, setChTime] = useState(false);
  const [loading, setIsLoading] = useState(true);

  const dataObj = formData(checkoutData);

  useEffect(() => {
    if (dataObj?.property_id) {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <SearchLoading />
      ) : (
        <>
          <div>
            <i>2</i>
            <h3>Reservation Summary</h3>
          </div>
          {dataObj && (
            <>
              <aside
              className="change-time-link">
                <i onClick={() => setChTime(!chTime)}>Change Time</i>
              </aside>
              <div>
                <section>
                  <p>Enter After</p>
                  <p style={{ fontWeight: "bold" }}>{`${new Date(
                    searchObj.query[searchObj.query.length - 1][2]
                  ).toLocaleDateString()} ${new Date(
                    searchObj.query[searchObj.query.length - 1][2]
                  ).toLocaleTimeString()}`}</p>
                </section>
                <section>
                  <p>Exit Before</p>
                  <p style={{ fontWeight: "bold" }}>{`${new Date(
                    searchObj.query[searchObj.query.length - 1][3]
                  ).toLocaleDateString()} ${new Date(
                    searchObj.query[searchObj.query.length - 1][3]
                  ).toLocaleTimeString()}`}</p>
                </section>
                <section>
                  <div>
                    Economy Price: $
                    {(
                      checkoutPrice(
                        searchObj.query[searchObj.query.length - 1][2],
                        searchObj.query[searchObj.query.length - 1][3],
                        dataObj.billing_type
                      ) * +dataObj.price
                    ).toFixed(2)}
                  </div>
                </section>
              </div>
              {chTime && (
                <section>
                  <ChangeTime />
                </section>
              )}
            </>
          )}
          {!dataObj && (
            <div>
              No Reservation Data for this property at the reservation block
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reservation;
