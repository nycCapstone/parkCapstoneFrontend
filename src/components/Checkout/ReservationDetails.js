import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { reservationData } from "../../constants/helper/helper";

const ReservationDetails = ({ checkoutData, userData }) => {
  const checkoutObj = useSelector((state) => state.checkout);
  const [loading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");

  const resData = reservationData(checkoutData, checkoutObj);
  const selectedSpace = resData?.find(
    (space) => space.sp_type === selectedType
  );
  const mapLength = resData?.length > 2 ? 2 : 1;

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
                    <select value={selectedType} onChange={handleTypeChange}>
                      <option value="">Select</option>
                      {resData.slice(0, mapLength).map((item, idx) => {
                        return (
                          <option key={idx} value={item.sp_type}>
                            {item.sp_type}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {selectedSpace && (
                    <div>
                      <p>Selected Vehicle: {selectedType}</p>
                      <p>Final Price: ${selectedSpace.final_price}</p>
                    </div>
                  )}

                  <button type="submit">Confirm Order</button>
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
