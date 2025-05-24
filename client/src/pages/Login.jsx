// src/pages/Login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";
import{ useDispatch, useSelector} from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send formData to backend login API
    const response = await axiosInstance.post("/login", formData);
    console.log(response.data);
    if (response.data.status) {
      const token = response.data.result.token;
   dispatch(setUser(response.data.result.user));
      dispatch(loginSuccess(response.data.result));
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(response.data.result.user));
      console.log("Login successful, token saved!");
     console.log("Navigating now...");
navigate("/profile");
console.log("Navigation function called.");

    } else {
      console.error("Login failed:", response.data.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
          Login to WordWave
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
