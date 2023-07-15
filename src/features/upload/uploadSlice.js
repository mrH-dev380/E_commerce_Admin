import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import uploadService from './uploadService'

export const resetState = createAction('Reset_all')

// Hàm bất đồng bộ. Tạo action cho login bằng createAsyncThunk
export const uploadImg = createAsyncThunk(
  'upload/images', // action name
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const formData = new FormData()
      data.map((img) => {
        formData.append('images', img)
      })
      return await uploadService.uploadImg(formData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteImg = createAsyncThunk(
  'delete/images',
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const uploadSlice = createSlice({
  name: 'productImg',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // uploadImg
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.images = action.payload
        state.message = 'success'
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        state.isLoading = false
      })
      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteImg.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.images = []
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(resetState, () => initialState)
  },
})

export default uploadSlice.reducer
