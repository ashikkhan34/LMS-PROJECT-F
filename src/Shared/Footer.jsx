import React from "react";
import { FaFacebook, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-gray-800 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a href="/about" className="link link-hover">About us</a>
        <a href="/contact" className="link link-hover">Contact</a>
        <a href="/all-courses" className="link link-hover">Courses</a>
        <a href="/all-mentor" className="link link-hover">Mentors</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className="text-2xl text-blue-400 hover:text-blue-800" target="_blank" href="https://www.facebook.com/story.php/?id=61553457934754&story_fbid=876864877476668"><FaFacebook></FaFacebook></a>
          <a className="text-2xl text-blue-400 hover:text-blue-800" target="_blank" href="https://www.linkedin.com/in/ashik-khan-44abbb300/"><FaLinkedinIn></FaLinkedinIn></a>
          <a className="text-2xl text-green-600 hover:text-green-900" target="_blank" href="https://web.whatsapp.com/"><FaWhatsapp></FaWhatsapp></a>

        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by BD Calling Academy Ltd
        </p>
      </aside>
    </footer>
  );
}
