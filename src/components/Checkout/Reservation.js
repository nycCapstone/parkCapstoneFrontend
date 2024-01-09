import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ChangeTime from "./Component/ChangeTime";
import Loading from "../../assets/Spinners/Loading";
import "./Styles/ChangeTime.css";

const Reservation = ({ resData }) => {
  const searchObj = useSelector((state) => state.checkout);
  const [chTime, setChTime] = useState(false);
  const [loading, setIsLoading] = useState(true);

  console.log(resData);
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
              <div className="resrundown-container">
                <div className="resrundown-times">
                  <label className="resrundown-times-label">Enter After:</label>

                  <p>
                    {`${new Date(
                      searchObj.query[searchObj.query.length - 1][2]
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} ${new Date(
                      searchObj.query[searchObj.query.length - 1][2]
                    ).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}`}
                  </p>
                </div>
                <div className="resrundown-times">
                  <label className="resrundown-times-label">Exit Before:</label>

                  <p>
                    {`${new Date(
                      searchObj.query[searchObj.query.length - 1][3]
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} ${new Date(
                      searchObj.query[searchObj.query.length - 1][3]
                    ).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}`}
                  </p>
                </div>

                {/* <p className="r-summary-finalp">
                  Economy Price: ${resData[0].final_price}
                </p> */}
                <div className="reservation-change-time">
                  <p>
                    Click{" "}
                    <span
                      className="update-ReservationTime"
                      id="change-time"
                      onClick={() => setChTime(!chTime)}
                    >
                      here
                    </span>{" "}
                    to change the time
                  </p>
                  {chTime && (
                    <div className="changeTimeComp">
                      <ChangeTime />{" "}
                    </div>
                  )}
                </div>
                {/* <button
                  className="change-time-link"
                  id="change-time"
                  onClick={() => setChTime(!chTime)}
                >
                  {chTime ? "Close" : "Change Time"}
                </button> */}
              </div>
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
