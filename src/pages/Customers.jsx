import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { Table } from 'antd'
import { getAllUser } from '../features/customers/customerSlice'

const Customers = () => {
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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const customers = useSelector((state) => state.customer.customers)
  const customersData = []
  customers.map((customer, index) => {
    if (customer.role !== 'admin') {
      customersData.push({
        key: index + 1,
        name: `${customer.lastname} ${customer.firstname}`,
        email: customer.email,
        mobile: customer.mobile,
      })
    }
  })
  return (
    <>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={customersData} />
      </div>
    </>
  )
}

export default Customers
