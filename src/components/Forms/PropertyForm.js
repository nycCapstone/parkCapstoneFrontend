import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSubmitPropertyMutation } from "../../redux/renter/renterApiSlice";
import { useGetPropertiesQuery } from "../../redux/renter/renterApiSlice";

const PropertyForm = () => {
  const { data: userData, isLoading, isSuccess, error } = useGetUserInfoQuery();
  const { refetch } = useGetPropertiesQuery();
  const [submitProperty] = useSubmitPropertyMutation();

  const initialValues = {
    prop_address: "",
    zip: "",
    number_spaces: 1,
    billing_type: "fixed",
    picture: "",
  };

  const validationSchema = Yup.object().shape({
    prop_address: Yup.string()
      .matches(/^(\d+) (.+?), (.+?)$/, "123 Main St, New York")
      .required("Address is required"),
    zip: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code")
      .required("ZIP code is required"),
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

  if (isLoading) {
    return (
      <div>
        <p>....Loading</p>
        <p>....Loading</p>
        <p>....Loading</p>
        <p>....Loading</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <h2>Property Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await submitProperty({
                ...values,
                owner_id: userData.id,
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
                <label htmlFor="prop_address">Address:</label>
                <Field type="text" id="prop_address" name="prop_address" />
                <ErrorMessage
                  name="prop_address"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor="zip">ZIP Code:</label>
                <Field type="text" id="zip" name="zip" />
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
                <button type="submit">Submit</button>
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
