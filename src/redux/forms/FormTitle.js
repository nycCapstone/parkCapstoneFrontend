import { useSelector } from "react-redux/es/hooks/useSelector";
import { getFormData } from "./formsSlice";

const FormTitle = () => {
    const form = useSelector(getFormData);
  return (
    <h3>{form.mode} confirmation</h3>
  )
}

export default FormTitle