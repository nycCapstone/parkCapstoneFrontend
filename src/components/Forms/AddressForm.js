import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useState, useEffect, useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSubmitAddressMutation } from "../../redux/forms/formApiSlice";
import { makeFormData } from "../../constants/reducers/addressform";

const AddressForm = () => {
  const {
    data: userData,
    isLoading,
    error,
    isSuccess,
    refetch,
  } = useGetUserInfoQuery();
  const [formIsLoading, setformIsLoading] = useState(false);
  const navigate = useNavigate();

  const [submitAddress] = useSubmitAddressMutation();

  const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "SET_FORM_DATA":
        return action.data;
      case "RESET":
        return makeFormData(userData, true)[1];
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, {});

  useEffect(() => {
    if (userData) {
      dispatch({
        type: "SET_FORM_DATA",
        data: makeFormData(userData, false)[1],
      });
    }
  }, [userData]);

  if (isLoading) {
    return (
      <div>
        <p>Loading.....</p>
        <p>Loading.....</p>
        <p>Loading.....</p>
        <p>Loading.....</p>
        <p>Loading.....</p>
        <p>Loading.....</p>
      </div>
    );
  }
  if (isSuccess) {
    if (userData?.all_is_auth) {
      return (
        <div>
          <h2>no need to confirm address at this time</h2>
          <Link to="/admin">Dashboard</Link>
        </div>
      );
    }
    const [formData, dataArr] = makeFormData(userData, false);

    const handleInputChange = (field, value) => {
      dispatch({ type: "CHANGE", field, value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (JSON.stringify(formState) === JSON.stringify(dataArr)) return;
      submitAddr();
    };

    const submitAddr = async () => {
      setformIsLoading(true);
      let url = formData.data.URL;
      let body = {
        address: Object.values(formState).join(" "),
        clientOnly: formData.data.ClientOnly,
      };
      await submitAddress({ url, body })
        .unwrap()
        .then((res) => {
          refetch();
          navigate("/admin");
        })
        .catch((err) => {
          console.error(err);
          setformIsLoading(false);
        });
    };

    return (
      <div>
        <p style={{ fontSize: "8px" }}>
          {JSON.stringify(formData)} {JSON.stringify(userData)}
        </p>
        <h3>{formData.mode} confirmation</h3>
        <div>
          Your current address, click to Confirm.{" "}
          <p
            onClick={() => submitAddr()}
            className="text-underline"
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {Object.values(formState).join(" ")}
          </p>
        </div>
        {formIsLoading ? (
          <div>
            <p>Loading.....</p>
            <p>Loading.....</p>
            <p>Loading.....</p>
            <p>Loading.....</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-0">
            <label htmlFor="streetAddress">Street Address:</label>
            <input
              type="text"
              placeholder="Enter street address"
              value={formState["0"] || ""}
              onChange={(e) => handleInputChange("0", e.target.value)}
              disabled={formData.data.isFormEnabled}
              id="streetAddress"
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              placeholder="Enter city"
              value={formState["1"] || ""}
              onChange={(e) => handleInputChange("1", e.target.value)}
              disabled={formData.data.isFormEnabled}
              id="city"
            />
            <label htmlFor="state">State:</label>
            <input
              type="text"
              placeholder="Enter state"
              value={formState["2"] || ""}
              onChange={(e) => handleInputChange("2", e.target.value)}
              disabled={formData.data.isFormEnabled}
              id="state"
            />
            <button type="submit" disabled={formData.data.isFormEnabled}>
              Submit
            </button>
            <button
              type="click"
              disabled={formData.data.isFormEnabled}
              onClick={() => dispatch({ type: "RESET" })}
            >
              Reset
            </button>
          </form>
        )}
      </div>
    );
  }
  if (error) {
    navigate("/admin");
  }
};

export default AddressForm;
