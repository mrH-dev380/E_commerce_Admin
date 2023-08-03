import {
  createSlice,
  createAsyncThunk,
  createAction,
  current,
} from '@reduxjs/toolkit'
import uploadService from './uploadService'

export const resetState = createAction('Reset_all')

// Hàm bất đồng bộ. Tạo action cho login bằng createAsyncThunk
export const uploadImg = createAsyncThunk(
  'upload/images', // action name
  async (data, thunkAPI) => {
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
  isUploaded: false,
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
        state.isDelete = false
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isUploaded = true
        state.message = 'success'
        state.images = action.payload.concat(...state.images)
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isError = true
        state.isUploaded = false
        state.message = action.error
        state.isLoading = false
        state.isUploaded = false
      })
      .addCase(deleteImg.pending, (state) => {
        state.isLoading = true
        state.isUploaded = false
      })
      .addCase(deleteImg.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isDelete = true
        const imagesState = current(state.images)
        const data = imagesState.filter(
          (image) => image.public_id !== action.payload
        )
        state.images = data
      })
      .addCase(deleteImg.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isDelete = false
        state.message = action.payload
      })
      .addCase(resetState, () => initialState)
  },
})

export default uploadSlice.reducer
