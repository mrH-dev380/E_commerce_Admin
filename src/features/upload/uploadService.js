import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '../../config/'

const uploadImg = async (data) => {
  const response = await axios.post(
    `${httpRequest}uploadImg`,
    data,
    config.axios
  )

  return response.data
}

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${httpRequest}uploadImg/delete-photo/${id}`,
    config.axios
  )
  return response.data
}

const uploadService = {
  uploadImg,
  deleteImg,
}

export default uploadService
