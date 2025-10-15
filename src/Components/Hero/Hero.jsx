
import { motion } from "framer-motion";
import { BookOpen, Rocket, Users, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 text-white min-h-[90vh] flex items-center justify-center px-6 md:px-16 ">
        {/* Background Blur Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-7xl">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Master New <span className="text-yellow-400">Skills</span>{" "}
              Anytime, Anywhere 🚀
            </h1>
            <p className="text-gray-200 mb-8 text-lg">
              Join thousands of learners and upgrade your skills with top-notch
              online courses, interactive lessons, and expert mentors.
            </p>

            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition"
                href="/all-courses"
              >
                Explore Courses
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="border border-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition"
                href="https://youtu.be/FtsFZkw2h-A"
                target="_blank"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Intro
              </motion.a>
            </div>
          </motion.div>

          {/* Right Animation / Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="w-72 h-72 md:w-96 md:h-96 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 shadow-lg">
              <Rocket className="text-yellow-400 w-24 h-24 animate-bounce" />
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-10 left-0 bg-white/20 p-3 rounded-full"
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-20 right-4 bg-white/20 p-3 rounded-full"
            >
              <Users className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
