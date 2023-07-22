import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  createBrand,
  updateBrand,
  getBrandById,
  resetState,
} from '~/features/brand/brandSlice'

const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const getBrandId = location.pathname.split('/')[3]
  const newBrand = useSelector((state) => state.brand)
  const {
    isLoading,
    isSuccess,
    isError,
    brandName,
    updateBrandName,
    newBandAdded,
  } = newBrand

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrandById(getBrandId))
      formik.values.title = brandName
    } else {
      dispatch(resetState())
    }
  }, [brandName])

  const formik = useFormik({
    initialValues: {
      title: brandName || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Brand name is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values }
        dispatch(updateBrand(data))
      } else {
        dispatch(createBrand(values))
        dispatch(resetState())
      }
      // await navigate(-1, 'list-product')
    },
  })

  useEffect(() => {
    if (isSuccess && !!newBandAdded) {
      toast.success('Brand Added Successfully!')
    }
    if (isSuccess && !!updateBrandName) {
      toast.success('Brand Updated Successfully!')
      navigate('/admin/list-brand')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  return (
    <>
      <h3 className="mt-4 title">{getBrandId ? 'Edit' : 'Add'} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
            label="Enter Brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="d-flex ">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getBrandId ? 'Edit' : 'Add'} Brand
            </button>
            {getBrandId ? (
              <button className="btn btn-danger border-0 rounded-3 my-5 ms-3">
                <Link
                  to="/admin/list-brand"
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

export default AddBrand
