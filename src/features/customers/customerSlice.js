import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'

// Hàm bất đồng bộ. Tạo action cho getUsers bằng createAsyncThunk
export const getAllUser = createAsyncThunk(
  'customer/get-customers', // action name
  async (thunkAPI) => {
    try {
      return await customerService.getAllUser()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const customerSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.customers = action.payload
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
  },
})

export default customerSlice.reducer
