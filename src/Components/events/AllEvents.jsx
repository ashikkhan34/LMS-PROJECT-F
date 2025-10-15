import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCalendarAlt, FaUserTie, FaClock } from "react-icons/fa";

export default function AllEvents() {
  const axiosPublic = useAxiosPublic();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosPublic.get("/seminar");
        setEvents(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, [axiosPublic]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 pt-20 pb-10 px-4 md:px-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-10"
      >
        🎤 Upcoming Seminars & Events
      </motion.h1>

      {/* Events Grid */}
      {events?.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-600/30 transition-all"
            >
              {/* Event Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Event Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                  <FaUserTie className="text-cyan-500" /> {event.speaker}
                </p>
                <div className="flex justify-between text-gray-400 text-sm mb-4">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-500" /> {event.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-yellow-400" /> {event.time}
                  </span>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-lg"
        >
          No events found 😔
        </motion.div>
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-gray-500 mt-12"
      >
        © {new Date().getFullYear()} All Events — Managed by Mentor Dashboard
      </motion.footer>
    </div>
  );
}
