import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ChangeTime from "./Component/ChangeTime";
import Loading from "../../assets/Spinners/Loading";
import "./Styles/ChangeTime.css";

const Reservation = ({ resData }) => {
  const searchObj = useSelector((state) => state.checkout);
  const [chTime, setChTime] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resData[0]?.property_id) {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {resData && (
            <>
              <div className="resrundown-container ss-info-container">
                <section className="resrundown-times">
                  <p className="">Enter After:</p>
                  <p>{`${new Date(
                    searchObj.query[searchObj.query.length - 1][2],
                  ).toLocaleDateString()} ${new Date(
                    searchObj.query[searchObj.query.length - 1][2],
                  ).toLocaleTimeString()}`}</p>
                </section>
                <section className="resrundown-times">
                  <p>Exit Before:</p>
                  <p>{`${new Date(
                    searchObj.query[searchObj.query.length - 1][3],
                  ).toLocaleDateString()} ${new Date(
                    searchObj.query[searchObj.query.length - 1][3],
                  ).toLocaleTimeString()}`}</p>
                </section>

                <p className="r-summary-finalp">
                  Economy Price: ${resData[0].final_price}
                </p>

                <button
                  className="change-time-link"
                  id="change-time"
                  onClick={() => setChTime(!chTime)}
                >
                  {chTime ? "Close" : "Change Time"}
                </button>
              </div>

              {chTime && <ChangeTime />}
            </>
          )}
          {!resData && (
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
