// userApi.js
const api = require('./axiosConfig');

// Fetch all users
const getAllUsers = async (token) => {
    try {
        const response = await api.get('/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

// Fetch a user by ID
const getUserById = async (id, token) => {
    try {
        const response = await api.get(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

// Export functions
module.exports = {
    getAllUsers,
    getUserById,
};
