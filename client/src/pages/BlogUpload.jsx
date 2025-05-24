import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";

const BlogUploadPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

const rawUser = JSON.parse(localStorage.getItem("user"));
const { blogs, ...user } = rawUser;

const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare Blog object (match your backend entity)
    const blog = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      comments: [],
      likes: [],
      blogImage: null,
    };

    const formData = new FormData();
    formData.append("blog", JSON.stringify(blog));
    formData.append("user", JSON.stringify(user));
    if (image) formData.append("image", image);

    try {
      console.log("Form Data : ",formData);
      const res = await axiosInstance.post("/blog/upload", formData,{ headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // if required
      }});
      if(res.data.status)
      alert("Blog uploaded successfully!");
    else
    alert("Sorry! Something went wrong.");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to upload blog.");
    }
  };
const navigate = useNavigate();
  return (
   <>
    <div className="flex justify-end">
      <button
      onClick={() => navigate(-1)}
      className="bg-blue-600 m-4 hover:bg-blue-700  text-white font-semibold  px-10 rounded-xl shadow-md transition py-3   cursor-pointer duration-200 active:scale-95"
      >Back</button>
    </div>
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Upload Blog
      </button>
    </form></>
  );
};

export default BlogUploadPage;
