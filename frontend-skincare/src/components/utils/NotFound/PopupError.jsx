import React from "react";

const ErrorPopup = ({ errorMessage, onClose }) => {
//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     }
//   };

  return (
    <div className="error-popup">
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default ErrorPopup;
