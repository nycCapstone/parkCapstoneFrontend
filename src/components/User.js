import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAction } from "../redux/userActions/userActionSlice";
import { Link } from "react-router-dom"

const User = ({ userData }) => {
  const userActions = useSelector(getAction);


  return (
    <article>
      <h2>Table data List</h2>
      {Object.values(userData)?.length>0 ? (
        <ul>
          {Object.values(userData).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No content to display</p>
      )}
      <ul>
        {userActions?.length > 0 &&
          userActions.map((item, idx) => {
            return userActions.length > 1 && idx > 0 ? (
              <li key={idx}>{item}</li>
            ) : (
              <li key={idx}>
                <Link to="/confirm-details">{item}</Link>
              </li>

            );
          })}
      </ul>
    </article>
  );
};

export default User;
