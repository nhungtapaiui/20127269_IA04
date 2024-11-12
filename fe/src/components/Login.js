import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { API_ENDPOINT } from "../constant/api";
import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
  
    const onSubmit = async (data) => {
      try {
        const response = await axios.post(`${API_ENDPOINT}/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { token, user } = response.data;
        login(user, token);
        navigate("/profile");
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
      >
        <h2 className="login-title">Log in</h2>
        
        <div className="form-group">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-input ${errors.password ? "error" : ""}`}
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
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="login-button"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
