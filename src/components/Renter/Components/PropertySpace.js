import {
  useGetPropAndSpaceInfoQuery,
  useGetPropertiesQuery,
  useUpdateSingleSpaceMutation,
  usePostNewSpacesMutation,
} from "../../../redux/renter/renterApiSlice";
import { useState, useEffect, useReducer } from "react";
import makeFormData from "../../../constants/reducers/propertyspace";
import RenterLoading from "../../../assets/Spinners/RenterLoading";
import { v4 as uuidv4 } from "uuid";

import "../Styles/SpacesList.css";

const PropertySpace = (props) => {
  const {
    data: spacesData,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPropAndSpaceInfoQuery(props.propertyId);
  const { data: renterData } = useGetPropertiesQuery();
  const [initialArr, setInitialArr] = useState(null);

  const [updateSingleSpace] = useUpdateSingleSpaceMutation();
  const [postNewSpaces] = usePostNewSpacesMutation();

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FORM_DATA":
        return action.payload;
      case "SPACE_SELECT_CHANGE":
        // Update a specific form by its space_no
        return state.map((form, index) => {
          if (action.field === "price" && form.sp_type === action.sp_type) {
            return { ...form, [action.field]: action.payload };
          } else if (
            action.field === "price" &&
            form.sp_type !== action.sp_type
          ) {
            return form;
          } else if (action.field === "sp_type") {
            return index + 1 === action.space_no
              ? {
                  ...form,
                  [action.field]: action.payload,
                  price:
                    state.find((item) => item.sp_type === action.payload)
                      ?.price ?? form.price,
                }
              : form;
          } else if (action.field === "checkbox") {
            return index + 1 === action.space_no
              ? { ...form, [action.field]: action.payload }
              : form;
          }
          return form;
        });
      default:
        return state;
    }
  };

  // Initialize formData with an empty object
  const [formArr, dispatch] = useReducer(formReducer, []);

  useEffect(() => {
    if (renterData && spacesData) {
      const iArr = makeFormData(renterData, spacesData, props.propertyId);
      dispatch({
        type: "SET_FORM_DATA",
        payload: iArr,
      });
      setInitialArr(iArr);
    }
  }, [renterData, spacesData]);

  if (isLoading) {
    return <RenterLoading />;
  }

  if (isError) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    const handleSpaceSelectChange = (e, space_no, sp_type) => {
      e.preventDefault();
      dispatch({
        type: "SPACE_SELECT_CHANGE",
        field: e.target.name,
        payload:
          e.target.name === "checkbox"
            ? !formArr[space_no - 1].checkbox
            : e.target.value,
        space_no,
        sp_type,
      });
    };

    const handleSubmit = async (e, i) => {
      e.preventDefault();

      if (
        formArr[i]?.space_id &&
        JSON.stringify(formArr[i]) !== JSON.stringify(initialArr[i])
      ) {
        await updateSingleSpace({
          spaceIds: formArr
            .filter((item) => item.sp_type === formArr[i].sp_type)
            .map((item) => item.space_id),
          setRow: {
            sp_type: formArr[i].sp_type,
            price: formArr[i].price,
          },
        })
          .unwrap()
          .then(() => {
            alert("The details for the parking spot has been saved!");
            refetch();
          })
          .catch((e) => console.error(e));
      } else if (
        formArr[i]?.submit_details &&
        formArr.some((item) => item?.checkbox === true)
      ) {
        let temp = formArr.filter(
          (item) =>
            !item.hasOwnProperty("submit_details") && item?.checkbox === true,
        );

        await postNewSpaces({
          data: temp.map((item, i) => {
            delete item["checkbox"];
            delete item["billing"];
            return {
              ...item,
              space_owner_id: renterData[0].owner_id,
              property_lookup_id: props.propertyId,
            };
          }),
        })
          .unwrap()
          .then(() => {
            alert("The details for the parking spot has been saved!");
            refetch();
          })
          .catch((e) => console.error(e));
      }
    };

    return (
      <div className="property-space">
        {formArr.length > 0 &&
          formArr.map((item, i) => {
            if (!item.hasOwnProperty("submit_details")) {
              return (
                <form
                  className="property-space-form"
                  onSubmit={(e) => handleSubmit(e, i)}
                  key={uuidv4()}
                >
                  <div className="r-sp-info">
                    <p>Space Number: {item.space_no}</p>
                    {item?.space_id && <p>Space ID: {item.space_id}</p>}

                    {item?.space_id && (
                      <p>Occupied: {item.occupied ? "Yes" : "No"}</p>
                    )}
                    <div className="cost-info">
                      <label htmlFor="price">
                        Price/{item.billing}(min:$15):
                      </label>
                      <input
                        className="pricePerDay"
                        type="number"
                        id="price"
                        name="price"
                        value={formArr[i].price}
                        onChange={(e) =>
                          handleSpaceSelectChange(
                            e,
                            item.space_no,
                            item.sp_type,
                          )
                        }
                        min={15}
                        max={300}
                        step="5"
                      />
                    </div>
                    <div>
                      <label htmlFor="sp_type">Space Type:</label>
                      <select
                        className="property-space-select"
                        id="sp_type"
                        name="sp_type"
                        value={formArr[i].sp_type}
                        onChange={(e) =>
                          handleSpaceSelectChange(e, item.space_no)
                        }
                      >
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                      </select>
                    </div>
                    {!item?.space_id && (
                      <div className="save-details">
                        <input
                          type="checkbox"
                          id="checkbox"
                          name="checkbox"
                          onChange={(e) =>
                            handleSpaceSelectChange(e, item.space_no)
                          }
                          checked={formArr[i].checkbox}
                        />
                        <label htmlFor="checkbox">Save Details</label>
                      </div>
                    )}
                    {item?.space_id && (
                      <button className="property-space-button" type="submit">
                        Update Details
                      </button>
                    )}
                  </div>
                </form>
              );
            } else
              return (
                <div key={uuidv4()} className="property-space-submit">
                  <button
                    className="property-space-button"
                    type="click"
                    onClick={(e) => handleSubmit(e, i)}
                  >
                    Submit Details
                  </button>
                </div>
              );
          })}
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default PropertySpace;
