import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const User = ({ userData }) => {
  const userActions = useSelector(state => state.actions);

  return (
    <article>
      <h2>Table data List</h2>
      {Object.values(userData)?.length>0 ? (
      <ul>
          <li>{userData.id}</li>
          <li>{userData.email}</li>
          <li>{userData.address}</li>
          <li>{userData.renter_address}</li>
          <li>{userData.client_background_verified}</li>
          <li>{userData.first_name}</li>
          </ul>
          ) 
      : (
        <p>No content to display</p>
      )}
      <ul>
        {userActions?.length > 0 &&
          userActions.map((item, idx) => {
            return userActions.length > 1 && idx > 0 ? (
              <li key={idx}>{item}</li>
            ) : (
              <li key={idx}>
                <Link to="/admin/confirm-details">{item}</Link>
              </li>

            );
          })}
      </ul>
    </article>
  );
};

export default User;
