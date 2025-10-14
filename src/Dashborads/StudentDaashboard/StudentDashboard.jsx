import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaUserGraduate, FaBookOpen, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCertificate, FaBell, FaTasks } from 'react-icons/fa';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  const axiosPublic = useAxiosPublic();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosPublic.get('/student');
        const data = res.data?.data || [];
        setStudent(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-xl font-semibold">No student data found.</p>
      </div>
    );
  }

  // Example data for chart
  const data = [
    { name: 'Completed', value: 5 },
    { name: 'Pending', value: 2 },
  ];
  const COLORS = ['#FACC15', '#374151'];

  return (
    <div className=" min-h-screen bg-gray-900 text-white pt-20 px-4 md:px-16 space-y-12 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Welcome, {user.name}!</h1>
        <p className="text-gray-400 mt-2 text-lg">{user.email}</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 hover:scale-105 transition-transform duration-500"
      >
        <div className="flex-shrink-0">
          <img
            src={student.profileImg}
            alt={student.name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-yellow-400">{student.name}</h2>
            <p className="text-gray-400 italic">{student.courseName}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-yellow-400 text-xl" /> {student.email}
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaPhone className="text-yellow-400 text-xl" /> {student.contactNo}
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaUserGraduate className="text-yellow-400 text-xl" /> Guardian: {student.guardian}
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-yellow-400 text-xl" /> {student.address}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Date of Birth</h3>
              <p className="text-gray-300">{student.dateOfBirth}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Student ID</h3>
              <p className="text-gray-300">{student.id}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-800 shadow-2xl rounded-3xl p-8"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Course Progress</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-4">
            <div className="bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <FaBookOpen /> Completed Courses
              </h3>
              <p className="text-gray-300">5 Courses Completed</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <FaBookOpen /> Current Course
              </h3>
              <p className="text-gray-300">{student.courseName}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Extra Features */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-800 shadow-2xl rounded-3xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-yellow-400">Extra Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-xl shadow cursor-pointer hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <FaCertificate /> Certificates
            </h3>
            <p className="text-gray-300">View & download your certificates</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-xl shadow cursor-pointer hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <FaTasks /> Assignments
            </h3>
            <p className="text-gray-300">Track assignments & submissions</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-xl shadow cursor-pointer hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <FaBell /> Notifications
            </h3>
            <p className="text-gray-300">Stay updated with course announcements</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-xl shadow cursor-pointer hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <GiLaurelsTrophy /> Badges
            </h3>
            <p className="text-gray-300">Earn badges for achievements</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
