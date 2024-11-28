import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { registerUser } from '../services/api'; // API call for registration
import Navbar from './Navbar'; // Navbar component

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'User' }); // Form state
    const navigate = useNavigate(); // For programmatic navigation

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            await registerUser(form); // API call to register user
            alert('Registration successful!');
            navigate('/login'); // Redirect to login page on success
        } catch (err) {
            alert('Error: ' + err.response.data.error); // Display error message
        }
    };

    // Redirects to login page when "Already have an account?" is clicked
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <Navbar /> {/* Navbar for consistent navigation */}

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-[#0e4112] rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Password Field */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Role Selection Dropdown */}
                        <div>
                            <select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                            </select>
                        </div>
                        {/* Register Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Login Redirect */}
                    <div className="mt-4 text-center">
                        <span className="text-white">
                            Already have an account?{' '}
                            <button
                                onClick={handleLoginClick}
                                className="text-blue-500 hover:underline focus:outline-none"
                            >
                                Login
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
