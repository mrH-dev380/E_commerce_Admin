import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, createRef } from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'

import CustomInput from '~/components/CustomInput'
import { uploadImg, deleteImg } from '~/features/upload/uploadSlice'
import { createBlog, resetState } from '~/features/blog/blogSlice'
import { getAllBlogCategory } from '~/features/blogCategory/blogCategorySlice'

const AddBlog = () => {
  const dispatch = useDispatch()
  const dropzoneRef = createRef()

  useEffect(() => {
    dispatch(getAllBlogCategory())

    return () => {
      dispatch(resetState())
    }
  }, [])

  const blogCategory = useSelector((state) => state.blogCategory.blogCategories)

  // React quill
  const toolbarOptions = [
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    ['bold', 'italic', 'underline'], // toggled buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],

    [{ color: [] }], // dropdown with defaults from theme
    ['video', 'image'],
  ]
  const module = {
    toolbar: toolbarOptions,
  }

  const newBlog = useSelector((state) => state.blog)
  const { isSuccess, isError, newBlogAdded } = newBlog
  useEffect(() => {
    if (isSuccess && !!newBlogAdded) {
      toast.success('Blog Added Successfully!')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isSuccess, isError, newBlogAdded])

  // get images fom state
  const images = useSelector((state) => state.upload.images)
  const imageData = []
  images.map((image) => {
    imageData.push({ public_id: image.public_id, url: image.url })
  })

  useEffect(() => {
    formik.values.images = imageData
  }, [imageData])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values) => {
      await dispatch(createBlog(values))
      formik.resetForm()
      // dispatch(resetState())
    },
  })
  return (
    <>
      <h3 className="title">Add Blog</h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* Title */}
          <CustomInput
            type="text"
            name="title"
            label="Enter Product Title"
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          {/* Description */}
          <div className="mbb-3">
            <ReactQuill
              className="mt-3"
              name="description"
              modules={module}
              theme="snow"
              value={formik.values.description}
              onChange={formik.handleChange('description')}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          {/* Category */}
          <select
            className="form-control py-3 mt-3"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {blogCategory.map((category, index) => {
              return (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              )
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              ref={dropzoneRef}
              onDrop={(acceptFiles) => dispatch(uploadImg(acceptFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag drop some files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex flex-wrap gap-3">
            {images.map((image, index) => {
              return (
                <div className=" position-relative" key={index}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(image.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: '10px', right: '10px' }}
                  ></button>
                  <img
                    src={image.url}
                    alt=""
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBlog
