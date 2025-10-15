import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaUser } from "react-icons/fa";

export default function AllStudentReview() {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchStudentReview = async () => {
      try {
        const res = await axiosPublic.get("/studentReview");
        const reviews = res.data?.data || [];
        setReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudentReview();
  }, [axiosPublic]);
  return (
    <div className="w-full bg-gray-950 justify-center p-12">
      <h1 className="text-center text-4xl font-semibold text-blue-700 mb-6">Student Review</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        className="mb-8"
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id} style={{ width: "380px" }}>
            <div className="card border border-blue-950 hover:scale-95 hover:shadow-pink-600 hover:shadow-sm w-80 md:w-96 bg-gray-900 p-6">
              <img
                src={review.studentImg}
                alt={review.name}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-2"
              />
              <h3 className="text-center flex items-center gap-2  mx-auto font-semibold text-gray-800 dark:text-white">
                <FaUser></FaUser> {review.studentName}
              </h3>
              <h1 className=" text-blue-500 text-center">{review.title}</h1>
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                {review.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
