import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  createBlogCategory,
  resetState,
} from '~/features/blogCategory/blogCategorySlice'

const AddBlogCategory = () => {
  const dispatch = useDispatch()

  const newBlogCategory = useSelector((state) => state.blogCategory)
  const { isSuccess, isError, blogCategories } = newBlogCategory
  useEffect(() => {
    if (isSuccess && !blogCategories) {
      toast.success('Category Added Successfully!')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isSuccess, isError])

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Category name is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      dispatch(createBlogCategory(values))
      dispatch(resetState())
    },
  })

  return (
    <>
      <h3 className="mt-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
            label="Enter Blog Category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBlogCategory
