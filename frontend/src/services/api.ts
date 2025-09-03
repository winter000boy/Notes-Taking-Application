import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  signup: async (email: string) => {
    const response = await api.post('/auth/signup', { email });
    return response.data;
  },

  verifyOTP: async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  googleAuth: async (token: string) => {
    const response = await api.post('/auth/google', { token });
    return response.data;
  },
};

export const notesService = {
  getNotes: async () => {
    const response = await api.get('/notes');
    return response.data;
  },

  createNote: async (title: string, content: string) => {
    const response = await api.post('/notes', { title, content });
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};
