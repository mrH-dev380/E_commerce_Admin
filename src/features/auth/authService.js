import axios from 'axios'
import { httpRequest } from '~/utils/httpRequest'
import config from '~/config'

const login = async (user) => {
  const response = await axios.post(`${httpRequest}auth/admin-login`, user)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const getAllOrder = async () => {
  const response = await axios.get(
    `${httpRequest}user/all-orders`,
    config.axios
  )

  return response.data
}

const authService = {
  login,
  getAllOrder,
}

export default authService
