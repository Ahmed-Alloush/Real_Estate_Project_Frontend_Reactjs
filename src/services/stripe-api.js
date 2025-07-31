// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const stripeApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'stripe-signature':''
  },
});

// Add request interceptor for authentication if needed
stripeApi.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
stripeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const stripeAPI = {
  // Create payment intent
  createPaymentIntent: async (amount, currency = 'usd') => {
    try {
      const response = await stripeApi.post('/stripe/create-payment-intent', {
        amount,
        currency,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create payment intent');
    }
  },

  // Create customer
  createCustomer: async (email, name) => {
    try {
      const response = await stripeApi.post('/stripe/create-customer', {
        email,
        name,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create customer');
    }
  },

  // Get payment status
  getPaymentStatus: async (paymentIntentId) => {
    try {
      const response = await stripeApi.get(`/stripe/payment-status/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  },
};

export default stripeApi;