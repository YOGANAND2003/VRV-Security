import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend URL
});

// Add token to headers for authenticated requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getDashboard = () => API.get('/protected/dashboard');
export const getAdminPage = () => API.get('/protected/admin');

// New API call to get all users (admin only)
export const getAllUsers = () => API.get('/auth/users');

// New API call to update user status (active/disabled)
export const updateUserStatus = async (userId, status) => {
    try {
        const response = await API.patch(`/users/${userId}/status`, { status });
        return response.data;  // Return the updated user data
    } catch (error) {
        throw error;  // Rethrow the error to be handled by the calling function
    }
};

// New API call to update user role (Admin/User/Moderator)
export const updateUserRole = async (userId, role) => {
    try {
        const response = await API.patch(`/users/${userId}/role`, { role });
        return response.data;  // Return the updated user data
    } catch (error) {
        throw error;  // Rethrow the error to be handled by the calling function
    }
};
