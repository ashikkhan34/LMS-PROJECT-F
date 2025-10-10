import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion as Motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";

export default function StudentReview() {
  const axiosPublic = useAxiosPublic();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchStudentReview = async () => {
      try {
        const res = await axiosPublic.get("/studentReview");
        const reviews = res.data?.data || [];
        setReview(reviews.slice(0, 1)[0]); // get the latest review
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudentReview();
  }, [axiosPublic]);

  if (!review) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-300">
        Loading review...
      </div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <Motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {review.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
            {review.description}
          </p>

          {/* Student Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={review.studentImg}
              alt={review.studentName}
              className="w-16 h-16 rounded-full border-2 border-indigo-600 object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {review.studentName}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <Calendar size={16} />
                <span>{review.date}</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <Motion.a
            href={review.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
          >
            <Play size={18} /> Watch Now
          </Motion.a>
        </Motion.div>

        {/* Video Section */}
        <Motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative group"
        >
          <a href={review.videoUrl} target="_blank">
            <video
              src={review.videoUrl}
              controls
              poster={review.studentImg}
              className="w-full h-[350px] md:h-[400px] rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 object-cover"
            ></video>
          </a>

          {/* Play Icon Hover Animation */}
          <Motion.div
            whileHover={{ scale: 1.2 }}
            className="absolute inset-0 flex justify-center items-center"
          >
            <div className="bg-indigo-600/80 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Play className="text-white w-10 h-10" />
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
