import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllBlog = async () => {
  const response = await axios.get(`${httpRequest}blog`)

  return response.data
}

const getBlogById = async (id) => {
  const response = await axios.get(`${httpRequest}blog/${id}`, config.axios)

  return response.data
}

const createBlog = async (blog) => {
  const response = await axios.post(`${httpRequest}blog`, blog, config.axios)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${httpRequest}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config.axios
  )

  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${httpRequest}blog/${id}`, config.axios)

  return response.data
}

const blogService = {
  getAllBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}

export default blogService
