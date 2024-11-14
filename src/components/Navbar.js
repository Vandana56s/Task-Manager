import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="bg-gray-900 text-white flex items-center justify-between px-6 py-4 fixed w-full top-0 shadow-lg">
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <nav className="flex space-x-6">
        <Link to="/tasks" className="flex items-center hover:text-gray-300">
          <span className="material-icons">Tasks</span>
        </Link>
      </nav>
    </div>
  </div>
);

export default Navbar;
