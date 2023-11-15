import { useUpdateSingleBookingStatusMutation } from "../../../redux/renter/renterApiSlice";
import { useState } from "react";

const UpdateActivity = ({ bId, Activity, refetch }) => {
  const [updateSingleBookingStatus] = useUpdateSingleBookingStatusMutation();
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState(null);
  const obj = (Activity && Activity?.length) ? Activity.find(item => item.booking_id === bId) : null;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger your API call here based on the value of isChecked
    if (isChecked) {
      updateSingleBookingStatus({
        setRow: { is_occupied: false },
        booking_id: obj?.booking_id,
      })
        .unwrap()
        .then(() => {setSuccess(true); refetch()})
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className="update-a-container">
      {(bId && obj) ? (
        <div className="form-update-b-container">
          <h3>Mark Booking ID: {obj.booking_id} as not occupied</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Toggle Switch
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="switch"></span>
            </label>

            <button type="submit">Commit</button>
          </form>
        </div>
      ) : (
        <div>Select Item to Update</div>
      )}
      <div className="update-status-container">
        {success && <div>Update Made on {bId || ''}</div>}
      </div>
    </div>
  );
};

export default UpdateActivity;
