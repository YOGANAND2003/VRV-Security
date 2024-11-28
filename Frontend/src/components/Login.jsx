import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(form);
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.href = '/admin';
        } catch (err) {
            alert('Error: ' + (err.response?.data?.error || 'Something went wrong'));
        }
    };

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center min-h-screen bg-[#e3e9c8]">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#dcbc97] p-8 rounded shadow-md w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Login
                    </h2>
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
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
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
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
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
