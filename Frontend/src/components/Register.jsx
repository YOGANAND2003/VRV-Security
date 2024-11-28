import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { registerUser } from '../services/api';
import Navbar from './Navbar';

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'User' });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert('Registration successful!');
            navigate('/login'); // Navigate to login page after successful registration
        } catch (err) {
            alert('Error: ' + err.response.data.error);
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page when "Already have an account? Login" is clicked
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-gray-100">

                <div className="w-full max-w-md p-8 bg-[#0e4112] rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>

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
