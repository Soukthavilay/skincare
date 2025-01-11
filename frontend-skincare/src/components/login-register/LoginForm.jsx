import React, { useState, useContext } from "react";
import "../utils/scss/login.scss";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import Loading from "../utils/Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
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
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", token);

      if (response.data.user.role === 0) {
        window.location.href = "/";
      } else {
        window.location.href = "admin/statistical";
      }
    } catch (error) {
      toast.error(error.response.data.msg); // Display error message in ToastContainer
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const registerState = useContext(GlobalState);
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
      const token = response.data.accesstoken;
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", token);
      setRegisterSuccess(true);

      if (response.data.newUser.role === 1) {
        window.location.href = "/admin/statistical";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.response.data.msg); // Display error message in ToastContainer
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {loading && <Loading />}
      <ToastContainer /> {/* Render the ToastContainer for displaying error messages */}
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
    </div>
  );
}

export default LoginForm;
