import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllColor = async () => {
  const response = await axios.get(`${httpRequest}color`)

  return response.data
}

const getColorById = async (id) => {
  const response = await axios.get(`${httpRequest}color/${id}`, config.axios)

  return response.data
}

const createColor = async (color) => {
  const response = await axios.post(`${httpRequest}color`, color, config.axios)

  return response.data
}

const updateColor = async (color) => {
  const response = await axios.put(
    `${httpRequest}color/${color.id}`,
    { title: color.colorData.title, code: color.colorData.code },
    config.axios
  )

  return response.data
}

const deleteColor = async (id) => {
  const response = await axios.delete(`${httpRequest}color/${id}`, config.axios)

  return response.data
}

const colorService = {
  getAllColor,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
}

export default colorService
