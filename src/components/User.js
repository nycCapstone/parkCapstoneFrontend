import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAction } from "../redux/userActions/userActionSlice";

const User = ({ userData }) => {
  const navigate = useNavigate();
  const userActions = useSelector(getAction);

  return (
    <article>
      <h2>Table data List</h2>
      {Object.values(userData)?.length ? (
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
              <li
                key={idx}
                style={{ color: "green" }}
                onClick={() => navigate("confirm-details")}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </article>
  );
};

export default User;
