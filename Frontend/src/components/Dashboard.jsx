import React, { useEffect, useState } from 'react';
import { getDashboard, getAllUsers } from '../services/api'; // Import API functions
import Navbar from './Navbar'; // Import Navbar component

const Dashboard = () => {
    const [message, setMessage] = useState(''); // State to store a welcome message
    const [users, setUsers] = useState([]); // State to store the list of users
    const [isAdmin, setIsAdmin] = useState(false); // State to determine if the user is an admin

    // Fetch dashboard data and user information
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for the current user
                const { data } = await getDashboard();
                setMessage(data.message); // Set the welcome message

                // Check if the user has admin or moderator privileges
                if (data.role === 'Moderator' || data.role === 'Admin') {
                    setIsAdmin(true); // Mark the user as an admin

                    // Fetch all registered users if the user is an admin
                    const usersResponse = await getAllUsers();
                    setUsers(usersResponse.data.users); // Store the list of users
                }
            } catch (err) {
                // Show an error alert if an API request fails
                alert('Error: ' + (err.response?.data?.error || 'Something went wrong'));
            }
        };

        fetchData(); // Call the fetch function when the component is mounted
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            {/* Navbar component */}
            <Navbar /> 
        
            <div className="p-6">
                {/* Welcome messages */}
                <h1 className="text-2xl font-bold mb-4">You are Moderator</h1>
                <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
                <p className="mb-6">{message}</p>

                {/* Display the list of users if the user is an admin */}
                {isAdmin && (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">#</th>
                                    <th className="border border-gray-300 px-4 py-2">Username</th>
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map over users to display their details */}
                                {users.map((user, index) => (
                                    <tr key={user.id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
