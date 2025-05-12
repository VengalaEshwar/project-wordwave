import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const UserProfile = () => {
const [user, setUser] = useState([]);
const [myBlogs, setMyBlogs] = useState([]);

const [likedBlogs, setLikedBlogs] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await axios.get("/api/users/me");
//         setUser(userRes.data);

//         const blogsRes = await axios.get("/api/users/me/blogs");
//         setMyBlogs(blogsRes.data);

//         const likedRes = await axios.get("/api/users/me/liked-blogs");
//         setLikedBlogs(likedRes.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []);

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">👤 {user.username}</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {moment(user.createdAt).format("MMMM Do YYYY")}</p>
      </div>

      {/* My Blogs */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📝 My Blogs</h3>
        {myBlogs.length === 0 ? (
          <p className="text-gray-500">You haven't posted any blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {myBlogs.map((blog) => (
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
      <div>
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
      </div>
    </div>
  );
};

export default UserProfile;
