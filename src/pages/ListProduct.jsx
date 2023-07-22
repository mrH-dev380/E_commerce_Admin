import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import CustomModal from '../components/CustomModal'
import {
  getAllProduct,
  deleteProduct,
  resetState,
} from '~/features/product/productSlice'

const ListProduct = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [productId, setProductId] = useState('')

  const showModal = (id) => {
    setOpen(true)
    setProductId(id)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 360,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: 140,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 140,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      width: 140,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Price $',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllProduct())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const products = useSelector((state) => state.product.products)
  const productData = []
  products.map((product, index) => {
    productData.push({
      key: index + 1,
      title: product.title,
      brand: product.brand,
      category: product.category,
      color: product.color.join(', '),
      quantity: product.quantity,
      price: product.price,
      action: (
        <div className="d-flex">
          <Link to={`/admin/product/${product._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(product._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    })
  })

  const deleteProductById = async (id) => {
    await dispatch(deleteProduct(id))
    dispatch(getAllProduct())
    setOpen(false)
  }

  return (
    <>
      <h3 className="mb-4 title">List Product</h3>
      <div>
        <Table columns={columns} dataSource={productData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProductById(productId)
        }}
        title="Are you sure you want to delete this product?"
      />
    </>
  )
}

export default ListProduct
