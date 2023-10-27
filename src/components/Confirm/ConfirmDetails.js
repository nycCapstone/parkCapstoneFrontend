import React from 'react'
import AddressForm from '../Forms/AddressForm'
import { getFormData } from '../../redux/forms/formsSlice';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/auth/authSlice';

const ConfirmDetails = () => {
    const userData = useSelector(state => state.auth);
    const formData = useSelector(state => state.forms);
  return (
    <section><AddressForm userData={() => {delete userData['roles']; return userData}} formData={formData}/></section>
  )
}

export default ConfirmDetails