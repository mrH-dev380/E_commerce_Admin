import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogCategoryService from './blogCategoryService'

export const getAllCategory = createAsyncThunk(
  'blogCategory/get-all-category',
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getAllCategory()
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

const blogCategorySlice = createSlice({
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
  },
})

export default blogCategorySlice.reducer
