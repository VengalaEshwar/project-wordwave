import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment } from "react-icons/fa";
import moment from "moment";
import axios from "axios";

const BlogCard = ({ blog }) => {
  const { id, title, content, images, tags, createdAt, author, comments: initialComments, likes: initialLikes } = blog;

  const [likes, setLikes] = useState(initialLikes.length); // likes is an array, so count them
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");

  // Function to handle like button click
  const handleLike = async () => {
    setLikes(prevLikes => prevLikes + 1);
    // Call API to update the like count in the backend
    try {
      await axios.post(`/api/blogs/${id}/like`);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  // Function to handle adding a new comment
  const handleComment = async () => {
    if (newComment.trim() === "") return; // Don't add empty comments

    const newCommentObject = {
      content: newComment,
      blog: { id },
      author: { username: "CurrentUser" }, // Replace with actual logged-in user details
      commentedAt: new Date().toISOString(),
    };

    // Update the frontend immediately
    setComments(prevComments => [...prevComments, newCommentObject]);
    setNewComment(""); // Clear the input after submitting

    // Call API to add comment in the backend
    try {
      await axios.post(`/api/blogs/${id}/comment`, newCommentObject);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition w-full "
      whileHover={{ scale: 1.02 }}
    >
      {/* Blog Image */}
      {images?.length > 0 && (
        <img
          src={images[0]} // Displaying first image only for card
          alt="blog"
          className="w-6/12 h-auto object-cover rounded-md mb-4 m-auto"
        />
      )}

      {/* Title */}
      <h2 className="text-xl font-bold text-indigo-600 mb-2">{title}</h2>

      {/* Content Preview */}
      <p className="text-gray-700 mb-3">{content.substring(0, 120)}...</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-indigo-100 text-indigo-600 px-2 py-1 text-xs rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>👤 {author?.username}</p>
        <p>{moment(createdAt).fromNow()}</p>
      </div>

      {/* Likes & Comments */}
      <div className="flex items-center gap-4 mt-4 text-gray-600">
        <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
          <FaHeart className="text-red-500" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <FaComment className="text-blue-500" />
          <span>{comments.length}</span>
        </div>
      </div>

      {/* Add Comment */}
      <div className="mt-4">
        <textarea
          className="w-50 p-2 border rounded-md"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 w-40 p-2 bg-indigo-600 text-white rounded-md"
          onClick={handleComment}
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-semibold text-gray-800">{comment.author.username}</p>
            <p className="text-gray-600">{comment.content}</p>
            <p className="text-xs text-gray-400">{moment(comment.commentedAt).fromNow()}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogCard;
