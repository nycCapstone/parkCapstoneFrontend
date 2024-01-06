import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useInsertBookingMutation } from "../../redux/checkout/checkoutApiSlice";
import { setRInfo } from "../../redux/checkout/reservationSlice";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/ResDetails.css";

const ReservationDetails = ({ userData, resData, checkoutData, refetch }) => {
  const checkoutObj = useSelector((state) => state.checkout);
  const [selectedType, setSelectedType] = useState("");
  const [err, setErr] = useState(false);
  const [BookingErr, setBookingErr] = useState({ isErr: false, message: "" });
  const [enabled, setEnabled] = useState(false);
  const roles = userData?.roles;

  let lat = resData[0].latitude;
  let lng = resData[0].longitude;

  const [insertBooking] = useInsertBookingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userData?.id ||
      (roles?.ClientOnly && !roles.Client.bckgr) ||
      (roles?.Renter && !roles.Client.bckgr)
    ) {
      setEnabled(true);
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

    let groupedSpaces = [];
    let selectedSpace = {};

    for (let r of checkoutData) {
      if (r.sp_type === selectedType) {
        groupedSpaces.push(r);
      }
    }

    for (let z of resData) {
      if (!selectedSpace?.sp_type && z.sp_type === selectedType) {
        selectedSpace = z;
      }
    }

    const start = checkoutObj.query[checkoutObj.query.length - 1][2];
    const end = checkoutObj.query[checkoutObj.query.length - 1][3];
    const data = [
      groupedSpaces.map((item) => item.space_id),
      selectedSpace.final_price,
      start,
      end,
    ];
    await insertBooking({
      data,
    })
      .unwrap()
      .then((res) => {
        dispatch(
          setRInfo({
            selected_space: {
              prop_address: selectedSpace.prop_address,
              final_price: selectedSpace.final_price,
            },
            query_data: [
              groupedSpaces.map((item) => ({
                space_id: item.space_id,
                space_no: item.space_no,
              })),
              selectedSpace.final_price,
              start,
              end,
            ],
            nav_id: Math.ceil(Math.random() * 250).toString(),
            ...res,
            lat,
            lng,
          }),
        );
        //navigate to new page with bookings table lookup id.
        navigate(`/payment/${res.booking_id}`);
      })
      .catch((e) => {
        console.error(e);
        setEnabled(true);
        if (e.originalStatus === 401) {
          setBookingErr({
            ...BookingErr,
            isErr: true,
            message: "Not Logged in",
          });
        } else if (e.status !== 401) {
          setBookingErr({
            ...BookingErr,
            isErr: true,
            message: "Spot Taken",
          });
        }
      });
  };

  const handleInsertError = () => {
    refetch();
    setBookingErr({ isErr: false, message: "" });
    setEnabled(false);
  };

  return (
    <div className="res-detail-container">
      <>
        {!checkoutObj?.conflict && (
          <>
            <p className="add-cart">Add to Cart</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="res-details-select-label">
                  Select Vehicle Type:
                </label>
                <select
                  className="select-vehicle"
                  value={selectedType}
                  onChange={handleTypeChange}
                  required
                >
                  <option value="" className="select-car-type">
                    Select
                  </option>
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
              {resData.length > 2 && (
                <div className="checkout-options">
                  Two space options available
                </div>
              )}
              <div className="final-add-to-cart">
                <p>
                  Selected Vehicle:{" "}
                  <strong>
                    {selectedType.length
                      ? selectedType[0].toUpperCase() +
                        selectedType.slice(1).toLowerCase()
                      : resData[0].sp_type[0].toUpperCase() +
                        resData[0].sp_type.slice(1).toLowerCase()}
                  </strong>
                </p>
                <p className="res-details-final-price">
                  Final Price: $
                  <strong>
                    {resData.find((item) => item.sp_type === selectedType)
                      ?.final_price || resData[0].final_price}
                  </strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={enabled}
                className={enabled ? "res-detail-btn-n" : "res-detail-btn-g"}
              >
                Go To Payment Details
              </button>
              {enabled &&
                userData?.id &&
                ((roles?.ClientOnly && !roles.Client.bckgr) ||
                  (roles?.Renter && !roles.Client.bckgr)) && (
                  <div className="res-fail-container">
                    <Link to="/admin/confirm-details">
                      Need to confirm your primary address
                    </Link>
                  </div>
                )}
            </form>
            {BookingErr.isErr && (
              <div className="">
                {`${BookingErr.message}, please retry`}
                {BookingErr.message === "Spot Taken" && (
                  <button onClick={handleInsertError}>Retry</button>
                )}
                {BookingErr.message === "Not Logged in" && (
                  <Link to="/login/true"> Login to Book</Link>
                )}
              </div>
            )}
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
    </div>
  );
};

export default ReservationDetails;
