import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllBlogCategory = async () => {
  const response = await axios.get(`${httpRequest}blogCategory`)

  return response.data
}

const getBlogCategoryById = async (id) => {
  const response = await axios.get(
    `${httpRequest}blogCategory/${id}`,
    config.axios
  )
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

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${httpRequest}blogCategory/${blogCategory.id}`,
    { title: blogCategory.blogCategoryData.title },
    config.axios
  )
  return response.data
}

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${httpRequest}blogCategory/${id}`,
    config.axios
  )
  return response.data
}
const blogCategoryService = {
  getAllBlogCategory,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
}

export default blogCategoryService
