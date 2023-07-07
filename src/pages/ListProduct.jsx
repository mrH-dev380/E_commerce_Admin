// import { BiEdit } from 'react-icons/bi'
// import { AiFillDelete } from 'react-icons/ai'

import { Table } from 'antd'
const data1 = []
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: Number(`${i}`),
    status: `London, Park Lane no. ${i}`,
  })
}
const ListProduct = () => {
  const handleChange = (pagination, sorter) => {
    console.log('Various parameters', pagination, sorter)
  }
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
      key: 'product',
      sorter: (a, b) => a.product - b.product,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]
  return (
    <>
      <h3 className="mb-4 title">List Product</h3>
      <div>
        <Table columns={columns} dataSource={data1} onChange={handleChange} />
      </div>
    </>
  )
}

export default ListProduct
