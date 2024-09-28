import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaInfoCircle, FaArrowRight, FaTimes } from "react-icons/fa";

const Drawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Drawer container */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between pt-4 p-4">
          {/* Button to open/close the drawer */}
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleDrawer}
          >
            {isOpen ? <FaTimes /> : <FaArrowRight />}
          </button>
        </div>

        <div className="pt-16 p-4">
          {/* Drawer content (visible icons) */}
          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaHome className="mr-3 text-4xl" />
              {isOpen && <span>Home</span>}
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaUser className="mr-3 text-4xl" />
              {isOpen && <span>Profile</span>}
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaCog className="mr-3 text-4xl" />
              {isOpen && <span>Settings</span>}
            </a>
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaInfoCircle className="mr-3 text-4xl" />
              {isOpen && <span>About</span>}
            </a>
          </nav>
        </div>

        {/* Drawer extended content when open */}
        {isOpen && <div className="p-4 mt-6">{children}</div>}
      </div>
    </div>
  );
};

export default Drawer;
