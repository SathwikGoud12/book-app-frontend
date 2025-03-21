import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';
import "../components/AdminLogin.css";

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            const auth = response.data;

            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired! Please login again.');
                    navigate("/");
                }, 3600 * 1000);
            }

            alert("Admin Login successful!");
            navigate("/dashboard");

        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-card">
                <h2 className="admin-title">Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text" name="username" id="username" placeholder="Username"
                            className="form-input"
                        />
                        {errors.username && <p className="error-text">Username is required</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name="password" id="password" placeholder="Password"
                            className="form-input"
                        />
                        {errors.password && <p className="error-text">Password is required</p>}
                    </div>

                    {message && <p className="error-text">{message}</p>}

                    <div className="form-group">
                        <button className="login-button">Login</button>
                    </div>
                </form>

                <p className="footer-text">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AdminLogin;
