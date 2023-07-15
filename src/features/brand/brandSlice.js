import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import brandService from './brandService'

export const resetState = createAction('Reset_all')

export const getAllBrand = createAsyncThunk(
  'brand/get-all-brand',
  async (thunkAPI) => {
    try {
      return await brandService.getAllBrand()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createBrand = createAsyncThunk(
  'brand/create-brand',
  async (brandData, thunkAPI) => {
    try {
      return await brandService.createBrand(brandData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const brandSlice = createSlice({
  name: 'brand',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.brands = action.payload
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.newBandAdded = action.payload
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default brandSlice.reducer
