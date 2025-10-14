import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { BookOpen, Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const lenisRef = useRef();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenisRef.current.destroy();
  }, []);

  const features = [
    {
      icon: "🎓",
      title: "Student Dashboard",
      desc: "Browse courses, enroll easily, track progress, and access personalized recommendations.",
    },
    {
      icon: "🧑‍🏫",
      title: "Mentor Dashboard",
      desc: "Create, edit, and manage courses. View enrolled students and track performance analytics.",
    },
    {
      icon: "🛠️",
      title: "Admin Dashboard",
      desc: "Full control over website content, user management, course approvals, and analytics.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      desc: "Real-time dashboard for students and mentors to monitor performance and course completion.",
    },
    {
      icon: "💻",
      title: "Interactive Courses",
      desc: "Dynamic and interactive course content, quizzes, and assignments for better learning.",
    },
    {
      icon: "🌐",
      title: "Global Access",
      desc: "Access courses from anywhere with a seamless digital learning experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 pt-28 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            About Our LMS
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-4">
            Our Learning Management System empowers Students, Mentors, and
            Admins with dynamic dashboards, interactive courses, and full
            control over content and progress.
          </p>
          <p className="text-gray-400 text-base md:text-lg">
            Seamlessly manage your courses, enrollments, and analytics — all in
            one platform.
          </p>
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
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 30px rgba(139,92,246,0.5)",
            }}
            className="bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-purple-600/50 transition-all cursor-pointer"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Animated Call-to-Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl mx-4 md:mx-20 mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400">
          Join Our Learning Platform
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-6 text-lg md:text-xl">
          Students, Mentors, and Admins can explore and manage courses,
          enrollments, and content dynamically. Get started and experience
          seamless learning management.
        </p>
        <Link to='/toggle-from'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-600/50 transition-all"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
}
