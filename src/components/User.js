import UserAction from "../redux/userActions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserInfoQuery } from "../redux/userActions/userApiSlice";

const User = () => {
    const { data, error, isLoading, isFetching, isSuccess } = useGetUserInfoQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    
    return (
      <div>
        <h1>User Information</h1>
        <pre style={{ fontSize: "10px" }}>{JSON.stringify(data, null, 2)}</pre>
        <UserAction />
      </div>
    );
  }

  if (error) {
    return <div>
        <h3>Server Error</h3>
    </div>
  };
};

export default User;
