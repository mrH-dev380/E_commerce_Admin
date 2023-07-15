import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllCategory = async () => {
  const response = await axios.get(`${httpRequest}category`)

  return response.data
}

const createCategory = async (category) => {
  const response = await axios.post(
    `${httpRequest}category`,
    category,
    config.axios
  )
  return response.data
}

const productCategoryService = {
  getAllCategory,
  createCategory,
}

export default productCategoryService
