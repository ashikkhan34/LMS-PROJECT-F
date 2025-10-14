import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AllUsers() {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const AllUsersFetch = async () => {
      const res = await axiosPublic.get("/user");
      setUsers(res.data.data || null);
    };
    AllUsersFetch();
  }, [axiosPublic]);

  // ✅ Promote student to mentor
  const handlePromoteToMentor = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to make ${user.name} a Mentor?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Mentor!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.put(`/user/update-user/${user._id}`, {
            role: "mentor",
          });
          if (res.data.success) {
            Swal.fire("Updated!", `${user.name} is now a Mentor.`, "success");
            // Frontend state update
            setUsers((prev) =>
              prev.map((u) =>
                u._id === user._id ? { ...u, role: "mentor" } : u
              )
            );
          } else {
            Swal.fire("Failed!", "Could not update role.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  //delete a user
  const handleDeleteUser = async (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting ${name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/user/delete-user/${id}`); // ✅ check route path
          if (res.data.success) {
            Swal.fire("Deleted!", `${name} has been deleted.`, "success");
            setUsers((prev) => prev.filter((user) => user._id !== id));
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
    <div className="px-2 md:px-10 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between px-4 items-center mx-auto py-4 border rounded-3xl md:w-[70%] w-full border-blue-800 bg-purple-800 hover:bg-purple-950 shadow-sm">
        <h1 className="text-sm md:text-xl font-semibold">User Panel</h1>
        <h1 className="text-sm md:text-xl flex items-center gap-2 font-semibold">
          Total Users: <FaUser /> {users.length}
        </h1>
      </div>

      {/* Table Section */}
      <div className="mt-6 overflow-x-auto">
        <table className="table table-zebra w-full min-w-[600px] text-sm md:text-base">
          <thead className="bg-gray-800 text-blue-800">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-900">
                <td>{index + 1}</td>
                <td className="whitespace-nowrap">{user.name}</td>
                <td className="whitespace-nowrap">{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="text-center flex items-center gap-2 justify-center">
                  {user.role === "student" && (
                    <button
                      onClick={() => handlePromoteToMentor(user)}
                      className="tooltip btn btn-ghost btn-sm md:btn-md"
                      data-tip="Make Mentor"
                    >
                      <GrDocumentUpdate className="text-green-700" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    data-tip="Delete user"
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
  );
}
