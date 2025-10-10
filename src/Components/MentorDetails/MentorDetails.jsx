import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function MentorDetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await axiosPublic.get(`/mentor/${id}`);
      setMentor(res.data?.mentor);
    };
    fetchMentor();
  }, [id, axiosPublic]);

  if (!mentor) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Loading mentor details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 pt-24 pb-20 px-4 md:px-10">
      {/* Header / Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-indigo-800/40 via-gray-800/40 to-pink-800/40 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden"
      >
        {/* Image */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={
            mentor.profileImg ||
            "https://i.ibb.co/8P2fL1h/default-avatar.png"
          }
          alt={mentor.name}
          className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-pink-400"
          >
            {mentor.name}
          </motion.h1>
          <p className="text-lg text-gray-300 font-medium">
            {mentor.designation} — {mentor.departName}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-indigo-400 mt-3">
            <div className="flex items-center gap-2">
              <FaEnvelope /> <span>{mentor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt /> <span>{mentor.contactNo}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>{mentor.address}</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-2 mt-4">
            <FaStar className="text-yellow-400" />
            <p className="text-lg">{mentor.reviews} / 5.0</p>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-600/20 blur-[150px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/20 blur-[150px] rounded-full -z-10"></div>
      </motion.div>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 max-w-5xl mx-auto bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
          Biography
        </h2>
        <p className="text-gray-300 leading-relaxed">{mentor.bio}</p>
      </motion.section>

      {/* Grid Sections */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
        {/* Specialized Areas */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 shadow-lg"
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Specialized Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {mentor.specialized_area?.map((area, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-600/30 border border-indigo-400 px-4 py-2 rounded-full text-sm"
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 shadow-lg"
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Education
          </h2>
          <ul className="space-y-2 text-gray-300">
            {mentor.education_qualification?.map((edu, i) => (
              <li key={i} className="border-b border-gray-700 pb-2">
                🎓 {edu}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Work Experience */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 shadow-lg md:col-span-2"
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
            Work Experience
          </h2>
          <ul className="space-y-2 text-gray-300">
            {mentor.workExperience?.map((exp, i) => (
              <li key={i} className="border-b border-gray-700 pb-2">
                💼 {exp}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Extra Info */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 max-w-5xl mx-auto bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-4 mb-4">
          Additional Info
        </h2>
        <p className="text-gray-300 mb-3">
          <strong>Experience with Students:</strong> {mentor.experienceTrainedStudent}
        </p>
        <p className="text-gray-300">
          <strong>Life Journey:</strong> {mentor.lifeJourney}
        </p>
      </motion.section>
    </div>
  );
}
