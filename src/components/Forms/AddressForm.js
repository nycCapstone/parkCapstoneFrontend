import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSubmitAddressMutation } from "../../redux/forms/formApiSlice";
import { makeFormData } from "../../constants/reducers/addressform";
import Loading from "../../assets/Spinners/Loading";
import "./Styles/AddressForm.css";
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
    return <Loading />;
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
        //confirmed addresses must include zipcode
        if (
          place?.address_components?.some((item) =>
            item?.types?.includes("postal_code"),
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
        .then(() => {
          refetch();
          navigate("/admin");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setformIsLoading(false));
    };

    return (
      <section class="address-form-container">
        <div class="address-form-header">
          <h3>Confirm Your Address</h3>
        </div>
        <div class="address-form-signup-address">
          <p>Sign up address: {dataString}</p>
        </div>
        <div class="address-form-confirm">
          <p> Please confirm your address </p>
        </div>
        <div class="address-form-formatted">
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
          <div className="s-loading-container" style={{ height: "5rem" }}>
            <Loading />
          </div>
        ) : (
          <>
            <div class="address-form-input">
              <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                <input
                  type="text"
                  placeholder={dataString}
                  class="address-form-input-box"
                />
              </Autocomplete>
            </div>
            <button class="address-form-submit" onClick={submitAddr}>
              Submit Address
            </button>
          </>
        )}
      </section>
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
