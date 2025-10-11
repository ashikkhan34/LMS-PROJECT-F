import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const link = (
    <>
      <li>
        <NavLink to="/" className="px-4 py-2 rounded-md hover:bg-base-300">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-courses"
          className="px-4 py-2 rounded-md hover:bg-base-300"
        >
          Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-mentor"
          className="px-4 py-2 rounded-md hover:bg-base-300"
        >
          Mentors
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="px-4 py-2 rounded-md hover:bg-base-300">
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className="px-4 py-2 rounded-md hover:bg-base-300"
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar shadow-sm fixed z-10 bg-opacity-30 bg-gray-700/20 text-white">
        <div className="navbar-start">
          <div className="dropdown relative">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content absolute bg-base-100 rounded-box mt-2 w-52 p-2 shadow z-50"
            >
              {link}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">LMS-PROJECT</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          <Link to='/toggle-from'>
            <a
              href="#_"
              class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
            >
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Register
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
