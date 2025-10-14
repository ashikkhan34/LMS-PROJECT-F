import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/auth/login", data);
      console.log("🔹 Login Response:", res.data);

      if (res.data.success) {
        // 🔹 Save token + user data in localStorage
        localStorage.setItem("lms-token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));

        // 🔹 Show success toast
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        // 🔹 Navigate user based on role
        // const role = res.data.data.user.role;
        // if (role === "student") navigate("/studentDashboard");
        // else if (role === "mentor") navigate("/mentorDashboard");
        // else if (role === "admin") navigate("/adminDashboard");
        // else navigate("/");
        navigate('/')
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.data.message || "Invalid credentials!",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3 text-lg text-gray-500"
          >
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full mt-2"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
