import { useSelector } from "react-redux/es/hooks/useSelector";
import { getFormData } from "./formsSlice";

const FormTitle = () => {
    const { mode } = useSelector(getFormData);
  return (
    <h3>{mode} confirmation</h3>
  )
}

export default FormTitle