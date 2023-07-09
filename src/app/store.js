import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/features/auth/authSlice'
import blogReducer from '~/features/blog/blogSlice'
import blogCategoryReducer from '~/features/blogCategory/blogCategorySlice'
import brandReducer from '~/features/brand/brandSlice'
import colorReducer from '~/features/color/colorSlice'
import customerReducer from '~/features/customers/customerSlice'
import productReducer from '~/features/product/productSlice'
import productCategoryReducer from '~/features/productCategory/productCategorySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    brand: brandReducer,
    color: colorReducer,
    customer: customerReducer,
    product: productReducer,
    productCategory: productCategoryReducer,
  },
})

export default store
