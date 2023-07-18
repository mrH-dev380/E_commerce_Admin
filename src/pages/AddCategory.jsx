import CustomInput from '~/components/CustomInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import {
  getCategoryById,
  createCategory,
  updateCategory,
  resetState,
} from '~/features/productCategory/productCategorySlice'

const AddCategory = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getCategoryId = location.pathname.split('/')[3]

  const newCategory = useSelector((state) => state.productCategory)
  const {
    isLoading,
    isSuccess,
    isError,
    categoryName,
    updateCategoryName,
    newCategoryAdded,
  } = newCategory

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategoryById(getCategoryId))
      formik.values.title = categoryName
    } else {
      dispatch(resetState())
    }
  }, [categoryName])

  console.log('categories', categoryName, !!categoryName)
  const formik = useFormik({
    initialValues: {
      title: categoryName || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Category name is required'),
    }),
    onSubmit: (values) => {
      formik.resetForm()
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values }
        dispatch(updateCategory(data))
      } else {
        dispatch(createCategory(values))
        dispatch(resetState())
      }
    },
  })
  useEffect(() => {
    if (isSuccess && !!newCategoryAdded) {
      toast.success('Category Added Successfully!')
    }
    if (isSuccess && !!updateCategoryName) {
      toast.success('Category Updated Successfully!')
      navigate('/admin/list-category')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  return (
    <>
      <h3 className="mt-4 title">{getCategoryId ? 'Edit' : 'Add'} Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
            label="Enter Product Category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="d-flex">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getCategoryId ? 'Edit' : 'Add'} Category
            </button>
            {getCategoryId ? (
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

export default AddCategory
