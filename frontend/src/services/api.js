import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// API functions
export const getTasks = async () => {
  console.log('Making GET request to /api/tasks');
  try {
    const response = await api.get('/tasks');
    console.log('API response received:', response.status, response.data);
    console.log('Response data type:', typeof response.data, Array.isArray(response.data));
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

export const addTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};