import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { createColor, resetState } from '~/features/color/colorSlice'

const AddColor = () => {
  const dispatch = useDispatch()

  const newColor = useSelector((state) => state.color)
  const { isLoading, isSuccess, isError, newColorAdded } = newColor
  useEffect(() => {
    console.log('success and color', isSuccess, newColorAdded)
    if (isSuccess && !!newColorAdded) {
      toast.success('Color Added Successfullly!')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  const formik = useFormik({
    initialValues: {
      title: '',
      code: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Color name is required'),
      code: Yup.string().required('Color is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      dispatch(createColor(values))
      dispatch(resetState())
    },
  })

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
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </>
  )
}

export default AddColor
