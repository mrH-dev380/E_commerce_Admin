import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import enquiryService from './enquiryService'

export const resetState = createAction('Reset_all')

export const getAllEnquiry = createAsyncThunk(
  'enquiry/get-all-enquiry',
  async (thunkAPI) => {
    try {
      return await enquiryService.getAllEnquiry()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllEnquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.enquiries = action.payload
      })
      .addCase(getAllEnquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default enquirySlice.reducer
