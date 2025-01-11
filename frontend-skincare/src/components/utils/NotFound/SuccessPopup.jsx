import React, { useState } from "react";
import '../scss/utilsCss/successCSS.scss'

const SuccessPopup = ({ successMessage, onClose }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const handleClose = () => {
        setShowSuccessModal(false);
        if (onClose) {
          onClose();
        }
      };
  return (
    <div className="success-popup">
      <div className="success-popup-content">
        <h3>Notification</h3>
        <p>{successMessage}</p>
        <button className="close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
