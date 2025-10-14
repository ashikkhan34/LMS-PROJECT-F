import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 pt-28 pb-20">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Contact Us
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Have questions, feedback, or need assistance? We’d love to hear from you.
          Reach out to us anytime — our team is always ready to help.
        </p>
      </motion.div>

      {/* Contact Container */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-purple-600/30 transition-all"
        >
          <h2 className="text-2xl font-semibold mb-6 text-purple-400">
            Get in Touch
          </h2>
          <div className="space-y-5 text-gray-300">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-purple-400 text-xl" />
              <p>Pabna, Bangladesh</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-purple-400 text-xl" />
              <p>support@lmsproject.com</p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-purple-400 text-xl" />
              <p>+880 1234-567890</p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-10 border-l-4 border-purple-400 pl-4 text-gray-400 italic"
          >
            “Empowering education through technology and collaboration.”
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-pink-600/30 transition-all"
        >
          <h2 className="text-2xl font-semibold mb-6 text-pink-400">
            Send a Message
          </h2>

          <div className="mb-5">
            <label className="block mb-2 text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-300">Your Message</label>
            <textarea
              rows="5"
              placeholder="Type your message..."
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-pink-400"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>

      
    </div>
  );
}
