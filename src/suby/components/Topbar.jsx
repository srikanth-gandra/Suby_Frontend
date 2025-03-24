import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="companyTitle text-3xl font-extrabold text-orange-500 cursor-pointer">
        <Link to='/'>
          <h2>SUBY</h2>
        </Link>
      </div>

      {/* Location and Search Bar */}
      <div className="flex items-center flex-1 mx-6 max-w-2xl">
        {/* Search Bar */}
        <div className="searchBar flex items-center w-full bg-gray-100 rounded-lg p-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for food or restaurants"
            className="w-full bg-transparent outline-none text-gray-800"
          />
        </div>
      </div>

      {/* User Authentication */}
      <div className="userAuth flex items-center space-x-6">
        <div className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-orange-500">
          Login
        </div>
        <FaUserCircle className="text-3xl text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default Topbar;
