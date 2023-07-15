import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllBlog = async () => {
  const response = await axios.get(`${httpRequest}blog`)

  return response.data
}

const createBlog = async (blog) => {
  const response = await axios.post(`${httpRequest}blog`, blog, config.axios)
  return response.data
}

const blogService = {
  getAllBlog,
  createBlog,
}

export default blogService
