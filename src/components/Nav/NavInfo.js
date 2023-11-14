import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { Link } from "react-router-dom";
import Loading from "../../assets/Spinners/Loading";

const NavInfo = () => {
  const {
    data: userInfo,
    isSuccess,
    isLoading,
    error,
    isUninitialized,
  } = useGetUserInfoQuery();

  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <Link to="/admin" className="nav-link">
        Hi {userInfo.first_name}!
      </Link>
    );
  }

  if (error || isUninitialized) {
    return (
      <Link className="log-in" to="/login">
        Login
      </Link>
    );
  }
};

export default NavInfo;
