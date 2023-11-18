import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useInsertBookingMutation } from "../../redux/checkout/checkoutApiSlice";
import { setRInfo } from "../../redux/checkout/reservationSlice";
import { useNavigate } from "react-router-dom";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import "./Styles/ResDetails.css";

const ReservationDetails = ({ userData, resData }) => {
  const checkoutObj = useSelector((state) => state.checkout);
  const [loading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [err, setErr] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [insertBooking] = useInsertBookingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resData && resData[0]?.property_id) {
      setIsLoading(false);
    }
    if (!userData?.id) {
      setEnabled(true)
    }
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.id) {
      setErr(true);
      return;
    }
    const selectedSpace = resData?.find(
      (space) => space.sp_type === selectedType
    );
    const data = [
      selectedSpace.space_id,
      selectedSpace.final_price,
      checkoutObj.query[checkoutObj.query.length - 1][2],
      checkoutObj.query[checkoutObj.query.length - 1][3],
    ];
    await insertBooking({
      data,
    })
      .unwrap()
      .then((res) => {
        dispatch(
          setRInfo({
            selected_space: selectedSpace,
            query_data: data,
            nav_id: Math.ceil(Math.random() * 250).toString(),
            ...res,
          })
        );
        //navigate to new page with bookings table lookup id.
        navigate(`/payment/${res.booking_id}`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="res-detail-container">
      {loading ? (
        <SearchLoading />
      ) : (
        <>
          {!checkoutObj?.conflict && (
            <>
              <div className="ch-numicon">
                <i>3</i>
              </div>
              <h3>Add to Cart</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Select Vehicle Type:</label>
                  <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    required
                  >
                    <option value="">Select</option>
                    {resData
                      .filter((item) => item?.row_num)
                      .map((item, idx) => {
                        return (
                          <option
                            key={idx}
                            value={item.sp_type}
                            id={item.space_id}
                          >
                            {item.sp_type}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="checkout-options">
                  {resData.length > 2 ? "Two space options available" : ""}
                </div>

                <div>
                  <p>
                    Selected Vehicle:{" "}
                    {selectedType.length ? selectedType : resData[0].sp_type}
                  </p>
                  <p>
                    Final Price: $
                    {resData.find((item) => item.sp_type === selectedType)
                      ?.final_price || resData[0].final_price}
                  </p>
                </div>

                <button type="submit" disabled={enabled}>Go To Payment Details</button>
              </form>
              {err && (
                <div className="res-fail-container">
                  Need Account to be Logged In to Reserve
                </div>
              )}
            </>
          )}
          {checkoutObj?.conflict && (
            <>
              {/* // TODO component for conflicting bookings */}
              <div>You cannot book this place at this time.</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ReservationDetails;
