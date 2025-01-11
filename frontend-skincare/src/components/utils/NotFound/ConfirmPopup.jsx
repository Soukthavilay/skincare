import React, { useState } from "react";
import '../scss/utilsCss/successCSS.scss'

const SuccessPopup = ({ isOpen, onClose, onConfirm }) => {
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
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-buttons">
            <button className="close-button" onClick={onConfirm}>Confirm</button>
            
            <button className="close-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
