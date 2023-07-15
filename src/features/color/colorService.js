import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllColor = async () => {
  const response = await axios.get(`${httpRequest}color`)

  return response.data
}

const createColor = async (color) => {
  const response = await axios.post(`${httpRequest}color`, color, config.axios)

  return response.data
}

const colorService = {
  getAllColor,
  createColor,
}

export default colorService
