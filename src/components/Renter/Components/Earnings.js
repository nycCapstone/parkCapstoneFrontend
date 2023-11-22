import { useGetEarningsByOwnerIdQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import RenterLoading from "../../../assets/Spinners/RenterLoading";

const Earnings = () => {
    const { data: earningsData, isLoading, isSuccess, error, refetch } = useGetEarningsByOwnerIdQuery();
    const { data: userData } = useGetUserInfoQuery();

    useEffect(() => {
        if (isSuccess) {
            if (userData?.id !== earningsData[0]?.owner_id) {
             refetch();
            }
        }
     }, [])
    

    if (isLoading) {
        return <RenterLoading/>
    }

    if (isSuccess) {
        return <>
            <a>
                {
                    earningsData[0]?.sum
                    ?
                    <span>
                    Your Earnings{" "}
                    {earningsData[0].sum}
                    </span>
                    :
                    <>
                    No Earnings Yet
                    </>
                }
            </a>
        </>
    }

    if (error) {
        return <div>Api Down</div>
    }

}

export default Earnings