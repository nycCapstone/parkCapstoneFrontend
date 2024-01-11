import { useUpdateSingleBookingStatusMutation } from "../../../redux/renter/renterApiSlice";
import { useState } from "react";
import "../Styles/RenterActivity.css";
const UpdateActivity = ({ bId, setShowUpdateActivity, Activity, refetch }) => {
  const [updateSingleBookingStatus] = useUpdateSingleBookingStatusMutation();
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState(null);
  const obj =
    Activity && Activity?.length
      ? Activity.find((item) => item.booking_id === bId)
      : null;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger your API call here based on the value of isChecked
    if (isChecked) {
      setShowUpdateActivity(null);
      updateSingleBookingStatus({
        setRow: { is_occupied: false },
        booking_id: obj?.booking_id,
      })
        .unwrap()
        .then(() => {
          setSuccess(true);
          setIsChecked(false);
          refetch();
        })
        .catch((e) => console.error(e));
    }
    alert(`Update made on Booking Id ${bId}`);
  };
  console.log();

  return (
    <div className="update-a-container">
      {bId && obj && (
        <div className="form-update-b-container">
          <form onSubmit={handleSubmit}>
            <div className="update-NotOccupied">
              <div className="update-check-container">
                <strong className="update-check-label">
                  Mark spot as unoccupied
                </strong>
                <input
                  className="mark-here-checkbox"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>

              <button type="submit" className="commit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="update-status-container">
        {success && <div>Update Made on {bId || ""}</div>}
      </div>
    </div>
  );
};

export default UpdateActivity;
