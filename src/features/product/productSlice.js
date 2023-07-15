import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productService from './productService'

export const resetState = createAction('Reset_all')

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

export const createProduct = createAsyncThunk(
  'product/create-product',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/delete-product',
  async (productData, thunkAPI) => {
    try {
      return await productService.deleteProduct(productData)
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
  newProductAdded: [],
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
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.newProductAdded = action.state
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteProduct = action.state
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default productSlice.reducer
