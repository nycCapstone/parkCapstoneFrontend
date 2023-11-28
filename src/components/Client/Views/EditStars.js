import { useUpdateSingleBookingStatusMutation } from "../../../redux/renter/renterApiSlice";
import RenterLoading from "../../../assets/Spinners/RenterLoading";
import { useState } from "react";
import "../Styles/EditStars.css";

const EditStars = ({ booking, setShow, refetch }) => {
  const [updateSingleBookingStatus] = useUpdateSingleBookingStatusMutation();
  const [loading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (booking.rating !== +e.target.value) {
      updateSingleBookingStatus({
        setRow: { rating: e.target.value },
        booking_id: booking.booking_id,
      })
        .unwrap()
        .then(() => {
          refetch();
        })
        .catch((e) => console.error(e))
        .finally(() => {
          setShow(null);
          setIsLoading(false);
        });
    } else if (booking.rating === +e.target.value) {
      setTimeout(() => {
        setShow(null);
        setIsLoading(false);
      }, 1300);
    }
  };

  return (
    <>
      {loading ? (
        <RenterLoading />
      ) : (
        <div className="rate">
          <input
            type="radio"
            id="star5"
            name="rate"
            value="5"
            onClick={handleClick}
          />
          <label htmlFor="star5" title="text">
            5 stars
          </label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onClick={handleClick}
          />
          <label htmlFor="star4" title="text">
            4 stars
          </label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onClick={handleClick}
          />
          <label htmlFor="star3" title="text">
            3 stars
          </label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onClick={handleClick}
          />
          <label htmlFor="star2" title="text">
            2 stars
          </label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            onClick={handleClick}
          />
          <label htmlFor="star1" title="text">
            1 star
          </label>
        </div>
      )}
    </>
  );
};

export default EditStars;
