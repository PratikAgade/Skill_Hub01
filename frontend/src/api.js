import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});
api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) {
            console.warn('LocalStorage access blocked:', e);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;