import React, { useState } from 'react';
import { loginUser } from '../services/api'; // API service to handle login
import { Link } from 'react-router-dom'; // Link for navigation
import Navbar from './Navbar'; // Navbar component

const Login = () => {
    // State to manage the login form inputs (email and password)
    const [form, setForm] = useState({ email: '', password: '' });

    // Retrieve token from local storage (useful for maintaining login state)
    const token = localStorage.getItem('token');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Call the login API with the form data
            const { data } = await loginUser(form);
            // Store the token in local storage for authentication purposes
            localStorage.setItem('token', data.token);
            alert('Login successful!'); // Notify the user about successful login
            window.location.href = '/admin'; // Redirect to admin dashboard
        } catch (err) {
            // Show an error alert if the login fails
            alert('Error: ' + (err.response?.data?.error || 'Something went wrong'));
        }
    };

    return (
        <div>
            {/* Navbar component */}
            <Navbar />

            {/* Main container for login form */}
            <div className="flex items-center justify-center min-h-screen bg-[#e3e9c8]">
                <form
                    onSubmit={handleSubmit} // Handle form submission
                    className="bg-[#dcbc97] p-8 rounded shadow-md w-full max-w-md"
                >
                    {/* Form title */}
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Login
                    </h2>

                    {/* Email input */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={form.email} // Bind input to email state
                            onChange={(e) => setForm({ ...form, email: e.target.value })} // Update email state on input
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Password input */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={form.password} // Bind input to password state
                            onChange={(e) => setForm({ ...form, password: e.target.value })} // Update password state on input
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>

                    {/* Link to registration page */}
                    <div className="text-center mt-4">
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-500 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
