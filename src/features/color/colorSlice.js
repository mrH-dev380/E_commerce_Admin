import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import colorService from './colorService'

export const resetState = createAction('Reset_all')

export const getAllColor = createAsyncThunk(
  'color/get-all-color',
  async (thunkAPI) => {
    try {
      return await colorService.getAllColor()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getColorById = createAsyncThunk(
  'color/get-color',
  async (id, thunkAPI) => {
    try {
      return await colorService.getColorById(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createColor = createAsyncThunk(
  'color/create-color',
  async (colorData, thunkAPI) => {
    try {
      return await colorService.createColor(colorData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateColor = createAsyncThunk(
  'color/update-color',
  async (colorData, thunkAPI) => {
    try {
      return await colorService.updateColor(colorData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteColor = createAsyncThunk(
  'color/delete-color',
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const colorSlice = createSlice({
  name: 'color',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.colors = action.payload
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getColorById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getColorById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.colorName = action.payload.title
        state.colorCode = action.payload.code
      })
      .addCase(getColorById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.newColorAdded = action.payload
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateColorInfo = action.payload
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteColorInfo = action.payload
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default colorSlice.reducer
