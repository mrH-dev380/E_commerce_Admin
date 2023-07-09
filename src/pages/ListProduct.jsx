import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import { getAllProduct } from '~/features/product/productSlice'

const ListProduct = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Price',
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
      color: product.color,
      quantity: product.quantity,
      price: `$ ${product.price}`,
      action: (
        <>
          <Link to="/" className=" fs-3">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3" to="/">
            <AiFillDelete />
          </Link>
        </>
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
