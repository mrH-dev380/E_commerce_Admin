import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'

const getAllBlog = async () => {
  const response = await axios.get(`${httpRequest}blog`)

  return response.data
}

const blogService = {
  getAllBlog,
}

export default blogService
