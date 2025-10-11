import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [showPass,setShowPass] = useState()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div >
          <input
            {...register("password", {
              required: 'Password is required',
              minLength: 6,
              maxLength: 20,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{6,}$/,
            })}
            type={showPass ? "text" : "password"}
            placeholder="password"
            className="input input-bordered w-full"
            
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute text-lg -ml-8 mt-3 "
          >
            {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
          </button>
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 characters</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must be 1 uppercase 1 lowercase 1 special character and 1
              number
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500">Password less then 20 characters</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full mt-2"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
}
