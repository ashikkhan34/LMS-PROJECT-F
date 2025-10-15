import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaUsers, FaChalkboardTeacher, FaBook, FaUserGraduate } from "react-icons/fa";

export default function MentorHome() {
  const axiosPublic = useAxiosPublic();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorRes, courseRes, userRes, studentRes] = await Promise.all([
          axiosPublic.get("/mentor"),
          axiosPublic.get("/course"),
          axiosPublic.get("/user"),
          axiosPublic.get("/student"),
        ]);
        setMentors(mentorRes.data?.mentor || []);
        setCourses(courseRes.data?.data || []);
        setUsers(userRes.data?.data || []);
        setStudents(studentRes.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

  const chartData = [
    { name: "Mentors", value: mentors.length },
    { name: "Students", value: students.length },
    { name: "Courses", value: courses.length },
    { name: "Users", value: users.length },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold mb-8 text-center text-cyan-400"
      >
        👨‍🏫 Mentor Dashboard
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <StatCard icon={<FaChalkboardTeacher />} label="Mentors" value={mentors.length} color="from-cyan-500 to-blue-600" />
        <StatCard icon={<FaBook />} label="Courses" value={courses.length} color="from-indigo-500 to-purple-600" />
        <StatCard icon={<FaUserGraduate />} label="Students" value={students.length} color="from-pink-500 to-rose-600" />
        <StatCard icon={<FaUsers />} label="Users" value={users.length} color="from-emerald-500 to-teal-600" />
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Bar Chart */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">System Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Data Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Animated Footer */}
      <motion.footer
        className="mt-12 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        © {new Date().getFullYear()} Mentor Panel — Built with 💙 by Ashik Khan
      </motion.footer>
    </div>
  );
}

// ✅ Reusable Stat Card
const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 10 }}
    className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg text-center transform transition-all`}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </motion.div>
);
