import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                {/* Clickable HelloUser heading */}
                <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-600 cursor-pointer">
                    HelloUser
                </Link>
                
                {/* Navigation links */}
                <div>
                    <Link
                        to="/register"
                        className="mr-4 text-white hover:text-blue-400"
                    >
                        Register
                    </Link>
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
