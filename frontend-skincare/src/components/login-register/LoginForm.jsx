import React, { useState, useContext, useEffect } from "react";
import "../utils/scss/login.scss";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import Loading from "../utils/Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import OtpVerification from "./OtpVerification";

function LoginForm() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpFormData, setOtpFormData] = useState({
    email: "",
    otp: "",
  });

  const { t } = useTranslation();
  const addClass = () => {
    if (!active) setActive(true);
  };
  const removeClass = () => {
    if (active) setActive(false);
  };

  // LOGIN
  const loginState = useContext(GlobalState);
  const [isAdmin] = loginState.userAPI.isAdmin;
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { ...loginFormData },
        { withCredentials: true }
      );
      const token = response.data.accesstoken;
      localStorage.setItem("accessToken", token);

      if (response.data.user.role === 0) {
        window.location.href = "/";
      } else {
        window.location.href = "/admin";
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/register",
        { ...registerFormData },
        { withCredentials: true }
      );
      setOtpFormData({ email: registerFormData.email, otp: "" });
      setOtpStep(true);
      localStorage.setItem("otpStep", "true");
      localStorage.setItem("otpEmail", registerFormData.email);
      toast.success("OTP sent to your email. Please verify.");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpFormData({ ...otpFormData, [name]: value });
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/verifyEmail",
        { ...otpFormData },
        { withCredentials: true }
      );
      const token = response.data.accesstoken;
      localStorage.setItem("accessToken", token);
      toast.success("Email verified successfully!");

      localStorage.removeItem("otpStep");
      localStorage.removeItem("otpEmail");
      setOtpStep(false);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRegister = () => {
    setOtpStep(false);
    localStorage.removeItem("otpStep");
    localStorage.removeItem("otpEmail");
  };

  useEffect(() => {
    const otpStepStored = localStorage.getItem("otpStep");
    const otpEmailStored = localStorage.getItem("otpEmail");
  
    if (otpStepStored === "true" && otpEmailStored) {
      setOtpStep(true);
      setOtpFormData((prev) => ({
        ...prev,
        email: otpEmailStored,
      }));
    }
  }, []);

  return (
    <div className="login-page">
      {loading && <Loading />}
      <ToastContainer />

      {!otpStep ? (
        <div
          className={
            active
              ? "sign-in-form container right-panel-active"
              : "sign-in-form container"
          }
          id="main"
        >
          <div className="register">
            <form onSubmit={handleRegisterSubmit}>
              <h1>{t('label-create-account')}</h1>
              <input
                type="text"
                name="name"
                placeholder={t('label-name')}
                onChange={handleRegisterChange}
                value={registerFormData.name}
              />
              <input
                type="email"
                name="email"
                placeholder={t('label-email')}
                onChange={handleRegisterChange}
                value={registerFormData.email}
              />
              <input
                type="password"
                name="password"
                placeholder={t('label-password')}
                onChange={handleRegisterChange}
                value={registerFormData.password}
              />
              <input
                type="number"
                name="phone"
                placeholder={t('label-phone-number')}
                onChange={handleRegisterChange}
                value={registerFormData.phone}
              />
              <button type="submit" className="btn btn--animated btn--primary--blue btn--border--blue">
                {t('labe-signUp')}
              </button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={handleLoginSubmit}>
              <h1>{t('labe-signIn')}</h1>
              <input
                type="email"
                name="email"
                placeholder={t('label-email')}
                required
                onChange={handleLoginChange}
                value={loginFormData.email}
              />
              <input
                type="password"
                name="password"
                placeholder={t('label-password')}
                onChange={handleLoginChange}
                value={loginFormData.password}
                required
              />
              <button
                className="btn btn--animated btn--primary--blue btn--border--blue"
                type="submit"
              >
                {t('labe-signIn')}
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-left">
                <h1>{t('label-welcome-back')}</h1>
                <button id="login" onClick={removeClass}>
                  {t('labe-signIn')}
                </button>
              </div>
              <div className="overlay-right">
                <h1>{t('label-hello')}</h1>
                <p>{t('label-enter-personal-info')}</p>
                <button id="register" onClick={addClass}>
                  {t('labe-signUp')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OtpVerification handleOtpSubmit={handleOtpSubmit} handleOtpChange={handleOtpChange} otpFormData={otpFormData} handleBackToRegister={handleBackToRegister} t={t} />
      )}
    </div>
  );
}

export default LoginForm;
