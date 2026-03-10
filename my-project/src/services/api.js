import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/productos/";

export const getProducts = () => {
  return axios.get(`${BASE_URL}`);
};

export const createProducts = (data) => {
  return axios.post(`${BASE_URL}`, data);
};

export const updateProducts = (id, data) => {
  return axios.put(`${BASE_URL}${id}/`, data);
};

export const deleteProducts = (id) => {
  return axios.delete(`${BASE_URL}${id}/`);
};
