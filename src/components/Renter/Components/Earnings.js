import { useGetEarningsByOwnerIdQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import Loading from "../../../assets/Spinners/Loading";

const Earnings = () => {
  const {
    data: earningsData,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetEarningsByOwnerIdQuery();
  const { data: userData } = useGetUserInfoQuery();

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== earningsData[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <>
        <a>
          {earningsData[0]?.sum ? (
            <span>Total Earnings ${earningsData[0].sum.toFixed(2)}</span>
          ) : (
            <>No Earnings Yet</>
          )}
        </a>
      </>
    );
  }

  if (error) {
    return <div>001</div>;
  }
};

export default Earnings;
