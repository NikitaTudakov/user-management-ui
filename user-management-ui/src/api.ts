import axios from 'axios';
import { User } from './interfaces/users';

const API_URL = 'http://localhost:3000'; 

// get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// create new user
export const createUser = async (user:User) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// update user by id
export const updateUser = async (userId:number, user:User) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// delete user by id
export const deleteUser = async (userId:number) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
