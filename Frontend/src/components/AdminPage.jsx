import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserStatus, updateUserRole } from '../services/api'; // Importing API functions to interact with the backend
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation

const AdminPage = () => {
    // State to hold users and loading status
    const [users, setUsers] = useState([]); // Always an array
    const [loading, setLoading] = useState(true); // Loading flag
    const navigate = useNavigate(); // Navigate hook for redirection

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch all users from the API
                const { data } = await getAllUsers();
                console.log(data); // Debugging API response
                
                // Validate response structure and set users
                if (Array.isArray(data.temp) && Array.isArray(data.temp[0])) {
                    setUsers(data.temp[0]); // Correctly access the users inside data.temp[0]
                } else {
                    console.error("Unexpected API response structure:", data);
                    setUsers([]); // Fallback to an empty array if the structure is unexpected
                }
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                console.error('Error fetching users:', err); // Log error if API fails
                setLoading(false); // Set loading to false in case of error
            }
        };
    
        fetchUsers(); // Call the function to fetch users
    
        // Display welcome message to admin
        // alert('Welcome Admin');    
    }, []); // Empty dependency array ensures this effect runs once after component mounts

    // Function to handle logout, clears JWT token from localStorage and navigates to login page
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Function to toggle user status (active/disabled)
    const handleStatusToggle = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'disabled' : 'active'; // Toggle status
            await updateUserStatus(userId, { status: newStatus }); // Call API to update status
            setUsers(users.map((user) => 
                user._id === userId ? { ...user, status: newStatus } : user // Update the status in local state
            ));
        } catch (err) {
            alert('Error updating status: ' + err.message); // Show alert if an error occurs
            console.error('Error updating status:', err);
        }
    };

    // Function to handle role change for a user
    const handleRoleChange = async (userId, newRole) => {
        try {
            // Update the user's role via API
            await updateUserRole(userId, { role: newRole });
            setUsers(users.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user // Update the role in local state
            ));
        } catch (err) {
            alert('Error updating role: ' + err.message); // Show alert if an error occurs
            console.error('Error updating role:', err);
        }
    };

    // If still loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If no users or the users list is empty, redirect to dashboard
    if (!users || users.length === 0) {
        navigate('/dashboard');  // Navigate before returning
        return <div>You are not admin</div>; // Show this message if the user is not an admin
    }
    

    return (
        <div className="min-h-screen p-8">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            {/* Container for aligning logout to the right */}
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
            {/* Table to display users */}
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Username</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">ChangeRole</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="px-4 py-2 border">{user._id}</td>
                            <td className="px-4 py-2 border">{user.username}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border">
                                {/* Display status as active or disabled */}
                                {user.status === 'active' ? (
                                    <span className="text-green-600">Active</span>
                                ) : (
                                    <span className="text-red-600">Disabled</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border">
                                {/* Button to toggle user status */}
                                <button
                                    onClick={() => handleStatusToggle(user._id, user.status)}
                                    className="bg-green-600 text-white py-1 px-3 rounded mr-2"
                                >
                                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                                {/* Dropdown to change user role */}
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="py-1 px-3 rounded"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                    <option value="Moderator">Moderator</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
