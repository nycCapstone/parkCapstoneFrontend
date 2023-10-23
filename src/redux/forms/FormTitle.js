import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { getRoles } from "../roles/rolesSlice";

import React from 'react'

const FormTitle = () => {
    const obj = useSelector(getRoles);
    const title = obj.hasOwnProperty("Renter") && obj.Client.bckgr === true ? 'renter' : 'client'
  return (
    <h3>{title} confirmation</h3>
  )
}

export default FormTitle