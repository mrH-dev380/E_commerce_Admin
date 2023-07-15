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
      .addCase(resetState, () => initialState)
  },
})

export default colorSlice.reducer
