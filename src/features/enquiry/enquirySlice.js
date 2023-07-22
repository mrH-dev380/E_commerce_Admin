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

export const getEnquiryById = createAsyncThunk(
  'enquiry/get-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getEnquiryById(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateEnquiry = createAsyncThunk(
  'enquiry/update-enquiry',
  async (enquiryData, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(enquiryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteEnquiry = createAsyncThunk(
  'enquiry/delete-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id)
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
      .addCase(getEnquiryById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEnquiryById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.enquiryName = action.payload.name
        state.enquiryMobile = action.payload.mobile
        state.enquiryEmail = action.payload.email
        state.enquiryComment = action.payload.comment
        state.enquiryStatus = action.payload.status
      })
      .addCase(getEnquiryById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateEnquiryInfo = action.payload
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteEnquiryInfo = action.payload
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default enquirySlice.reducer
