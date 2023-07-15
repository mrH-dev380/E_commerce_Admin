import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { createBrand, resetState } from '~/features/brand/brandSlice'

const AddBrand = () => {
  const dispatch = useDispatch()

  const newBrand = useSelector((state) => state.brand)
  const { isLoading, isSuccess, isError, newBandAdded } = newBrand
  useEffect(() => {
    if (isSuccess && !!newBandAdded) {
      toast.success('Brand Added Successfully!')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Brand name is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      dispatch(createBrand(values))
      dispatch(resetState())
      // await navigate(-1, 'list-product')
    },
  })

  return (
    <>
      <h3 className="mt-4 title">Add Brand</h3>
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
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBrand
