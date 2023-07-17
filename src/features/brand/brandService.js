import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllBrand = async () => {
  const response = await axios.get(`${httpRequest}brand`)

  return response.data
}

const getBrandById = async (id) => {
  const response = await axios.get(`${httpRequest}brand/${id}`, config.axios)

  return response.data
}

const createBrand = async (brand) => {
  const response = await axios.post(`${httpRequest}brand`, brand, config.axios)
  return response.data
}

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${httpRequest}brand/${brand.id}`,
    { title: brand.brandData.title },
    config.axios
  )
  return response.data
}

const deleteBrand = async (id) => {
  const response = await axios.delete(`${httpRequest}brand/${id}`, config.axios)
  return response.data
}

const brandService = {
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
}

export default brandService
