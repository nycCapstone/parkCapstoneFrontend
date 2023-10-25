import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../redux/roles/rolesSlice";
import FormTitle from "../../redux/forms/FormTitle";
import { formValue } from "../../redux/forms/formsSlice";
import { useSubmitAddressMutation } from "../../redux/forms/formApiSlice";

const AddressForm = (props) => {
  const { formData, userData } = props;
  const roles = useSelector(getRoles);
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
        const [submitAddress] = useSubmitAddressMutation({url: formData.data.URL, address: Object.values(formState).join(" "),
        ClientOnly: formData.data.ClientOnly, method: 'POST'});
        
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
            await submitAddress().unwrap().then(res => navigate('/admin')).catch(err => {
              console.error(err);
              roledispatch(formValue(userData, roles, true));
              setIsLoading(false);
            })
  };

  return (
    <Container>
      <p style={{fontSize: "8px"}}>{JSON.stringify(formData)}  {JSON.stringify(userData)}</p>
      <FormTitle/>
      <div>
        Your current address, click to Confirm.{" "}
        <p
          onClick={submitAddr}
          className="text-underline"
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {Object.values(formState).join(" ")}
        </p>
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
            disabled={formData.data.isFormEnabled}
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            placeholder="Enter city"
            value={formState["1"] || ""}
            onChange={(e) => handleInputChange("1", e.target.value)}
            disabled={formData.data.isFormEnabled}
          />
          <label htmlFor="state">State:</label>
          <input
            type="text"
            placeholder="Enter state"
            value={formState["2"] || ""}
            onChange={(e) => handleInputChange("2", e.target.value)}
            disabled={formData.data.isFormEnabled}
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
    </Container>
  );
};

export default AddressForm;
