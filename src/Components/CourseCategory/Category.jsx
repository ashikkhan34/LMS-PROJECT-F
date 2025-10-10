import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { GiDuration } from "react-icons/gi";
import toast from "react-hot-toast";

const CategoryCourses = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all"); // By default "all"

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosPublic.get("/category");
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [axiosPublic]);

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

  // Filter courses based on selected category
  useEffect(() => {
    if (selectedCategoryId === "all") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.category === selectedCategoryId
      );
      setFilteredCourses(filtered);
    }
  }, [selectedCategoryId, courses]);

  const handleAddToCart = () => {
    toast.error('Nothing to Add Cart')
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Favorite Courses
      </h2>

      {/* Scrollable Categories */}
      <div className="flex overflow-x-auto space-x-4 py-2 mb-8 scrollbar-hide">
        {/* All Courses Button */}
        <button
          className={`flex-shrink-0 px-5 py-2 rounded-sm border font-medium transition ${
            selectedCategoryId === "all"
              ? "text-blue-600 border-2 border-blue-700"
              : "text-gray-400 hover:bg-gray-100 border-1"
          }`}
          onClick={() => setSelectedCategoryId("all")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            className={`flex-shrink-0 px-5 py-2 rounded-sm border font-medium transition ${
              selectedCategoryId === cat._id
                ? "text-blue-600 border-2 border-blue-700"
                : " text-gray-400 hover:bg-gray-100 border-1"
            }`}
            onClick={() => setSelectedCategoryId(cat._id)}
          >
            {cat.slug}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 hover:bg-blue-950 duration-1000 rounded-2xl shadow-md p-4 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onClick={() => navigate(`/categoryDetails/${course._id}`)}
              />

              <h3 className="text-xl font-semibold text-black mb-1">
                {course.title}
              </h3>
              <div className="flex px-2 justify-between">
                <p className="text-gray-500 flex items-center gap-1">
                  <GiDuration />
                  {course.duration} weeks
                </p>
                <button className="px-4  bg-gray-900 text-gray-400 rounded-2xl">
                  {course.type}
                </button>
              </div>
              <p className="text-gray-500 mb-2">
                {course.courseOverview.slice(0, 80)}...
              </p>

              <div className="flex justify-between items-center mb-3">
                <p className="text-indigo-600 font-bold text-lg">
                  BDT : {course.fee}
                </p>
                <p className="text-yellow-500 font-semibold">
                  ⭐ {course.rating}
                </p>
              </div>

              <button
                className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
                onClick={() => handleAddToCart(course)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-4xl col-span-3">
            {selectedCategoryId !== "all"
              ? "No courses found for this category."
              : "No courses available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryCourses;
