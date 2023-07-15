import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/features/auth/authSlice'
import blogReducer from '~/features/blog/blogSlice'
import blogCategoryReducer from '~/features/blogCategory/blogCategorySlice'
import brandReducer from '~/features/brand/brandSlice'
import colorReducer from '~/features/color/colorSlice'
import couponReducer from '~/features/coupon/couponSlice'
import customerReducer from '~/features/customers/customerSlice'
import enquiryReducer from '~/features/enquiry/enquirySlice'
import productReducer from '~/features/product/productSlice'
import productCategoryReducer from '~/features/productCategory/productCategorySlice'
import uploadReducer from '~/features/upload/uploadSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    brand: brandReducer,
    color: colorReducer,
    coupon: couponReducer,
    customer: customerReducer,
    enquiry: enquiryReducer,
    product: productReducer,
    productCategory: productCategoryReducer,
    upload: uploadReducer,
  },
})

export default store
