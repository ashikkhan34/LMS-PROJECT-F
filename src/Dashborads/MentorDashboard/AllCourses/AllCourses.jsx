import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import { MdOutlineDeleteSweep } from 'react-icons/md'
import Swal from 'sweetalert2'
import { FaDiscourse } from 'react-icons/fa'

export default function AllCourses() {
    const axiosPublic = useAxiosPublic()
    const [courses,setCourses] = useState([])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axiosPublic.get("/course");
      setCourses(res.data?.data || null);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [axiosPublic]);


     //delete a course
        const handleDeleteMentor = async (id, title) => {
          Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert deleting ${title}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const res = await axiosPublic.delete(`/course/course-delete/${id}`); // ✅ check route path
                if (res.data.success) {
                  Swal.fire("Deleted!", `${title} has been deleted.`, "success");
                  setCourses((prev) => prev.filter((user) => user._id !== id));
                } else {
                  Swal.fire("Failed!", "User could not be deleted.", "error");
                }
              } catch (err) {
                console.error(err);
                Swal.fire("Error!", "Something went wrong.", "error");
              }
            }
          });
        };
  return (
    <div>
          <div className="px-2 md:px-10 py-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between px-4 items-center mx-auto py-4 border rounded-3xl md:w-[70%] w-full border-blue-800 bg-purple-800 hover:bg-purple-950 shadow-sm">
              <h1 className="text-sm md:text-xl font-semibold">Course Panel</h1>
              <h1 className="text-sm md:text-xl flex items-center gap-2 font-semibold">
                Total courses: <FaDiscourse /> {courses?.length}
              </h1>
            </div>
    
            {/* Table Section */}
            <div className="mt-6 overflow-x-auto">
              <table className="table table-zebra w-full min-w-[600px] text-sm md:text-base">
                <thead className="bg-gray-800 text-blue-800">
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>type</th>
                    <th>Fee</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.map((course, index) => (
                    <tr key={course._id} className="hover:bg-gray-900">
                      <td>{index + 1}</td>
                      <td className="whitespace-nowrap">{course.title}</td>
                      <td className="whitespace-nowrap">{course.type}</td>
                      <td className="whitespace-nowrap">{course.fee}</td>
                      <td className="text-center  justify-center">
                        
                        <button
                          onClick={() => handleDeleteMentor(course._id,course.title)}
                          data-tip="Delete course"
                          className="tooltip btn btn-ghost btn-sm md:btn-md"
                        >
                          <MdOutlineDeleteSweep className="text-red-700 text-lg md:text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  )
}
