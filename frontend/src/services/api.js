import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
};

export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  create: (restaurant) => api.post('/restaurants', restaurant),
  update: (id, restaurant) => api.put(`/restaurants/${id}`, restaurant),
  delete: (id) => api.delete(`/restaurants/${id}`),
};

export const orderAPI = {
  create: (order) => api.post('/orders', order),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getRestaurantOrders: (restaurantId) => api.get(`/orders/restaurant/${restaurantId}`),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, status),
};

export default api;

