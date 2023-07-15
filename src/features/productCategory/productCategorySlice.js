import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productCategoryService from './productCategoryService'

export const resetState = createAction('Reset_all')

export const getAllCategory = createAsyncThunk(
  'productCategory/get-all-category',
  async (thunkAPI) => {
    try {
      return await productCategoryService.getAllCategory()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createCategory = createAsyncThunk(
  'productCategory/create-brand',
  async (categoryData, thunkAPI) => {
    try {
      return await productCategoryService.createCategory(categoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const productCategorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.newCategoryAdded = action.payload
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default productCategorySlice.reducer
