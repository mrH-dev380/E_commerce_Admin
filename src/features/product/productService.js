import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '../../config/'

const getAllProduct = async () => {
  const response = await axios.get(`${httpRequest}product`)

  return response.data
}

const getProductById = async (id) => {
  const response = await axios.get(`${httpRequest}product/${id}`, config.axios)
  return response.data
}

const createProduct = async (product) => {
  const response = await axios.post(
    `${httpRequest}product/create-product`,
    product,
    config.axios
  )

  return response.data
}

const updateProduct = async (product) => {
  const response = await axios.put(
    `${httpRequest}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      tags: product.productData.tags,
      color: product.productData.color,
      quantity: product.productData.quantity,
      images: product.productData.images,
    },
    config.axios
  )

  return response.data
}

const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${httpRequest}product/${id}`,
    config.axios
  )

  return response.data
}

const productService = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}

export default productService
