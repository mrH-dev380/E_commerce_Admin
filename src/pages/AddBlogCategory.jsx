import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  resetState,
} from '~/features/blogCategory/blogCategorySlice'

const AddBlogCategory = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getBlogCategoryId = location.pathname.split('/')[3]

  const newBlogCategory = useSelector((state) => state.blogCategory)
  const {
    isLoading,
    isSuccess,
    isError,
    blogCategoryName,
    updateBlogCategoryName,
    newBlogCategoryAdded,
  } = newBlogCategory

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getBlogCategoryById(getBlogCategoryId))
      formik.values.title = blogCategoryName
    } else {
      dispatch(resetState())
    }
  }, [blogCategoryName])

  const formik = useFormik({
    initialValues: {
      title: blogCategoryName || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Category name is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      if (getBlogCategoryId !== undefined) {
        const data = { id: getBlogCategoryId, blogCategoryData: values }
        dispatch(updateBlogCategory(data))
      } else {
        dispatch(createBlogCategory(values))
        dispatch(resetState())
      }
    },
  })

  useEffect(() => {
    if (isSuccess && !!newBlogCategoryAdded) {
      toast.success('Blog Category Added Successfully!')
    }
    if (isSuccess && !!updateBlogCategoryName) {
      toast.success('Blog Category Added Successfully!')
      navigate('/admin/list-blog-category')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])
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
          <div className="d-flex">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getBlogCategoryId ? 'Edit' : 'Add'} Category
            </button>
            {getBlogCategoryId ? (
              <button className="btn btn-danger border-0 rounded-3 my-5 ms-3">
                <Link
                  to="/admin/list-category"
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

export default AddBlogCategory
