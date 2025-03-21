
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import "../components/Register.css"; 

const Register = () => {
    const [message, setMessage] = useState("");
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!");
            navigate("/login");
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign-in failed!");
            console.error(error);
        }
    };

    return (
        <div className='register-container'>
            <div className='register-box'>
                <h2 className='register-title'>Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input 
                            {...register("email", { required: true })} 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Email Address'
                        />
                        {errors.email && <p className="error-text">Email is required</p>}
                    </div>

                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input 
                            {...register("password", { required: true })} 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Password'
                        />
                        {errors.password && <p className="error-text">Password is required</p>}
                    </div>

                    {message && <p className='error-text'>{message}</p>}

                    <button type="submit" className='register-btn'>Register</button>
                </form>

                <p className='login-link'>
                    Have an account? Please <Link to="/login">Login</Link>
                </p>

                <button 
                    onClick={handleGoogleSignIn}
                    className='google-btn'>
                    <FaGoogle className='google-icon' />
                    Sign in with Google
                </button>

                <p className='footer-text'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Register;
