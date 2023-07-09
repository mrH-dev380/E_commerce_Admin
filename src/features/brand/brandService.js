import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'

const getAllBrand = async () => {
  const response = await axios.get(`${httpRequest}brand`)

  return response.data
}

const brandService = {
  getAllBrand,
}

export default brandService
