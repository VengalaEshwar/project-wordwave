// src/pages/Signup.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, profileImage: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, profileImage: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // send formData to backend with multipart/form-data
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full border-2 border-dashed border-indigo-400 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-indigo-50 transition"
          onClick={() => fileInputRef.current.click()}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
          ) : (
            <p className="text-gray-500">Drag and drop profile image here or click to upload</p>
          )}
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
};

export default Signup;
