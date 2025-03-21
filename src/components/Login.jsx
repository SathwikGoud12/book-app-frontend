import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "../components/Login.css";

const Login = () => {
    const [message, setMessage] = useState("");
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setMessage(""); // Clear previous error messages
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            // Firebase error handling
            if (error.code === "auth/user-not-found") {
                setMessage("User not found. Please register first.");
            } else if (error.code === "auth/wrong-password") {
                setMessage("Incorrect password. Try again.");
            } else if (error.code === "auth/invalid-email") {
                setMessage("Invalid email format.");
            } else if (error.code === "auth/too-many-requests") {
                setMessage("Too many failed login attempts. Try again later.");
            } else {
                setMessage("Login failed. Check your credentials.");
            }
            console.error("Login error:", error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setMessage(""); // Clear errors before new attempt
        try {
            await signInWithGoogle();
            alert("Google Sign-in successful!");
            navigate("/");
        } catch (error) {
            setMessage("Google sign-in failed. Try again.");
            console.error("Google Sign-in Error:", error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="current-password" // Added for better browser support
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>

                    {/* Display Firebase Auth Error Message */}
                    {message && <p className="error-text">{message}</p>}

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="register-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

                <button onClick={handleGoogleSignIn} className="google-btn">
                    <FaGoogle className="google-icon" /> Sign in with Google
                </button>

                <p className="footer-text">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Login;
