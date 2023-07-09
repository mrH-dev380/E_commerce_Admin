import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'

const getAllUser = async () => {
  const response = await axios.get(`${httpRequest}user/all-user`)

  return response.data
}

const customerService = {
  getAllUser,
}

export default customerService
