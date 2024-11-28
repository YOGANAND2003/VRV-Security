import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Using axios for API calls

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            if (!token) {
                setError('You must be logged in');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data.users);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
