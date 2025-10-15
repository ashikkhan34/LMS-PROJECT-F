import React from "react";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdAddIcCall } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

export default function MentorDashboard() {
  return (
    <div className="md:flex min-h-screen ">
      <div className="w-48 bg-purple-800 p-4">
        <ul>
          <li className="flex items-center gap-2">
            <FaHome></FaHome>
            <NavLink to="/mentorDashboard/mentorHome">Mentor Home</NavLink>
          </li>
          <li className="flex items-center gap-2">
            <FaHome></FaHome>
            <NavLink to="/mentorDashboard/all-course">All Course</NavLink>
          </li>
        </ul>
        <div className="divider"></div>
        <div>
          <ul className="space-y-7">
            <NavLink to="/">
              <li className="flex items-center gap-1 mb-2">
                <FaHome></FaHome> Home
              </li>
            </NavLink>
            <NavLink to="/about">
              <li className="flex items-center gap-1 mb-2">
                <FcAbout /> About
              </li>
            </NavLink>
            <NavLink to="/contact">
              <li className="flex items-center gap-1 mb-2">
                <MdAddIcCall /> Contact Us
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
