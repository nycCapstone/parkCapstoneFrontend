import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSubmitAddressMutation } from "../../redux/forms/formApiSlice";
import { makeFormData } from "../../constants/reducers/addressform";

const AddressForm = () => {
  const [placesLibrary, setPlacesLibrary] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
    libraries: placesLibrary,
  });
  const {
    data: userData,
    isLoading,
    error,
    isSuccess,
    refetch,
  } = useGetUserInfoQuery();
  const [formIsLoading, setformIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("Result: none");
  const [formattedAddress, setFormattedAddress] = useState("");

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }
  const [submitAddress] = useSubmitAddressMutation();
  const navigate = useNavigate();

  if (isLoading || !isLoaded) {
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
  if (isSuccess && isLoaded) {
    if (userData?.all_is_auth) {
      return (
        <div>
          <h2>no need to confirm address at this time</h2>
          <Link to="/admin">Dashboard</Link>
        </div>
      );
    }
    const [formData, dataString] = makeFormData(userData, false);

    function onPlaceChanged() {
      if (searchResult != null) {
        const place = searchResult.getPlace();
        const fA = place.formatted_address;

        if (
          place?.address_components?.some((item) =>
            item?.types?.includes("postal_code")
          )
        ) {
          setFormattedAddress(fA);
        }

        console.log(`Formatted Address: ${fA}`);
      } else {
        alert("Please enter text");
      }
    }

    const submitAddr = async () => {
      if (formattedAddress.length < 8) return;
      setformIsLoading(true);
      const url = formData.data.URL;
      let body = {
        address: formattedAddress,
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
        })
        .finally((f) => setformIsLoading(false));
    };

    return (
      <div>
        <h3>{formData.mode} confirmation</h3>
        <p>Sign up address: {dataString}</p>
        <div>
          Your formatted address, click to Confirm.{" "}
          <p
            onClick={() => submitAddr()}
            className="text-underline"
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {formattedAddress?.length < 3
              ? "type in an address with zipcode"
              : formattedAddress}
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
          <>
            <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
              <input
                type="text"
                placeholder={dataString}
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
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
            <button onClick={submitAddr}>Submit Address</button>
          </>
        )}
      </div>
    );
  }
  if (error) {
    <div>
      Server Error.
      <Link to="/admin">Back</Link>
    </div>;
  }
};

export default AddressForm;
