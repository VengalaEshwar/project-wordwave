// src/pages/About.jsx
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* About Us Section */}
        <div>
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">About WordWave</h2>
          <p className="text-gray-700 text-lg mb-4">
            WordWave is a modern blogging platform designed for writers, readers, and thinkers. Whether you want to share your thoughts, post an article, or engage in discussions through comments and likes — WordWave empowers you to do it all with ease and style.
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>📝 Create, edit, and delete blogs</li>
            <li>👍 Like and comment on blogs</li>
            <li>📸 Add images to enhance your blogs</li>
            <li>👤 Maintain your profile and view liked blogs</li>
            <li>🔒 Secure login & signup system</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">Have questions or feedback? We'd love to hear from you!</p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg text-gray-800 font-medium">support@wordwave.io</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg text-gray-800 font-medium">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg text-gray-800 font-medium">
                42 Tech Street, Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">Follow us:</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-indigo-600 hover:underline">Twitter</a>
              <a href="#" className="text-indigo-600 hover:underline">Instagram</a>
              <a href="#" className="text-indigo-600 hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
