import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";

function PasswordField({ inputName, placeholder,autocomplete,value,onChange }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="form-group">
      <input
        type={!passwordShown ? "password" : "text"}
        name={inputName}
        placeholder={placeholder ? placeholder : "Enter your password"}
        autoComplete={autocomplete ? autocomplete : ""}
        value={value ? value : ""}
        onChange={onChange ? onChange : ""}
      />
      <span className="pwd-icon" onClick={togglePassword}>
        {passwordShown ? <AiOutlineEye /> : <FaRegEyeSlash/>}
      </span>
    </div>
  );
}

export default PasswordField;
