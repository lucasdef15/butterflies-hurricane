import axios from 'axios';

const authToken = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    common: {
      Authorization: `Bearer ${authToken}`,
    },
  },
});


export default instance;
