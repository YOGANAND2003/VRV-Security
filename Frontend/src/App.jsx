import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPage from './components/AdminPage';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false); // State to determine if the user is an admin

    useEffect(() => {
        // Simulate checking user role from session or API (you can modify it as per your actual logic)
        const userRole = localStorage.getItem('role'); // This could be from a logged-in session
        if (userRole === 'Admin') {
            setIsAdmin(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Default landing page */}
                <Route
                    path="/"
                    element={
                        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white flex items-center justify-center py-12 px-6">
                            <div className="text-center max-w-lg bg-white p-8 rounded-lg shadow-lg">
                                <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Welcome to Our Application</h1>
                                <p className="text-lg text-gray-700 mb-6">Please choose an option below:</p>

                                {/* Show options based on whether the user is an admin */}
                                {isAdmin ? (
                                    <div>
                                        <Link to="/dashboard" className="block text-xl text-blue-600 hover:text-blue-800 mb-4">
                                            <span className="font-semibold">Dashboard</span>
                                        </Link>
                                        <Link to="/admin" className="block text-xl text-blue-600 hover:text-blue-800">
                                            <span className="font-semibold">Admin Page</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <Link to="/login" className="block text-2xl text-green-600 hover:text-green-900 mb-4">
                                            <span className="font-semibold">Login</span>
                                        </Link>
                                        <Link to="/register" className="block text-2xl text-red-600 hover:text-red-900">
                                            <span className="font-semibold">Register</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                />
                {/* Other routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

export default App;
