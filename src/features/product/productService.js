import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'

const getAllProduct = async () => {
  const response = await axios.get(`${httpRequest}product`)

  return response.data
}

const createProduct = async (product) => {
  const response = await axios.post(
    `${httpRequest}product/create-product`,
    product
  )

  return response.data
}

const productService = {
  getAllProduct,
  createProduct,
}

export default productService
