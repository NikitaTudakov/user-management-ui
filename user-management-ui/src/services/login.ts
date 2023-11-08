import { LoginForm } from "../interfaces/loginForm";
import { User } from "../interfaces/users";
import api, { apiSetHeader } from './api'

// login user
export const login = async (loginData: LoginForm) => {
    try {
        const response = await api.post(`/auth/login`, loginData);
        localStorage.setItem('jwt', response.data.accessToken);
        apiSetHeader('Authorization', `Bearer ${response.data.accessToken}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// register user
export const register = async (user:User) => {
    try {
        const response = await api.post(`/auth/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}