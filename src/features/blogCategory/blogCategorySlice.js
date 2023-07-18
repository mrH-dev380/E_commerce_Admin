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

export const getBlogCategoryById = createAsyncThunk(
  'blogCategory/get-category',
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.getAllBlogCategory(id)
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

export const updateBlogCategory = createAsyncThunk(
  'blogCategory/update-blog-category',
  async (blogCategoryData, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogCategory(blogCategoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteBlogCategory = createAsyncThunk(
  'blogCategory/delete-blog-category',
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogCategory(id)
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
      .addCase(getBlogCategoryById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogCategoryById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogCategoryName = action.payload.title
      })
      .addCase(getBlogCategoryById.rejected, (state, action) => {
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
        state.newBlogCategoryAdded = action.payload
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateBlogCategoryName = action.payload
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteBlogCategory = action.payload
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default blogCategorySlice.reducer
