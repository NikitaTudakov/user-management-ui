import axios from 'axios';

const JWTToken = localStorage.getItem('jwt');
const baseURL = 'http://localhost:3001'; 


const api = axios.create({baseURL});

export function apiSetHeader (name: string, value: string) {
  if (value) {
    api.defaults.headers[name] = value;
  }
};

if (JWTToken) {
  apiSetHeader('Authorization', `Bearer ${JWTToken}`);
}

api.interceptors.request.use(config => {
    // Если пользователь делает запрос и у него нет заголовка с токеном, то...
    if (!config.headers['Authorization']) {
        // Тут пишем редирект если не авторизован
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
