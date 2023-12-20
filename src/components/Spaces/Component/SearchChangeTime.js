// Modal.js
import ChangeTime from "../../Checkout/Component/ChangeTime";
import "./Modal.css"; // Import the styles

const SearchChangeTime = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <p>
          No spaces left at the chosen time block, please try a different time.
        </p>
        <ChangeTime />
      </div>
    </div>
  );
};

export default SearchChangeTime;
