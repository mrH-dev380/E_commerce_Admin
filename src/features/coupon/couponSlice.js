import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import couponService from './couponService'

export const resetState = createAction('Reset_all')

export const getAllCoupon = createAsyncThunk(
  'coupon/get-all-coupon',
  async (thunkAPI) => {
    try {
      return await couponService.getAllCoupon()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getCouponById = createAsyncThunk(
  'coupon/get-coupon',
  async (id, thunkAPI) => {
    try {
      return await couponService.getCouponById(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createCoupon = createAsyncThunk(
  'coupon/create-coupon',
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(couponData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateCoupon = createAsyncThunk(
  'coupon/update-coupon',
  async (couponData, thunkAPI) => {
    try {
      return await couponService.updateCoupon(couponData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteCoupon = createAsyncThunk(
  'coupon/delete-coupon',
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.coupons = action.payload
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(getCouponById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.couponName = action.payload.name
        state.couponDiscount = action.payload.discount
        state.couponExpiry = action.payload.expiry
      })
      .addCase(getCouponById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.newCouponAdded = action.payload
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateCouponInfo = action.payload
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deleteCouponInfo = action.payload
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
      })
      .addCase(resetState, () => initialState)
  },
})

export default couponSlice.reducer
