import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllCoupon = async () => {
  const response = await axios.get(`${httpRequest}coupon`, config.axios)

  return response.data
}

const createCoupon = async (coupon) => {
  const response = await axios.post(
    `${httpRequest}coupon`,
    coupon,
    config.axios
  )
  return response.data
}

const couponService = {
  getAllCoupon,
  createCoupon,
}

export default couponService
