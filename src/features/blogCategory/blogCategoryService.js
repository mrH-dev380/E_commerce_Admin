import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllBlogCategory = async () => {
  const response = await axios.get(`${httpRequest}blogCategory`)

  return response.data
}

const createBlogCategory = async (category) => {
  const response = await axios.post(
    `${httpRequest}blogCategory`,
    category,
    config.axios
  )
  return response.data
}

const blogCategoryService = {
  getAllBlogCategory,
  createBlogCategory,
}

export default blogCategoryService
