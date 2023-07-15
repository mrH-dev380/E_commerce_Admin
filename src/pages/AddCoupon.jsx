/* eslint-disable no-unused-vars */
import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { createCoupon, resetState } from '~/features/coupon/couponSlice'

const AddCoupon = () => {
  const dispatch = useDispatch()

  const newCoupon = useSelector((state) => state.coupon)
  const { isLoading, isSuccess, isError, newCouponAdded } = newCoupon
  useEffect(() => {
    if (isSuccess && !!newCouponAdded) {
      toast.success('Coupon Added Successfully!')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  const formik = useFormik({
    initialValues: {
      name: '',
      discount: '',
      expiry: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Coupon name is required'),
      discount: Yup.string().required('Discount is required'),
      expiry: Yup.date().required('Expiry date is required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      formik.resetForm()
      dispatch(createCoupon(values))
      dispatch(resetState())
    },
  })

  return (
    <>
      <h3 className="mt-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            value={formik.values.name}
            label="Enter Coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            name="discount"
            onChange={formik.handleChange('discount')}
            onBlur={formik.handleBlur('discount')}
            value={formik.values.discount}
            label="% Discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <CustomInput
            type="datetime-local"
            name="expiry"
            onChange={formik.handleChange('expiry')}
            onBlur={formik.handleBlur('expiry')}
            value={formik.values.expiry}
            label="Enter Coupon Expiry Day"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </>
  )
}

export default AddCoupon
