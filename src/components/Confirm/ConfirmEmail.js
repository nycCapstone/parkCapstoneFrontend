import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../assets/Spinners/Loading";
import axios from "../../api/axios";

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const keyValue = queryParams.get("k");
      if (keyValue) {
        try {
          await axios.put(`/auth/create-user/auth?k=${keyValue}`);
          navigate("/login");
        } catch (e) {
          console.error(e.response.data);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
    return () => [];
  }, []);

  return (
    <div>
      {loading ? (
        <div className="s-loading-container">
          <Loading />
        </div>
      ) : (
        <h3>Api Error</h3>
      )}
    </div>
  );
};

export default ConfirmEmail;
