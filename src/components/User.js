import UserAction from "../redux/userActions/UserAction";
import { useSelector } from "react-redux";

const User = () => {
  const data = useSelector((state) => state.auth);

  if (!data?.email) {
    return <div>Loading...</div>;
  }
  if (data?.email) {
    return (
      <div>
        <h1>User Information</h1>
        <pre style={{ fontSize: "10px" }}>{JSON.stringify(data, null, 2)}</pre>
        <UserAction data={data} />
      </div>
    );
  }

  return null;
};

export default User;
