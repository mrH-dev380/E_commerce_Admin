import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogService from './blogService'

export const resetState = createAction('Reset_all')

export const getAllBlog = createAsyncThunk(
  'blog/get-all-blog',
  async (thunkAPI) => {
    try {
      return await blogService.getAllBlog()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createBlog = createAsyncThunk(
  'blog/create-blog',
  async (blogData, thunkAPI) => {
    try {
      return await blogService.createBlog(blogData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogs = action.payload
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.newBlogAdded = action.payload
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default blogSlice.reducer
