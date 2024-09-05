// axiosServices.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030', // Back office URL
});

export const setAuthToken = (token) => {
  console.log("we did it",token)
  if (token) {
    console.log("we here zkejngkejgn")
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log("we here zkejngkejgn1")
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
