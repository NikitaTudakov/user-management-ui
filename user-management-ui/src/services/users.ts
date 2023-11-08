import { User } from '../interfaces/users';
import api, { apiSetHeader } from './api'


// get all users
export const getUsers = async () => {
    try {
        const response = await api.get(`/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// create new user
export const createUser = async (user:User) => {
    try {
        const response = await api.post(`/users`, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// update user by id
export const updateUser = async (userId:string, user:User) => {
    try {
        const response = await api.put(`/users/${userId}`, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// delete user by id
export const deleteUser = async (userId:string) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};


