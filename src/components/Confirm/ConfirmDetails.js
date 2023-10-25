import React from 'react'
import AddressForm from '../Forms/AddressForm'
import { getFormData } from '../../redux/forms/formsSlice';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/auth/authSlice';

const ConfirmDetails = () => {
    const userData = useSelector(getAuth);
    const formData = useSelector(getFormData);
  return (
    <section><AddressForm userData={userData} formData={formData}/></section>
  )
}

export default ConfirmDetails