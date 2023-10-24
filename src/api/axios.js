import axios from 'axios';
//Node Express URL
const BASE_URL = process.env.REACT_APP_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});