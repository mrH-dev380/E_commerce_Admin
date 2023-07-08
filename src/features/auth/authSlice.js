import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const userDefaultState = {
  _id: null,
  firstname: null,
  lastname: null,
  email: null,
  mobile: null,
  token: null,
}

const initialState = {
  user: userDefaultState,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

// Hàm bất đồng bộ. Tạo action cho login bằng createAsyncThunk
export const login = createAsyncThunk(
  'auth/admin-login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
      // nếu đăng nhập thành công sẽ trả kết quả về payload của action
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
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
  },
})

export default authSlice.reducer
