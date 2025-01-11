import { useState } from "react";
import ProfileOption from "./ProfileOption";
import { GlobalState } from "../../../GlobalState";
import { useContext } from "react";
import PasswordField from "./PasswordField";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import ErrorPopup from "../../utils/NotFound/PopupError";
import SuccessPopup from "../../utils/NotFound/SuccessPopup";
import { useTranslation } from 'react-i18next';

function MyInfo() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const userDetail = state.userAPI.detail[0];
  const [isEdit, setIsEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [images, setImages] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState(userDetail.name || "");
  const [email, setEmail] = useState(userDetail.email || "");
  const [phone, setPhone] = useState(userDetail.phone || "");
  const [updateError, setUpdateError] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { t } = useTranslation();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const formData = {
          oldPassword,
          newPassword,
          userId: userDetail._id,
        };
        const response = await axios.put(
          "http://localhost:5000/user/changePassword",
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.status === 200) {
          setIsEdit(false);
          setOldPasswordError("");
        }
      }
    } catch (error) {
      setOldPasswordError(error.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return alert('No file selected.');
      }
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) {
        return alert('Image is large. Please try again.');
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return alert('The file is not correct. Please check again.');
      }
      let formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
  
      setImages(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  

  const updateUser = async () => {
    try {
      const fields = [
        { value: name, error: "Please enter your name." },
        { value: email, error: "Please enter your email." },
        { value: phone, error: "Please enter your phone number." },
      ];
      let hasEmptyField = false;
      fields.forEach((field) => {
        if (field.value.trim() === "") {
          setUpdateError(field.error);
          setError(field.error);
          hasEmptyField = true;
        }
      });
      if (!hasEmptyField) {
        if (token) {
          const response = await axios.put(
            "http://localhost:5000/user/infor",
            {
              name: name,
              email: email,
              phone: phone,
              userID: userDetail._id,
              avatar: images ? images : userDetail.avatar,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.status === 200) {
            setIsUpdated(true);
            setUpdateError("");
            setError("");
            setSuccessMessage("User information updated successfully!");
          }
        }
      }
    } catch (error) {
      setUpdateError(error.response.data.msg);
    }
  };
  const handleSuccessPopupClose = () => {
    setSuccessMessage("");
    window.location.reload();
  };

  return (
    <div className="profile">
      <ProfileOption />
      <div className="profile-content user-profile">
        <h2>{t("label-user-info")}</h2>
        <div className="profile-content-item image-user">
          <div className="profile-image">
            <img src={images ? images : userDetail.avatar} alt="user-image" width="150px" />
            <div className="uploadImg">
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleUpload}
              />
              <label htmlFor="file_up" className="upload-img-btn">
                <FaEdit />
              </label>
            </div>
          </div>
        </div>
        <div className="profile-content-item">
          <span className="title">{t("label-name")}</span>
          <input
            type="text"
            className="subtitle"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-content-item">
          <span className="title">{t("label-email")}</span>
          <input
            type="text"
            className="subtitle"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profile-content-item">
          <span className="title">{t("label-password")}</span>
          {isEdit ? (
            <form onSubmit={handlePasswordChange}>
              <PasswordField
                inputName="oldPwd"
                placeholder={t("label-password")}
                autocomplete="current-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <PasswordField
                inputName="newPwd"
                placeholder={t("label-password")}
                autocomplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {oldPasswordError ? (
                <span className="error-message">{oldPasswordError}</span>
              ) : (
                <></>
              )}
              <div className="form-action">
                <button type="submit" className="update-pwd-btn">
                {t("label-change-password")}
                </button>
                <button
                  className="cancel-change-pwd"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  {t("label-cancel")}
                </button>
              </div>
            </form>
          ) : (
            <div className="pwd-contain">
              <span className="subtitle">***********</span>
              <button
                className="update-pwd-btn"
                onClick={() => setIsEdit(true)}
              >
                {t("label-edit-password")}
              </button>
            </div>
          )}
        </div>
        <div className="profile-content-item">
          <span className="title">{t("label-phone-number")}</span>
          <input
            type="text"
            className="subtitle"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="profile-content-item">
          <button className="update-pwd-btn" onClick={updateUser}>
          {t("label-update")}
          </button>
        </div>
        {error && <ErrorPopup errorMessage={error} />}
        {successMessage && (
          <SuccessPopup
            successMessage={successMessage}
            onClose={handleSuccessPopupClose}
          />
        )}
      </div>
    </div>
  );
}

export default MyInfo;
