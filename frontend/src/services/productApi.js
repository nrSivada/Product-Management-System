import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products'

// Get all products
export const getProducts = () => {
  return axios.get(API_URL)
}

// Get one product
export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`)
}

// Add product
export const addProduct = (product) => {
  return axios.post(API_URL, product)
}

// Update product
export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product)
}

// Delete product
export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`)
}