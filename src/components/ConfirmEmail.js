import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../api/axios';

function ConfirmEmail() {

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    //`http://localhost:3001/users/create-user/auth?k=${jwtToken}`

    useEffect(() => {
        // Access and read the 'k' query parameter
        const keyValue = queryParams.get('k');
        if (keyValue) {
          // Do something with the 'k' query parameter value
          axios.get(`/auth/create-user/auth?k=${keyValue}`).then(res => {
            console.log(res.data);
            navigate("/login")
          }).catch(e => console.log(e.response.data)); setLoading(false);
        }
      }, [queryParams]);
  return (
    <div>{loading ? <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner> : <h3>Api Error</h3>}</div>
  )
}

export default ConfirmEmail