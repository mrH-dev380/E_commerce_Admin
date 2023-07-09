import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import colorService from './colorService'

export const getAllColor = createAsyncThunk(
  'color/get-all-color',
  async (thunkAPI) => {
    try {
      return await colorService.getAllColor()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const colorSlice = createSlice({
  name: 'color',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.colors = action.payload
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
  },
})

export default colorSlice.reducer
