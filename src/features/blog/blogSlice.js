import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
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

export const getBlogById = createAsyncThunk(
  'blog/get-blog',
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlogById(id)
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

export const updateBlog = createAsyncThunk(
  'blog/update-blog',
  async (blogData, thunkAPI) => {
    try {
      return await blogService.updateBlog(blogData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteBlog = createAsyncThunk(
  'blog/delete-blog',
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id)
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
      .addCase(getBlogById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogName = action.payload.title
        state.blogDescription = action.payload.description
        state.blogCategoryName = action.payload.category
        state.blogImages = action.payload.images
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        if (state.isSuccess) {
          toast.success('Added Blog Successfully!')
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError) {
          if (state.isSuccess) {
            toast.error('Something when wrong!')
          }
        }
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateBlogInfo = action.payload
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteBlogInfo = action.payload
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default blogSlice.reducer
