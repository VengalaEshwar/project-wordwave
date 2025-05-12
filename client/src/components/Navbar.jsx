import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/blogs", label: "Blogs" },
    ...(isLoggedIn ? [{ to: "/profile", label: "Profile" }] : []),
    {to:"/profile",label:"Profile"},
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-indigo-600">WordWave</div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            {item.label}
          </Link>
        ))}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-indigo-600 border border-indigo-500 px-3 py-1 rounded hover:bg-indigo-50"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Hamburger menu for mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-3 text-gray-800 w-full text-center hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-center py-3 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="py-3 w-full text-center text-indigo-600 hover:bg-indigo-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="py-3 w-full text-center text-indigo-600 hover:bg-indigo-50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
