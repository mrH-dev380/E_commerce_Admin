/* eslint-disable no-unused-vars */
import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  getCouponById,
  createCoupon,
  updateCoupon,
  resetState,
} from '~/features/coupon/couponSlice'

const AddCoupon = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getCouponId = location.pathname.split('/')[3]

  const newCoupon = useSelector((state) => state.coupon)
  const {
    isLoading,
    isSuccess,
    isError,
    couponName,
    couponDiscount,
    couponExpiry,
    updateCouponInfo,
    newCouponAdded,
  } = newCoupon

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCouponById(getCouponId))
      formik.values.name = couponName
      formik.values.discount = couponDiscount
      formik.values.expiry = couponExpiry
    } else {
      dispatch(resetState())
    }
  }, [couponName, couponDiscount, couponExpiry])

  const formik = useFormik({
    initialValues: {
      name: couponName || '',
      discount: couponDiscount || '',
      expiry: couponExpiry || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Coupon name is required'),
      discount: Yup.string().required('Discount is required'),
      expiry: Yup.date().required('Expiry date is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values }
        dispatch(updateCoupon(data))
      } else {
        dispatch(createCoupon(values))
        dispatch(resetState())
      }
    },
  })

  useEffect(() => {
    if (isSuccess && !!newCouponAdded) {
      toast.success('Coupon Added Successfully!')
    }
    if (isSuccess && !!updateCouponInfo) {
      toast.success('Coupon Updated Successfully!')
      navigate('/admin/list-coupon')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

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
          <div className="d-flex">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getCouponId ? 'Edit' : 'Add'} Coupon
            </button>
            {getCouponId ? (
              <button className="btn btn-danger border-0 rounded-3 my-5 ms-3">
                <Link
                  to="/admin/list-coupon"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Cancel
                </Link>
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default AddCoupon
