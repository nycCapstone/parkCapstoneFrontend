import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSubmitPropertyMutation } from "../../redux/renter/renterApiSlice";
import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";

const PropertyForm = () => {
  const { data: userData, isLoading, isSuccess, error } = useGetUserInfoQuery();
  const [placesLibrary, setPlacesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const { refetch } = useGetPropertiesQuery();
  const [submitProperty] = useSubmitPropertyMutation();
  const [searchResult, setSearchResult] = useState("Result: none");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [proceed, setProceed] = useState(true);

  const initialValues = {
    zip: "",
    number_spaces: 1,
    billing_type: "fixed",
    picture: "",
  };

  const validationSchema = Yup.object().shape({
    zip: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, `Must match ${zipCode || 'input location'}`)
      .required(
        `confirm zipcode is ${zipCode || "the result from google maps"}`
      ),
    number_spaces: Yup.number()
      .min(1, "Minimum 1 space")
      .max(10, "Maximum 10 spaces")
      .required("Number of spaces is required"),
    picture: Yup.string()
      .url("Invalid URL")
      .notRequired() // Make imageUrl optional
      .nullable(),
    billing_type: Yup.string().oneOf(
      ["fixed", "hourly"],
      "Invalid billing type"
    ),
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const fA = place.formatted_address;

      if (
        place?.address_components?.some((item) => {
          let c = item;
          if (item?.types?.includes("postal_code")) {
            c = c?.long_name || c?.short_name;
            setZipCode(c);
            setProceed(false);
            return true;
          } else {
            setProceed(true);
            return false;
          }
        })
      ) {
        setFormattedAddress(fA);
      }
    } else {
      alert("Please enter text");
    }
  }

  if (isLoading || !isLoaded) {
    return (
      <div>
        <p>....Loading</p>
        <p>....Loading</p>
        <p>....Loading</p>
        <p>....Loading</p>
      </div>
    );
  }

  if (isSuccess && isLoaded) {
    return (
      <div>
        <h2>Please Enter the Property Location</h2>
        <div style={{ marginTop: "1em" }}>
          <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
            <input
              type="text"
              placeholder={userData?.renter_address}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `400px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </Autocomplete>
        </div>
        <br />
        <h2>Property Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (formattedAddress.length < 8) return;
            if (zipCode && values.zip !== zipCode) return;
            try {
              await submitProperty({
                ...values,
                owner_id: userData.id,
                prop_address: formattedAddress,
              });
            } catch (e) {
              console.error(e);
            } finally {
              refetch();
            }
          }}
        >
          {() => (
            <Form>
              <div>
                <label htmlFor="zip">ZIP Code:</label>
                <Field
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder={zipCode || ""}
                />
                <ErrorMessage name="zip" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="number_spaces">Number of Spaces:</label>
                <Field as="select" id="number_spaces" name="number_spaces">
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="number_spaces"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor="picture">Image URL:</label>
                <Field
                  type="text"
                  id="picture"
                  name="picture"
                  placeholder="optional"
                />
                <ErrorMessage
                  name="picture"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label>Billing Type:</label>
                <div role="group" aria-labelledby="billing_type">
                  <label>
                    <Field type="radio" name="billing_type" value="fixed" />
                    Fixed
                  </label>
                  <label>
                    <Field type="radio" name="billing_type" value="hourly" />
                    Hourly
                  </label>
                </div>
                <ErrorMessage
                  name="billing_type"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <button type="submit" disabled={proceed}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>no form data</p>
      </div>
    );
  }
};

export default PropertyForm;
