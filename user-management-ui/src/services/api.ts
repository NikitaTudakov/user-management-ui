import axios from 'axios';

const baseURL = 'http://localhost:3001'; 


const api = axios.create({baseURL});

export function apiSetHeader (name: string, value: string) {
  if (value) {
    api.defaults.headers[name] = value;
  }
};


api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
