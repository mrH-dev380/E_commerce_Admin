import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const getAllCoupon = async () => {
  const response = await axios.get(`${httpRequest}coupon`, config.axios)

  return response.data
}

const getCouponById = async (id) => {
  const response = await axios.get(`${httpRequest}coupon/${id}`, config.axios)

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

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${httpRequest}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      discount: coupon.couponData.discount,
      expiry: coupon.couponData.expiry,
    },
    config.axios
  )
  return response.data
}

const deleteCoupon = async (id) => {
  const response = await axios.delete(
    `${httpRequest}coupon/${id}`,
    config.axios
  )

  return response.data
}

const couponService = {
  getAllCoupon,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
}

export default couponService
