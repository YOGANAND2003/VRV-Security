import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserStatus, updateUserRole } from '../services/api'; // Assuming API functions are available
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([]); // Always an array
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await getAllUsers();
                console.log(data); // Debugging API response
                if (Array.isArray(data.temp) && Array.isArray(data.temp[0])) {
                    setUsers(data.temp[0]); // Correctly access the users inside data.temp[0]
                } else {
                    console.error("Unexpected API response structure:", data);
                    setUsers([]); // Fallback to an empty array if the structure is unexpected
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err);
                setLoading(false);
            }
        };
    
        fetchUsers();
    
        // Display welcome message to admin
        // alert('Welcome Admin');    
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleStatusToggle = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'disabled' : 'active';
            await updateUserStatus(userId, { status: newStatus });
            setUsers(users.map((user) => 
                user._id === userId ? { ...user, status: newStatus } : user
            ));
        } catch (err) {
            alert('Error updating status: ' + err.message);
            console.error('Error updating status:', err);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            // Update role of the user via API
            await updateUserRole(userId, { role: newRole });
            setUsers(users.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (err) {
            alert('Error updating role: ' + err.message);
            console.error('Error updating role:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!users || users.length === 0) {
        navigate('/dashboard');  // Navigate before returning
        return <div>You are not admin</div>;
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
                                {user.status === 'active' ? (
                                    <span className="text-green-600">Active</span>
                                ) : (
                                    <span className="text-red-600">Disabled</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => handleStatusToggle(user._id, user.status)}
                                    className="bg-green-600 text-white py-1 px-3 rounded mr-2"
                                >
                                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
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
