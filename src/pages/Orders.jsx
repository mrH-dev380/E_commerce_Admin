import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import { getAllOrder } from '~/features/auth/authSlice'

const ListBlog = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },

    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrder())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const orders = useSelector((state) => state.auth.orders)
  const orderData = []
  orders.map((order, index) => {
    orderData.push({
      key: index + 1,
      name: order.orderby.firstname,
      product: (
        <Link to={`/admin/order/${order.orderby._id}`}>View Orders</Link>
      ),
      amount: order.paymentIntent.amount,
      date: new Date(order.createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">List Orders</h3>
      <div>
        <Table columns={columns} dataSource={orderData} />
      </div>
    </>
  )
}

export default ListBlog
