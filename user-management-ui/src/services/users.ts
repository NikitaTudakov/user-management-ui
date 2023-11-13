import { User } from '../interfaces/users';
import api from './api'

// get all users
export const getUsers = () => {
    return api.get(`/users`);
};

// create new user
export const createUser = (user:User) => {
    return  api.post(`/users/new-user`, user);
};

// update user by id
export const updateUser = (userId:string, user:User) => {
    return  api.put(`/users/${userId}`, user);
};

// delete user by id
export const deleteUser = (userId:string) => {
    return  api.delete(`/users/${userId}`);
};


