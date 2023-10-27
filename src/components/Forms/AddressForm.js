import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formValue } from "../../redux/forms/formsSlice";
import { useSubmitAddressMutation } from "../../redux/forms/formApiSlice";

const AddressForm = () => {
  const userData = useSelector(state => state.auth);
  const formData = useSelector(state => state.forms);
  const roles = useSelector(state => state.roles);
  let tempArr =
    formData.mode === "client"
      ? userData?.address?.split(" ")
      : formData.mode === "renter"
      ? userData?.renter_address?.split(" ")
      : userData?.space_address?.split(" ");
      if (!tempArr) tempArr = [ 'missing', 'address', 'fill'];
  const dataArr = {
    0: tempArr[0],
    1: tempArr[1],
    2: tempArr.slice(2).join(" "),
  };
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const roledispatch = useDispatch();
  
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
        const [submitAddress] = useSubmitAddressMutation();
        
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
          let url = formData.data.URL;
          let body = {address: Object.values(formState).join(" "), clientOnly: formData.data.ClientOnly}
            await submitAddress({ url, body }).unwrap().then(res => navigate('/admin')).catch(err => {
              console.error(err);
              roledispatch(formValue(userData, roles, true));
              setIsLoading(false);
            })
  };

  return (
    <div>
      <p style={{fontSize: "8px"}}>{JSON.stringify(formData)}  {JSON.stringify(userData)}</p>
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
      {isLoading ? (
        <div>
        <p>Loading.....</p>
        <p>Loading.....</p>
        <p>Loading.....</p>
        <p>Loading.....</p>
      </div>
      ) : (
        <form onSubmit={handleSubmit} 
        className="py-0">
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
};

export default AddressForm;
