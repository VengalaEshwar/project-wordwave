// src/pages/BlogPage.jsx
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";

const Blogs = () => {
const sampleBlogs = [
{
  "id": 1,
  "title": "Understanding React Hooks",
  "content": "React Hooks are JavaScript functions that let you use state and lifecycle features in functional components. They allow you to write more concise, maintainable, and readable code without using class-based components.",
  "images": [
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
  ],
  "tags": [
    "React",
    "JavaScript",
    "Web Development"
  ],
  "createdAt": "2025-05-10T12:30:00Z",
  "author": {
    "username": "john_doe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/50x50.png?text=JD"
  },
  "comments": [
    {
      "id": 1,
      "content": "This is a very informative post! I love how you explained hooks in simple terms.",
      "commentedAt": "2025-05-10T13:00:00Z",
      "author": {
        "username": "jane_doe",
        "profileImage": "https://asset.cloudinary.com/dddkksq5w/d9b62f87725872bb18cc9d2ede5f75d9"
      }
    },
    {
      "id": 2,
      "content": "Thanks for the insights! I had trouble with hooks earlier but your explanation cleared things up.",
      "commentedAt": "2025-05-10T14:00:00Z",
      "author": {
        "username": "mark_smith",
        "profileImage": "https://asset.cloudinary.com/dddkksq5w/d9b62f87725872bb18cc9d2ede5f75d9"
      }
    }
  ],
  "likes": [
    {
      "username": "john_doe"
    },
    {
      "username": "jane_doe"
    }
  ]
},
{
  "id": 1,
  "title": "Understanding React Hooks",
  "content": "React Hooks are JavaScript functions that let you use state and lifecycle features in functional components. They allow you to write more concise, maintainable, and readable code without using class-based components.",
  "images": [
    "https://via.placeholder.com/600x400.png?text=React+Hooks"
  ],
  "tags": [
    "React",
    "JavaScript",
    "Web Development"
  ],
  "createdAt": "2025-05-10T12:30:00Z",
  "author": {
    "username": "john_doe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/50x50.png?text=JD"
  },
  "comments": [
    {
      "id": 1,
      "content": "This is a very informative post! I love how you explained hooks in simple terms.",
      "commentedAt": "2025-05-10T13:00:00Z",
      "author": {
        "username": "jane_doe",
        "profileImage": "https://via.placeholder.com/50x50.png?text=Jane"
      }
    },
    {
      "id": 2,
      "content": "Thanks for the insights! I had trouble with hooks earlier but your explanation cleared things up.",
      "commentedAt": "2025-05-10T14:00:00Z",
      "author": {
        "username": "mark_smith",
        "profileImage": "https://via.placeholder.com/50x50.png?text=Mark"
      }
    }
  ],
  "likes": [
    {
      "username": "john_doe"
    },
    {
      "username": "jane_doe"
    }
  ]
},
{
  "id": 1,
  "title": "Understanding React Hooks",
  "content": "React Hooks are JavaScript functions that let you use state and lifecycle features in functional components. They allow you to write more concise, maintainable, and readable code without using class-based components.",
  "images": [
    "https://via.placeholder.com/600x400.png?text=React+Hooks"
  ],
  "tags": [
    "React",
    "JavaScript",
    "Web Development"
  ],
  "createdAt": "2025-05-10T12:30:00Z",
  "author": {
    "username": "john_doe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/50x50.png?text=JD"
  },
  "comments": [
    {
      "id": 1,
      "content": "This is a very informative post! I love how you explained hooks in simple terms.",
      "commentedAt": "2025-05-10T13:00:00Z",
      "author": {
        "username": "jane_doe",
        "profileImage": "https://via.placeholder.com/50x50.png?text=Jane"
      }
    },
    {
      "id": 2,
      "content": "Thanks for the insights! I had trouble with hooks earlier but your explanation cleared things up.",
      "commentedAt": "2025-05-10T14:00:00Z",
      "author": {
        "username": "mark_smith",
        "profileImage": "https://via.placeholder.com/50x50.png?text=Mark"
      }
    }
  ],
  "likes": [
    {
      "username": "john_doe"
    },
    {
      "username": "jane_doe"
    }
  ]
},
{
  "id": 1,
  "title": "Understanding React Hooks",
  "content": "React Hooks are JavaScript functions that let you use state and lifecycle features in functional components. They allow you to write more concise, maintainable, and readable code without using class-based components.",
  "images": [
    "https://via.placeholder.com/600x400.png?text=React+Hooks"
  ],
  "tags": [
    "React",
    "JavaScript",
    "Web Development"
  ],
  "createdAt": "2025-05-10T12:30:00Z",
  "author": {
    "username": "john_doe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/50x50.png?text=JD"
  },
  "comments": [
    {
      "id": 1,
      "content": "This is a very informative post! I love how you explained hooks in simple terms.",
      "commentedAt": "2025-05-10T13:00:00Z",
      "author": {
        "username": "jane_doe",
        "profileImage": "https://via.placeholder.com/50x50.png?text=Jane"
      }
    },
    {
      "id": 2,
      "content": "Thanks for the insights! I had trouble with hooks earlier but your explanation cleared things up.",
      "commentedAt": "2025-05-10T14:00:00Z",
      "author": {
        "username": "mark_smith",
        "profileImage": "https://via.placeholder.com/50x50.png?text=Mark"
      }
    }
  ],
  "likes": [
    {
      "username": "john_doe"
    },
    {
      "username": "jane_doe"
    }
  ]
}
];

const [blogs, setBlogs] = useState(sampleBlogs);


  useEffect(() => {
    // Replace this with your API call
    fetch("http://localhost:8080/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <motion.div
      className="min-h-screen  px-6 py-10 w-maxl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Explore Blogs</h1>

      <div className="grid grid-cols-1  gap-8 ">
        {blogs.length > 0 ? blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />): (
          <p className="text-center col-span-full text-gray-500">No blogs found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Blogs;
