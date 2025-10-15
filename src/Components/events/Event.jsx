import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Event() {
  const axiosPublic = useAxiosPublic();
  const [event, setEvent] = useState(null);

  const handleSeminar = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Seminar Not Available Now !",
      footer: '<a className="text-blue-700" href="/all-events">See More Seminar ?</a>',
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosPublic.get("/seminar");
        const events = res.data.data || [];
        // Just one event (latest one)
        setEvent(events.slice(0, 1)[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [axiosPublic]);

  if (!event) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-300">
        Loading event...
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 md:px-20">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* Image Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2"
        >
          <img
            data-aos="fade-right"
            src={event.image}
            alt={event.title}
            className="w-full h-[400px] object-cover rounded-3xl shadow-xl border-4 border-white dark:border-gray-800"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {event.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
            Join us for an exciting seminar where industry experts like{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {event.speaker}
            </span>{" "}
            will discuss the latest trends and advancements in the field of
            Artificial Intelligence.
          </p>

          {/* Event Info */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Calendar className="text-indigo-600" size={20} />
              <span className="text-lg font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Clock className="text-indigo-600" size={20} />
              <span className="text-lg font-medium">{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <User className="text-indigo-600" size={20} />
              <span className="text-lg font-medium">{event.speaker}</span>
            </div>
          </div>

          {/* Button */}
          <motion.button
            onClick={handleSeminar}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
          >
            Join Seminar
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
