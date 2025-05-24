import { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";

const BlogCard = ({ blog, currentUser }) => {
  const {
    id,
    title,
    content,
    image,
    tags,
    createdAt,
    author,
    comments: initialComments = [],
    likes: initialLikes = [],
  } = blog;

  const [likes, setLikes] = useState(initialLikes.length);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Handle Like Button
  const handleLike = async () => {
    setLikes((prev) => prev + 1);
    // try {
    //   await axios.post(`/api/blogs/${id}/like`);
    // } catch (error) {
    //   console.error("Error liking the blog:", error);
    //   setLikes((prev) => prev - 1); // Rollback on failure
    // }
  };

  // Handle New Comment
  const handleComment = async () => {
    if (newComment.trim() === "") return;

    const newCommentObject = {
      content: newComment,
      blog: { id },
      author: { username: currentUser?.username || "Guest" },
      commentedAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post(`/blog/comment`, JSON.stringify( newCommentObject));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setComments((prev) => [...prev, newCommentObject]);
    setNewComment("");

  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition w-full"
      whileHover={{ scale: 1.02 }}
    >
      {/* Image */}
      {image && (
        <img
          src={image}
          alt="blog"
          className="w-1/4 h-auto object-cover rounded-md mb-4 m-auto"
        />
      )}

      {/* Title */}
      <h2 className="text-xl font-bold text-indigo-600 mb-2">{title}</h2>

      {/* Content Preview */}
      <p className="text-gray-700 mb-3">
        {content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, idx) => (
          <span key={idx} className="bg-indigo-100 text-indigo-600 px-2 py-1 text-xs rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Author Info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>👤 {author?.username}</p>
        <p>{moment(createdAt).fromNow()}</p>
      </div>

      {/* Likes and Comments */}
      <div className="flex items-center gap-6 mt-4 text-gray-600">
        <div
          className="flex items-center gap-1 cursor-pointer hover:scale-110 transition"
          onClick={handleLike}
        >
          <FaHeart className="text-red-500" />
          <span>{likes}</span>
        </div>

        <div
          className="flex items-center gap-1 cursor-pointer hover:scale-110 transition"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <FaComment className="text-blue-500" />
          <span>{comments.length}</span>
        </div>
      </div>

      {/* Toggleable Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Add Comment */}
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 w-40 p-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
            onClick={handleComment}
            disabled={newComment.trim() === ""}
          >
            Add Comment
          </button>

          {/* Comment List */}
          <div className="mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="border p-2 mb-2 rounded-md bg-gray-50">
                <p className="font-semibold text-indigo-700">{comment?.author?.username}</p>
                <p>{comment?.content}</p>
                <p className="text-xs text-gray-400">{moment(comment?.commentedAt).fromNow()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BlogCard;
