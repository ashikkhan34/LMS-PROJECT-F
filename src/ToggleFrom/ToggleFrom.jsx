import React, { useState } from "react";
import Register from "../Register/Register";
import img from '../assets/images/login.png'
import Login from "../Register/Login";
export default function ToggleFrom() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen md:flex items-center justify-evenly bg-gray-900">
        <div>
            <img src={img} className="w-[500px]" alt="" />
        </div>
      <div className=" mt-20 p-8 rounded-xl shadow-lg w-full max-w-md bg-gray-700">
        {/* Header Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 font-semibold ${
              isLogin ? "border-b-2 border-primary text-primary" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 font-semibold ${
              !isLogin ? "border-b-2 border-primary text-primary" : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        {/* Conditional Form */}
        {isLogin ? (
          <Login></Login>
        ) : (
          <>
          <div>
            <Register></Register>
          </div>
          </>
        )}

        {/* Toggle Text */}
        <div className="text-center mt-3">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button onClick={handleToggle} className="text-primary font-semibold">
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={handleToggle} className="text-primary font-semibold">
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
