import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AllMentor() {
  const axiosPublic = useAxiosPublic();
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Fetch mentors
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axiosPublic.get("/mentor");
        const data = res.data?.mentor || []; // adjust according to your API
        setMentors(data);
        if (data.length > 0) setSelectedMentor(data[0]); // default first mentor
      } catch (err) {
        console.log(err);
      }
    };
    fetchMentor();
  }, [axiosPublic]);

  return (
    <div className="p-6 pt-20">
      {/* Swiper for Mentors */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        className="mb-8"
      >
        {mentors.map((mentor) => (
          <SwiperSlide key={mentor._id} style={{ width: "180px" }}>
            <div
              onClick={() => setSelectedMentor(mentor)}
              className={`cursor-pointer rounded-xl p-4 border ${
                selectedMentor?._id === mentor._id
                  ? "border-red-600 shadow-lg"
                  : "border-gray-300 dark:border-gray-700"
              } hover:shadow-lg transition`}
            >
              <img
                src={mentor.profileImg}
                alt={mentor.name}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-2"
              />
              <h3 className="text-center font-semibold text-gray-800 dark:text-white">
                {mentor.name}
              </h3>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                {mentor.designation}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Selected Mentor Details */}
      {selectedMentor && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-4">
            <img
              src={selectedMentor.profileImg}
              alt={selectedMentor.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedMentor.name}
              </h2>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                {selectedMentor.designation}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Reviews: {selectedMentor.reviews} ⭐
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Specializations:
              </h3>
              <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                {selectedMentor.specialized_area.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Education:
              </h3>
              <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                {selectedMentor.education_qualification.map((edu, i) => (
                  <li key={i}>{edu}</li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Bio:
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{selectedMentor.bio}</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Experience:
              </h3>
              <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                {selectedMentor.workExperience.map((exp, i) => (
                  <li key={i}>{exp}</li>
                ))}
              </ul>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {selectedMentor.experienceTrainedStudent}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
