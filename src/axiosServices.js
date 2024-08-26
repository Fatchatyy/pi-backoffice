// axiosServices.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030', // Back office URL
});

export const setAuthToken = (token) => {
  console.log("we did it",token)
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
