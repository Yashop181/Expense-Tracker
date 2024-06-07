import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const addTransaction = (transaction) => API.post('/transactions', transaction);
export const getTransactions = () => API.get('/transactions');
export const updateTransaction = (id, transaction) => API.put(`/transactions/${id}`, transaction);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
