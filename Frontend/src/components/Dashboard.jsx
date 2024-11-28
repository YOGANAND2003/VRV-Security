import React, { useEffect, useState } from 'react';
import { getDashboard, getAllUsers } from '../services/api';
import Navbar from './Navbar';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]); // State to store users
    const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getDashboard();
                setMessage(data.message);

                // Check if the user is an admin
                if (data.role === 'Moderator' || data.role === 'Admin') {
                    setIsAdmin(true);

                    // Fetch all registered users
                    const usersResponse = await getAllUsers();
                    setUsers(usersResponse.data.users);
                }
            } catch (err) {
                alert('Error: ' + (err.response?.data?.error || 'Something went wrong'));
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar /> 
        
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">You are Moderator</h1>
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <p className="mb-6">{message}</p>

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
