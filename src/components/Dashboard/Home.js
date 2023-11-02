import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";

const Home = () => {
  const { data: userData, isSuccess, isLoading, error } = useGetUserInfoQuery();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div>
        <p>...Loading</p>
        <p>...Loading</p>
        <p>...Loading</p>
        <p>...Loading</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <section>
        <h1>Home</h1>
        <br />
        {userData?.email && <p>{userData?.email}</p>}

        <br />
        <Link to="/client">Go to the Client page</Link>
        <br />
        <Link to="/renter">Go to the Renter</Link>
        <br />
        <Link to="/admin">Go to the Admin page</Link>
        <br />
        <Link to="/go">Go to the link page</Link>
        <div className="flexGrow">
          <button onClick={signOut}>Sign Out</button>
        </div>
      </section>
    );
  }

  if (error) {
    <div>Server Error</div>
  }
};

export default Home;
