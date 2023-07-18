import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllCategory = async () => {
  const response = await axios.get(`${httpRequest}category`)

  return response.data
}

const getCategoryById = async (id) => {
  const response = await axios.get(`${httpRequest}category/${id}`, config.axios)
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

const updateCategory = async (category) => {
  const response = await axios.put(
    `${httpRequest}category/${category.id}`,
    { title: category.categoryData.title },
    config.axios
  )
  return response.data
}

const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${httpRequest}category/${id}`,
    config.axios
  )
  return response.data
}

const productCategoryService = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}

export default productCategoryService
