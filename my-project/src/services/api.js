import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/productos/";

export const getProducts = () => {
  return axios.get(`${BASE_URL}`);
};

export const createProducts = (data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return axios.post(`${BASE_URL}`, formData);
};

export const updateProducts = (id, data) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return axios.put(`${BASE_URL}${id}/`, formData);
};

export const deleteProducts = (id) => {
  return axios.delete(`${BASE_URL}${id}/`);
};
