import { getResponse } from '@/app/components/_apihandler';
import axios from 'axios';

export const userDetails = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/getUserDetails', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const getAdminDetails = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('/api/admin/getAdminDetails', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error(error);
        return { success: false, msg: error.message };
    }
};

export const allUsers = async () => {
    try {
        const response = await getResponse('/api/allUsers');
        console.log(response, "response");
        return response;
    } catch (error) {
        return error;
    }
}

// getUserDetails();
