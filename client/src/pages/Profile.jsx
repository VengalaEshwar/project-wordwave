import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import { setUser } from "../redux/slices/userSlice";

const UserProfile = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const dispatch = useDispatch();
  const [likedBlogs, setLikedBlogs] = useState([]);
  const navigate=useNavigate();
  const userState = useSelector((state) => state.user).user;
  const user = useSelector((state) => state.user).user;
  const isLoggin = useSelector
  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log("User : ",userState);
        if(!isLoggin){
          navigate("/login");
        }
        if(user==null){
          const response = await axiosInstance.get(`http://localhost:8080/getUser`);
          dispatch(setUser(response.data.result));
        
          console.log("User Data:", response.data.result);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">👤 {user.username}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        {/* <p><strong>Joined:</strong> {moment(user.createdAt).format("MMMM Do YYYY")}</p> */}
      </div>

      {/* My Blogs */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📝 My Blogs</h3>
        {user?.blogs?.length === 0 ? (
          <p className="text-gray-500">You haven't posted any blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {user?.blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-indigo-600">{blog.title}</h4>
                <p className="text-gray-700 mb-2">{blog.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500">Created: {moment(blog.createdAt).fromNow()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Liked Blogs */}
      {/* <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">❤️ Liked Blogs</h3>
        {likedBlogs.length === 0 ? (
          <p className="text-gray-500">You haven't liked any blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {likedBlogs.map((blog) => (
              <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-indigo-600">{blog.title}</h4>
                <p className="text-gray-700 mb-2">{blog.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500">Author: {blog.author.username}</p>
                <p className="text-sm text-gray-500">Created: {moment(blog.createdAt).fromNow()}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UserProfile;
