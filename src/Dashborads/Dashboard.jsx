import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdAddIcCall, MdConnectWithoutContact } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="md:flex  min-h-screen">
      <div className="w-40 bg-blue-950  p-4">
        <ul>
          <NavLink to='/dashboard/adminDashboard'>
            <li className="flex items-center gap-1 mb-2">
              <FaHome></FaHome>Admin Home
            </li>
          </NavLink>
          <NavLink to='/dashboard/allUsers'>
            <li className="flex items-center gap-1 mb-2">
              <FaUser></FaUser> All Users
            </li>
          </NavLink>
          <NavLink to='/dashboard/allMentors'>
            <li className="flex items-center gap-1 mb-2">
              <FaUser></FaUser> All Mentors
            </li>
          </NavLink>
          <NavLink to='/dashboard/certificate'>
            <li className="flex items-center gap-1 mb-2">
              <FaUser></FaUser> Certificate
            </li>
          </NavLink>
        </ul>
        <div className="divider"></div>
        <div>
          <ul className="space-y-7">
            <NavLink to='/'>
              <li className="flex items-center gap-1 mb-2">
              <FaHome></FaHome> Home
            </li>
            </NavLink>
            <NavLink to='/about'>
              <li className="flex items-center gap-1 mb-2">
                <FcAbout /> About
              </li>
            </NavLink>
            <NavLink to='/contact'>
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
