import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'

const getAllCategory = async () => {
  const response = await axios.get(`${httpRequest}blogCategory`)

  return response.data
}

const blogCategoryService = {
  getAllCategory,
}

export default blogCategoryService
