import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogCategoryService from './blogCategoryService'

export const resetState = createAction('Reset_all')

export const getAllBlogCategory = createAsyncThunk(
  'blogCategory/get-all-category',
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getAllBlogCategory()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createBlogCategory = createAsyncThunk(
  'blogCategory/create-blog-category',
  async (categoryData, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategory(categoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const blogCategorySlice = createSlice({
  name: 'blogCategory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogCategories = action.payload
      })
      .addCase(getAllBlogCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogCategories = [...state.blogCategories, action.payload]
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default blogCategorySlice.reducer
