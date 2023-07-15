import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const getUserFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

// Hàm bất đồng bộ. Tạo action cho login bằng createAsyncThunk
export const login = createAsyncThunk(
  'auth/admin-login', // action name
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
      // nếu đăng nhập thành công sẽ trả kết quả về payload của action
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getAllOrder = createAsyncThunk(
  'order/get-all-orders',
  async (thunkAPI) => {
    try {
      return await authService.getAllOrder()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // auth
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = 'success'
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        state.isLoading = false
      })
      // order
      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
  },
})

export default authSlice.reducer
