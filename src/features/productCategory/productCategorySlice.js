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

export const getCategoryById = createAsyncThunk(
  'productCategory/get-category',
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.getCategoryById(id)
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

export const updateCategory = createAsyncThunk(
  'productCategory/update-brand',
  async (categoryData, thunkAPI) => {
    try {
      return await productCategoryService.updateCategory(categoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'productCategory/delete-brand',
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.deleteCategory(id)
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
      .addCase(getCategoryById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.categoryName = action.payload.title
      })
      .addCase(getCategoryById.rejected, (state, action) => {
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
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateCategoryName = action.payload
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteCategory = action.payload
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default productCategorySlice.reducer
