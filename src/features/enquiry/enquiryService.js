import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'

const getAllEnquiry = async () => {
  const response = await axios.get(`${httpRequest}enquiry`)

  return response.data
}

const enquiryService = {
  getAllEnquiry,
}

export default enquiryService
