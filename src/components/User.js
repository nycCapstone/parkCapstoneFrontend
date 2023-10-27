import { useGetUserInfoQuery } from "../redux/userActions/userApiSlice";
import UserAction from "../redux/userActions/UserAction";

const User = () => {
  const { data, isLoading, isSuccess, error } = useGetUserInfoQuery();

  if (isLoading && !data?.email) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data?.email) {

    return (
      <div>
        <h1>User Information</h1>
        <pre style={{fontSize: "10px"}}>{JSON.stringify(data, null, 2)}</pre>
        <UserAction data={data}/>

      </div>
    );
  }

  return null;

};

export default User;
