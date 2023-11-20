import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { reservationData } from "../../constants/helper/helper";
import { useInsertBookingMutation } from "../../redux/checkout/checkoutApiSlice";
import { setRInfo } from "../../redux/checkout/reservationSlice";
import { useNavigate } from "react-router-dom";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import "./Styles/ReservationDetails.css";

const ReservationDetails = ({ checkoutData, userData }) => {
  const checkoutObj = useSelector((state) => state.checkout);
  const resData = reservationData(checkoutData, checkoutObj);
  const [loading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");

  const [insertBooking] = useInsertBookingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resData && resData[0]?.property_id) {
      setIsLoading(false);
    }
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  if (!userData?.id) {
    // TODO component for non access.
    return <div>Need Account to be Logged In to Reserve</div>;
  } else {
    return (
      <div>
        {loading ? (
          <SearchLoading />
        ) : (
          <>
            {!checkoutObj?.conflict && (
              <>
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

                  <button type="submit">Go To Payment Details</button>
                </form>
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
  }
};

export default ReservationDetails;
