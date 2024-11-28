import React from 'react';
import { Link } from 'react-router-dom'; // Enables client-side navigation

const Navbar = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                {/* App logo or title (Home link) */}
                <Link 
                    to="/" 
                    className="text-2xl font-bold text-blue-400 hover:text-blue-600 cursor-pointer"
                >
                    HelloUser
                </Link>

                {/* Navigation Links */}
                <div>
                    {/* Link to Register Page */}
                    <Link
                        to="/register"
                        className="mr-4 text-white hover:text-blue-400"
                    >
                        Register
                    </Link>

                    {/* Link to Login Page */}
                    <Link
                        to="/login"
                        className="text-white hover:text-blue-400"
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
