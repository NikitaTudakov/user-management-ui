import { User } from '../interfaces/users';
import api from './api'

// get all users
export const getUsers = async () => {
    return api.get(`/users`);
};

// create new user
export const createUser = async (user:User) => {
    return await api.post(`/users/new-user`, user);
};

// update user by id
export const updateUser = async (userId:string, user:User) => {
    return await api.put(`/users/${userId}`, user);
};

// delete user by id
export const deleteUser = async (userId:string) => {
    return await api.delete(`/users/${userId}`);
};


