import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Registration successful: " + response.data.message);
      navigate("/login");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`mt-1 block w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 block w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 block w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
