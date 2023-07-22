/* eslint-disable no-unused-vars */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, createRef } from 'react'
import Dropzone from 'react-dropzone'
import { Select } from 'antd'
import { toast } from 'react-toastify'

import CustomInput from '~/components/CustomInput'
import { getAllBrand } from '~/features/brand/brandSlice'
import { getAllCategory } from '~/features/productCategory/productCategorySlice'
import { getAllColor } from '~/features/color/colorSlice'
import { uploadImg, deleteImg } from '~/features/upload/uploadSlice'
import {
  getProductById,
  createProduct,
  updateProduct,
  resetState,
} from '~/features/product/productSlice'

const AddProduct = () => {
  const dispatch = useDispatch()
  const [color, setColor] = useState([])
  const dropzoneRef = createRef()
  const location = useLocation()
  const navigate = useNavigate()

  const getProductId = location.pathname.split('/')[3]

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

  const newProduct = useSelector((state) => state.product)
  const {
    isLoading,
    isSuccess,
    isError,
    productTitle,
    productDescription,
    productPrice,
    productBrandName,
    productCategoryName,
    productTagsName,
    productColor,
    productQuantity,
    productImages,
    updateProductInfo,
    newProductAdded,
  } = newProduct

  const brands = useSelector((state) => state.brand.brands)

  const productCategory = useSelector(
    (state) => state.productCategory.categories
  )

  const colors = useSelector((state) => state.color.colors)
  const colorData = []
  colors.map((color) =>
    colorData.push({ label: color.title, value: color.title })
  )

  const handleColors = (e) => {
    setColor(e)
  }

  const images = useSelector((state) => state.upload.images)
  let imageData = []
  images.map((image) => {
    imageData.push({ public_id: image.public_id, url: image.url })
  })
  if (updateProductInfo) {
    updateProductInfo.images.map((productImg) => {
      imageData.push({ public_id: productImg.public_id, url: productImg.url })
    })
  } else if (productImages) {
    productImages.map((productImg) => {
      imageData.push({ public_id: productImg.public_id, url: productImg.url })
    })
  }

  useEffect(() => {
    dispatch(getAllBrand())
    dispatch(getAllCategory())
    dispatch(getAllColor())
  }, [])

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProductById(getProductId))
      formik.values.title = productTitle
      formik.values.description = productDescription
      formik.values.price = productPrice
      formik.values.brand = productBrandName
      formik.values.category = productCategoryName
      formik.values.tags = productTagsName
      formik.values.quantity = productQuantity
      setColor(productColor)
      formik.values.color = color
    }
  }, [
    productTitle,
    productDescription,
    productPrice,
    productBrandName,
    productCategoryName,
    productTagsName,
    productQuantity,
  ])

  useEffect(() => {
    formik.values.color = color ? color : ' '
    formik.values.images = imageData
  }, [color, imageData])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      tags: '',
      color: '',
      quantity: '',
      images: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      price: Yup.number().required('Price is required'),
      brand: Yup.string().required('Brand is required'),
      category: Yup.string().required('Category is required'),
      tags: Yup.string().required('Tag is required'),
      color: Yup.array()
        .min(1, 'Pick at least one color')
        .required('Color is Required'),
      quantity: Yup.string().required('Quantity is required'),
    }),
    onSubmit: async (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values }
        dispatch(updateProduct(data))
        navigate('/admin/list-product')
        if (isSuccess && !!updateProductInfo) {
          toast.success('Product Updated Successfully!')
        }
        if (isError) {
          toast.success('Something Went Wrong!')
        }
      } else {
        await dispatch(createProduct(values))
        handleColors([])
        formik.resetForm()
        dispatch(resetState())
      }
    },
  })

  useEffect(() => {
    if (!!newProductAdded && isSuccess) {
      toast.success('Product Added Successfully!')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isLoading, isSuccess, isError])

  const handleDeleteImage = async (id) => {
    const newData = imageData.filter((image) => image.public_id !== id)
    imageData = newData
    const productData = {
      title: formik.values.title,
      description: formik.values.description,
      price: formik.values.price,
      brand: formik.values.brand,
      category: formik.values.category,
      tags: formik.values.tags,
      color: formik.values.color,
      quantity: formik.values.quantity,
      images: newData,
    }
    const data = { id: getProductId, productData: productData }
    await dispatch(updateProduct(data))
    dispatch(deleteImg(id))
  }

  return (
    <>
      <h3 className="mt-4 title">Add Product</h3>
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
          <div className="mb-3">
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
          {/* Price */}
          <CustomInput
            type="number"
            name="price"
            label="Enter Product Price ($$)"
            value={formik.values.price}
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          {/* Brand */}
          <select
            className="form-control py-3 mb-3 mt-3"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
          >
            <option value="" disabled hidden>
              Select Brand
            </option>
            {brands.map((brand, index) => {
              return (
                <option key={index} value={brand.title}>
                  {brand.title}
                </option>
              )
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>
          {/* Category */}
          <select
            className="form-control py-3 mb-3"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {productCategory.map((category, index) => {
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
          {/* Color */}
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            value={color}
            onChange={(e) => handleColors(e)}
            options={colorData}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          {/* Quantity */}
          <CustomInput
            type="number"
            name="quantity"
            label="Enter Product Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
          </div>
          {/* Tags */}
          <select
            className="form-control py-3 mb-3"
            name="tags"
            value={formik.values.tags}
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
          >
            <option value="" disabled hidden>
              Select Tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags ? (
              <div>{formik.errors.tags}</div>
            ) : null}
          </div>
          {/* Images */}
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
            {imageData.map((image, index) => {
              return (
                <div className=" position-relative" key={index}>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.public_id)}
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
          <div className="d-flex ">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              {getProductId ? 'Edit' : 'Add'} Product
            </button>
            {getProductId ? (
              <button className="btn btn-danger border-0 rounded-3 my-5 ms-3">
                <Link
                  to="/admin/list-product"
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

export default AddProduct
