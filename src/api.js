import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // In production (Vercel), frontend and backend are on the same domain.
  // In development, backend is on localhost:5000.
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
