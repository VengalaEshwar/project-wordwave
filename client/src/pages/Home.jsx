// src/pages/Home.jsx
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const features = [
  {
    title: "Write & Share Blogs",
    description:
      "Create beautifully crafted blogs with support for images, formatting, and tags.",
  },
  {
    title: "Interactive Comments",
    description:
      "Readers can share thoughts and engage in meaningful discussions through comments.",
  },
  {
    title: "Like & Explore",
    description:
      "Like your favorite blogs and explore trending topics from the WordWave community.",
  },
  {
    title: "Personal Profiles",
    description:
      "View your authored blogs, liked posts, and update your personal details securely.",
  },
];

const Home = () => {
  const isLoggin = useSelector((state) => state.auth).isLoggedIn;
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-indigo-600">Welcome to WordWave 🌊</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          WordWave is a modern blogging platform where ideas meet simplicity. Express
          your thoughts, connect with others, and explore a wave of stories and articles.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {
       !isLoggin && <>
        <p className="text-lg text-gray-700">
          Ready to start your blogging journey?
        </p>
          <NavLink
          to="/signup"
          className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Get Started
        </NavLink></>
        }
      </motion.div>
    </div>
  );
};

export default Home;
