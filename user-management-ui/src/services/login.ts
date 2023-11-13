import { LoginForm } from "../interfaces/loginForm";
import { User } from "../interfaces/users";
import api, { apiSetHeader } from './api'

// login user
export const login = async (loginData: LoginForm) => {
    try {
        const response = await api.post(`/auth/login`, loginData);
        if(response.data?.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            apiSetHeader('Authorization', `Bearer ${response.data.accessToken}`);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false

    }
}

// register user
export const register = async (user:User) => {
    try {
        const response = await api.post(`/auth/register`, user);
        if(response.data?.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            apiSetHeader('Authorization', `Bearer ${response.data.accessToken}`);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Error during registartion:', error);
        return false
    }
}

export const isValidToken = async (accessToken:string) => {
    try {
        const response = await api.post(`/auth/validation`, {accessToken});
        return response.data
    } catch (error) {
        console.error('Error during token validation:', error);
        return false
    }
}

export const forgotPassword =  (email:string) => {
    return  api.post(`/auth/forgot-password`, {email});
}

export const resetPassword =  (password:string, token:string) => {
    return  api.post(`/auth/reset-password`, {password, token});
}