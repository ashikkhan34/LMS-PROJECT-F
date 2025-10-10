import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { MdOutlineNotInterested } from "react-icons/md";

export default function AllCourse() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosPublic.get("/course");
        setCourses(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [axiosPublic]);

  // Filter courses based on search
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Heading + Search */}
      <div className="w-3/4 mx-auto mb-8 p-4 rounded-2xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <h1 className="text-3xl font-bold text-white mb-3 md:mb-0">
            All Courses
          </h1>
          <input
            type="text"
            placeholder="Search courses..."
            className="border border-white rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate(`/categoryDetails/${course._id}`)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {course.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {course.courseOverview}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    ৳ {course.fee}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      // Add to cart logic here
                      console.log("Added to cart:", course.title);
                    }}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Rating: {course.rating} ⭐</span>
                  <span>Students: {course.totalStudentEnroll}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-5xl mb-7 mt-10">
            <div className="justify-center flex mx-auto items-center gap-2">
                <MdOutlineNotInterested className="text-6xl text-red-600"/>
                Data Not Found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
