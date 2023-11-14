import axios from 'axios';

const baseLocalURL = 'http://localhost:3001';
const baseProdUrl = 'https://us-central1-user-management-ab316.cloudfunctions.net/api'


const api = axios.create({baseURL:baseProdUrl});

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
