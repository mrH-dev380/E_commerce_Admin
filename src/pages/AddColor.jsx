import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  getColorById,
  createColor,
  updateColor,
  resetState,
} from '~/features/color/colorSlice'

const AddColor = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getColorId = location.pathname.split('/')[3]

  const newColor = useSelector((state) => state.color)
  const {
    isLoading,
    isSuccess,
    isError,
    colorName,
    colorCode,
    updateColorInfo,
    newColorAdded,
  } = newColor

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColorById(getColorId))
      formik.values.title = colorName
      formik.values.code = colorCode
    } else {
      dispatch(resetState())
    }
  }, [colorName, colorCode])

  const formik = useFormik({
    initialValues: {
      title: colorName || '',
      code: colorCode || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Color name is required'),
      code: Yup.string().required('Color is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values }
        dispatch(updateColor(data))
      } else {
        dispatch(createColor(values))
        dispatch(resetState())
      }
    },
  })

  useEffect(() => {
    if (isSuccess && !!newColorAdded) {
      toast.success('Color Added Successfully!')
    }
    if (isSuccess && !!updateColorInfo) {
      toast.success('Color Updated Successfully!')
      navigate('/admin/list-color')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  return (
    <>
      <h3 className="mt-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            name="code"
            onChange={formik.handleChange('code')}
            onBlur={formik.handleBlur('code')}
            value={formik.values.code}
          />
          <div className="error">
            {formik.touched.code && formik.errors.code}
          </div>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
            label="Enter Color Name"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="d-flex">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getColorId ? 'Edit' : 'Add'} Color
            </button>
            {getColorId ? (
              <button className="btn btn-danger border-0 rounded-3 my-5 ms-3">
                <Link
                  to="/admin/list-color"
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

export default AddColor
