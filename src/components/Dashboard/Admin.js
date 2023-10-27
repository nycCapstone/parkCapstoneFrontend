import { Link, useNavigate } from "react-router-dom";
import User from "../User";
import { useGetInfoQuery, useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from "../../redux/roles/rolesSlice";
import { setAuth } from "../../redux/auth/authSlice";
import { confirmAddress } from "../../redux/userActions/userActionSlice";
import { formValue } from "../../redux/forms/formsSlice";


const Admin = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//       if (error) {
//           console.error('Error:', error);
//           navigate("/linkpage")
//         }
//     }, [data])
    
    return <section>
      <h1>Admin Page</h1>
        <User/>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
};

export default Admin;
