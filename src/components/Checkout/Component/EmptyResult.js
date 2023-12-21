import { useSelector } from "react-redux";
import "../Styles/Notifications.css";

const EmptyResult = () => {
  const infoPrompt = useSelector((state) => state.changeTime.infoPrompt);

  if (infoPrompt) {
    return (
      <div className="reservation-square reservation-primary">
        Sorry no spots available at {new Date(infoPrompt).toLocaleDateString()}{" "}
        {new Date(infoPrompt).toLocaleTimeString()}
      </div>
    );
  } else {
    return null;
  }
};

export default EmptyResult;
