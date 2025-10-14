import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import img from "../../assets/images/exceptional.png";
import { Link } from "react-router-dom";

export default function Exceptional() {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side Images */}
        <div className="flex justify-center relative">
          {/* Big Circle Image */}
          <motion.img
            src={img}
            alt="Mentor giving award"
            className="w-72 h-72 md:w-[400px] md:h-96 object-cover shadow-2xl z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Right Side Content */}
        <div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Why We’re <span className="text-indigo-600">Exceptional</span>
          </motion.h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Bdcalling Academy offers a variety of courses, and upon successful
            completion, we provide job opportunities within our company.
            Additionally, we offer scholarships in different categories to
            support aspiring individuals. Our training programs include hands-on
            experience with real client projects, ensuring a comprehensive and
            practical learning experience.
          </p>

          {/* Highlight Box */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-indigo-50 dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-indigo-100 dark:border-gray-700 mb-6"
          >
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 text-lg mb-2">
              Flexible Classes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Fit education into your life—not the other way around. Our
              flexible online classes are designed to adapt to your busy
              schedule, allowing you to learn what you want, when you want.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mt-3 text-sm text-gray-700 dark:text-gray-300">
              <span>✅ Free Seminars & Workshops</span>
              <span>✅ 24/7 Support</span>
              <span>✅ Industry-Expert Trainers</span>
              <span>✅ Course Certificate</span>
            </div>
          </motion.div>

          {/* Button */}
          <Link to='/about'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-full shadow-md"
            >
              More About <ArrowUpRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
