import React from 'react'
import AddressForm from '../Forms/AddressForm'
import { getFormData } from '../../redux/forms/formsSlice';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';

const ConfirmDetails = () => {
    const { userData } = useAuth();
    const formData = useSelector(getFormData);
  return (
    <div><AddressForm userData={userData} formData={formData}/></div>
  )
}

export default ConfirmDetails