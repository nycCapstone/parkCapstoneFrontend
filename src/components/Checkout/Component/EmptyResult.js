import { useEffect, useState } from "react";
import "../Styles/Notifications.css";

const EmptyResult = ({ infoPrompt }) => {

    const [show, setShow] = useState(null)

useEffect(() => {
  if (infoPrompt) {
    setShow(true)
  } 

}, [infoPrompt])

if (show) {

    return (
      <div>
        <div className="reservation-square reservation-primary">
          Sorry no spots available at {new Date(infoPrompt).toLocaleDateString()} {new Date(infoPrompt).toLocaleTimeString()}
        </div>
      </div>
    );
} else {
    return null;
}

};

export default EmptyResult;
