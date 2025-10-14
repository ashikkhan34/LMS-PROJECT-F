import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers, FaBook, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Chatbox from "./Chatbox";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const axiosPublic = useAxiosPublic();
  const [mentors, setMentors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Fetch all data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorRes, courseRes, userRes, studentRes, seminarRes, certificateRes] = await Promise.all([
          axiosPublic.get("/mentor"),
          axiosPublic.get("/course"),
          axiosPublic.get("/user"),
          axiosPublic.get("/student"),
          axiosPublic.get("/seminar"),
          axiosPublic.get("/certificate"),
        ]);

        setMentors(mentorRes.data?.mentor || []);
        setCourses(courseRes.data?.data || []);
        setUsers(userRes.data?.data || []);
        setStudents(studentRes.data?.data || []);
        setSeminars(seminarRes.data?.data || []);
        setCertificates(certificateRes.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  // 🔹 Chart data
  const barData = {
    labels: ["Users", "Students", "Mentors", "Courses", "Seminars", "Certificates"],
    datasets: [
      {
        label: "Count",
        data: [users.length, students.length, mentors.length, courses.length, seminars.length, certificates.length],
        backgroundColor: ["#4F46E5","#EC4899","#F59E0B","#10B981","#3B82F6","#EF4444"],
      },
    ],
  };

  const pieData = {
    labels: ["Users", "Students", "Mentors", "Courses", "Seminars", "Certificates"],
    datasets: [
      {
        label: "Distribution",
        data: [users.length, students.length, mentors.length, courses.length, seminars.length, certificates.length],
        backgroundColor: ["#4F46E5","#EC4899","#F59E0B","#10B981","#3B82F6","#EF4444"],
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Dashboard Overview" },
    },
  };

  return (
    <>
     
      <div>
        <h1 className="text-2xl">Welcome <span className="text-blue-600 font-bold">{user.name}</span></h1>
      </div>
    <div className="flex flex-col lg:flex-row min-h-screen ">
      {/* 🔹 Main Content */}
      <div className="flex-1 p-6 space-y-6">
        
        {/* 🔹 Summary Cards */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-purple-900" title="Users" value={users.length} icon={<FaUsers />} color="purple"/>
          <Card title="Students" value={students.length} icon={<FaUsers />} color="pink"/>
          <Card title="Mentors" value={mentors.length} icon={<FaChalkboardTeacher />} color="yellow"/>
          <Card title="Courses" value={courses.length} icon={<FaBook />} color="green"/>
          <Card title="Seminars" value={seminars.length} icon={<FaChalkboardTeacher />} color="blue"/>
          <Card title="Certificates" value={certificates.length} icon={<FaCertificate />} color="red"/>
        </div>

        {/* 🔹 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-purple-950 p-6 rounded-lg shadow-lg">
            <Bar data={barData} options={chartOptions}/>
          </div>
          <div className="bg-purple-950 p-6 rounded-lg shadow-lg">
            <Pie data={pieData} options={chartOptions}/>
          </div>
        </div>
      </div>

      {/* 🔹 Chat Box */}
      {/* <Chatbox /> */}
    </div>
    </>
  );
}

// 🔹 Summary Card Component
const Card = ({ title, value, icon, color }) => (
  <div className={`bg-purple-900 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition duration-300 hover:scale-x-105`}>
    <div className={`text-4xl text-${color}-500`}>{icon}</div>
    <div>
      <p className="text-gray-300">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>

 
);
