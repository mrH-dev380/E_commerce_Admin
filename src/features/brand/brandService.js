import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllBrand = async () => {
  const response = await axios.get(`${httpRequest}brand`)

  return response.data
}

const createBrand = async (brand) => {
  const response = await axios.post(`${httpRequest}brand`, brand, config.axios)
  return response.data
}

const brandService = {
  getAllBrand,
  createBrand,
}

export default brandService
