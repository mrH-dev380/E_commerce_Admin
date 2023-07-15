import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '../../config/'

const getAllProduct = async () => {
  const response = await axios.get(`${httpRequest}product`)

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

const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${httpRequest}product/${id}`,
    config.axios
  )

  return response.data
}

const productService = {
  getAllProduct,
  createProduct,
  deleteProduct,
}

export default productService
