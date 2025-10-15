import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { ShoppingCart, Star, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const CategoryDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure backend populates mentor info
        const res = await axiosPublic.get(`/course/${id}`);
        console.log(res);
        setCourse(res.data?.data || null);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, axiosPublic]);

  if (!course)
    return (
      <p className="text-center text-gray-400 mt-20 text-lg">Loading...</p>
    );
  const handleAddToCart = () => {
    toast.error("Failed to add course to cart.");
  };


  const handleMentorClick = () => {
    if (course?.mentor?._id) {
      navigate(`/mentorDetails/${course.mentor._id}`);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 w-full pb-12">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#facc15",
            fontWeight: "bold",
          },
        }}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full overflow-hidden"
      >
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-96 md:h-[500px] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3">
            {course.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-3 text-gray-300 text-sm md:text-base">
            <span>Type: {course.type}</span>
            <span>Duration: {course.duration} weeks</span>
            <span>
              Fee:{" "}
              <span className="text-yellow-400 font-semibold">
                {course.fee}৳
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content + Floating Add-to-Cart */}
      <div className="mt-12 w-full flex flex-col lg:flex-row gap-12 px-5 md:px-12 lg:px-20">
        {/* Left Content */}
        <div className="lg:flex-1 space-y-12">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-indigo-500 pl-4">
              Overview
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {course.courseOverview}
            </p>
          </motion.section>

          {/* Mentor */}
          {course.mentor && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-4 border-l-4 border-pink-500 pl-4">
                Mentor
              </h2>
              <div
                onClick={handleMentorClick}
                className="flex items-center gap-4 bg-gray-800 p-4 rounded-2xl cursor-pointer hover:bg-gray-700 transition-all duration-300"
              >
                <img
                  src={
                    course.mentor.profileImg ||
                    "https://i.ibb.co/8P2fL1h/default-avatar.png"
                  }
                  alt={course.mentor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {course.mentor.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{course.mentor.email}</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* Curriculum */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-yellow-500 pl-4">
              Curriculum
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-lg">
              {course.carriculam?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Course Includes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-5 border-l-4 border-pink-500 pl-4">
              What You’ll Get
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {course.courseIncludes?.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 p-5 bg-gray-800 rounded-2xl border border-gray-700 hover:bg-gray-700 transition"
                >
                  <img src={item.icon} alt="" className="w-10 h-10" />
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Software Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-cyan-500 pl-4">
              Software Tools
            </h2>
            <div className="flex flex-wrap gap-3 text-lg">
              {course.softwareIncludes?.map((tool, i) => (
                <span
                  key={i}
                  className="px-5 py-2 bg-cyan-800 text-cyan-200 rounded-full hover:bg-cyan-700 transition"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Job Opportunities */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-500 pl-4">
              Career Opportunities
            </h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg">
              {course.jobOptions?.map((job, i) => (
                <li
                  key={i}
                  className="p-5 bg-gray-800 rounded-2xl shadow hover:bg-gray-700 transition-transform duration-300 hover:-translate-y-1"
                >
                  💼 {job}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Floating Add-to-Cart Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:w-80 w-full flex-shrink-0 self-start"
        >
          <div className="bg-gradient-to-r from-indigo-700 via-cyan-600 to-purple-700 p-1 rounded-3xl shadow-2xl w-full">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-6 flex flex-col gap-4 text-white shadow-lg w-full ">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm text-gray-300">{course.type} Course</p>
              <p className="text-2xl font-extrabold text-yellow-400">
                {course.fee}৳
              </p>
              <div className="flex items-center gap-2 text-yellow-400">
                <Star size={18} /> {course.rating} ({course.totalRating}+)
              </div>
              <button
                disabled={loading}
                onClick={handleAddToCart}
                className={`mt-4 bg-yellow-400 text-gray-900 font-semibold py-3 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <ShoppingCart size={20} />{" "}
                {loading ? "Adding..." : "Enroll Now"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryDetails;
