import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllEnquiry = async () => {
  const response = await axios.get(`${httpRequest}enquiry`)

  return response.data
}

const getEnquiryById = async (id) => {
  const response = await axios.get(`${httpRequest}enquiry/${id}`)

  return response.data
}

const updateEnquiry = async (enquiry) => {
  const response = await axios.put(
    `${httpRequest}enquiry/${enquiry.id}`,
    {
      status: enquiry.status,
    },
    config.axios
  )

  return response.data
}

const deleteEnquiry = async (id) => {
  const response = await axios.delete(
    `${httpRequest}enquiry/${id}`,
    config.axios
  )

  return response.data
}

const enquiryService = {
  getAllEnquiry,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
}

export default enquiryService
