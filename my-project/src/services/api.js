import axios from "axios";

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
)


api.interceptors.response.use (
  (response) => {
    return response
  },

  async (error) => {
    const originalRequest = error.config; 

    if(error.response && error.response.status === 401 && !originalRequest.retry){
      originalRequest.retry = true;

      try{
        const refreshToken = localStorage.getItem('refresh_token');

        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken
        });

        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

        return api(originalRequest);
      } catch (refreshToken) {

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshToken);
      }
    }

    return Promise.reject(error);
  }
)

const PRODUCTS_URL = '/api/productos';

export const getProducts = () => {
  return api.get(`${PRODUCTS_URL}/`)
};

export const createProducts = (data) => {
  return api.post(`${PRODUCTS_URL}/productos/`, data);
};

export const updateProducts = (id, data) => {
  return api.put(`${PRODUCTS_URL}/productos/${id}/`, data);
};

export const deleteProducts = (id) => {
  return api.delete(`${PRODUCTS_URL}/productos/${id}/`);
};

export default api;