import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

export const getAllProduct = createAsyncThunk(
  'product/get-all-product',
  async (thunkAPI) => {
    try {
      return await productService.getAllProduct()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
  },
})

export default productSlice.reducer
