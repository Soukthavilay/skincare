import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

const Login = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { ...formData },
        { withCredentials: true }
      );
      const token = response.data.accesstoken;
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", token);

      if (isAdmin) {
        window.location.href = "/Admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <button type="submit">Login</button>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </form>
  );
};

export default Login;
