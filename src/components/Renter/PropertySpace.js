import {
  useGetPropAndSpaceInfoQuery,
  useGetPropertiesQuery,
  useUpdateSingleSpaceMutation,
  usePostNewSpacesMutation,
} from "../../redux/renter/renterApiSlice";
import { useState, useEffect, useReducer } from "react";
import makeFormData from "../../constants/reducers/propertyspace";
import { v4 as uuidv4 } from "uuid";
import "./Styles/SpacesList.css";

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
        return state.map((form, index) =>
          index + 1 === action.space_no
            ? { ...form, [action.field]: action.payload }
            : form
        );
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
    return (
      <div>
        <p>...Loading</p>
        <p>...Loading</p>
        <p>...Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    const handleSpaceSelectChange = (e, space_no) => {
      dispatch({
        type: "SPACE_SELECT_CHANGE",
        field: e.target.name,
        payload:
          e.target.name === "checkbox"
            ? !formArr[space_no - 1].checkbox
            : e.target.value,
        space_no,
      });
    };

    const handleSubmit = async (e, i) => {
      e.preventDefault();
      if (
        formArr[i]?.space_id &&
        JSON.stringify(formArr[i]) !== JSON.stringify(initialArr[i])
      ) {
        await updateSingleSpace({
          space_id: formArr[i].space_id,
          setRow: {
            sp_type: formArr[i].sp_type,
            price: formArr[i].price,
          },
        })
          .unwrap()
          .then((res) => {
            refetch();
          })
          .catch((e) => console.error(e));
      } else if (
        formArr[i]?.submit_details &&
        formArr.some((item) => item?.checkbox === true)
      ) {
        let temp = formArr.filter(
          (item) =>
            !item.hasOwnProperty("submit_details") && item?.checkbox === true
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
          .then(() => refetch())
          .catch((e) => console.error(e));
      }
      console.log("Submitted Space Type:", formArr);
    };

    return (
      <div>
        <div className="r-sp-reslist">
          {formArr.length > 0 &&
            formArr.map((item, i) => {
              if (!item.hasOwnProperty("submit_details")) {
                return (
                  <div key={uuidv4()}>
                    <form onSubmit={(e) => handleSubmit(e, i)}>
                      <div className="r-sp-info">
                        <p>
                          Space Number{"(location on lot)"}: {item.space_no}
                        </p>
                        {item?.space_id && (
                          <p style={{ fontSize: "0.75rem" }}>
                            Space ID: {item.space_id}
                          </p>
                        )}
                        <div>
                          <label htmlFor="sp_type">Space Type:</label>
                          <select
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
                        {item?.space_id && (
                          <p>Occupied: {item.occupied ? "Yes" : "No"}</p>
                        )}
                        <div className="cost-info">
                          <div>
                            <label htmlFor="price">
                              Price (15 - 300) per {item.billing}:
                            </label>
                            <input
                              type="number"
                              id="price"
                              name="price"
                              value={formArr[i].price}
                              onChange={(e) =>
                                handleSpaceSelectChange(e, item.space_no)
                              }
                              min={10}
                              max={300}
                              step="5"
                            />
                          </div>
                        </div>
                        {!item?.space_id && (
                          <div className="saveCheck">
                            <input
                              type="checkbox"
                              id="checkbox"
                              name="checkbox"
                              onChange={(e) =>
                                handleSpaceSelectChange(e, item.space_no)
                              }
                              checked={formArr[i].checkbox}
                            />
                            <label htmlFor="checkbox">save details</label>
                          </div>
                        )}
                        {item?.space_id && (
                          <button type="submit">update details</button>
                        )}
                      </div>
                    </form>
                  </div>
                );
              } else
                return (
                  <div className="spot-info" key={uuidv4()}>
                    <button type="click" onClick={(e) => handleSubmit(e, i)}>
                      submit details
                    </button>
                  </div>
                );
            })}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>
  }
};

export default PropertySpace;
