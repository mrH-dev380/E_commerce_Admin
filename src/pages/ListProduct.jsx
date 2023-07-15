import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import { getAllProduct, resetState } from '~/features/product/productSlice'

const ListProduct = () => {
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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProduct())
    return () => {
      dispatch(resetState())
    }
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
          <Link to="/" className=" fs-3">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3" to="">
            <AiFillDelete />
          </Link>
        </div>
      ),
    })
  })

  return (
    <>
      <h3 className="mb-4 title">List Product</h3>
      <div>
        <Table columns={columns} dataSource={productData} />
      </div>
    </>
  )
}

export default ListProduct
