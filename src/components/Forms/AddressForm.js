import { useState, useReducer } from "react";
import { Container } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import useAuth from "../../hooks/useAuth";

const AddressForm = (props) => {
  const { dispatchRoles } = useAuth();
  const { mode, userData } = props;
  const tempArr =
    mode === "CLIENT"
      ? userData?.address.split(" ")
      : mode === "RENTER"
      ? userData?.renter_address.split(" ")
      : userData?.space_address.split(" ");
  const dataArr = {
    0: tempArr[0],
    1: tempArr[1],
    2: tempArr.slice(2).join(" "),
  };
  const [isFormEnabled, setFormEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/admin";

  const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "RESET":
        return dataArr;
      default:
        return state;
    }
  };
  const [formState, dispatch] = useReducer(formReducer, dataArr);

  const handleInputChange = (field, value) => {
    dispatch({ type: "CHANGE", field, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(formState) === JSON.stringify(dataArr)) return;
    submitAddr();
  };

  const submitAddr = async () => {
    setIsLoading(true);
    const controller = new AbortController();
    try {
      await axiosPrivate.post(
        "/user/update-address",
        {
          address: Object.values(formState).join(" "),
          clientOnly: mode === "CLIENT" ? true : false,
        },
        {
          signal: controller.signal,
        }
      );
      dispatchRoles({ type: `FLIP_${mode}_BCKGR` });
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setFormEnabled(false);
      setIsLoading(false);
    } finally {
      controller.abort();
    }
  };

  return (
    <Container>
      <h3>Confirm your {mode} address.</h3>
      <div>
        Your current address, click to Confirm.{" "}
        <a
          onClick={submitAddr}
          className="text-underline"
          style={{ cursor: "pointer" }}
        >
          {Object.values(formState).join(" ")}
        </a>
      </div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      ) : (
        <form onSubmit={handleSubmit} className="py-0">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            type="text"
            placeholder="Enter street address"
            value={formState["0"] || ""}
            onChange={(e) => handleInputChange("0", e.target.value)}
            disabled={!isFormEnabled}
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            placeholder="Enter city"
            value={formState["1"] || ""}
            onChange={(e) => handleInputChange("1", e.target.value)}
            disabled={!isFormEnabled}
          />
          <label htmlFor="state">State:</label>
          <input
            type="text"
            placeholder="Enter state"
            value={formState["2"] || ""}
            onChange={(e) => handleInputChange("2", e.target.value.split(" "))}
            disabled={!isFormEnabled}
          />
          <button type="submit" disabled={!isFormEnabled}>
            Submit
          </button>
          <button
            type="click"
            disabled={!isFormEnabled}
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </button>
        </form>
      )}
    </Container>
  );
};

export default AddressForm;
