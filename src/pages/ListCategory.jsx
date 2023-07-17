import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import {
  getAllCategory,
  resetState,
} from '~/features/productCategory/productCategorySlice'

const ListCategory = () => {
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
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllCategory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categories = useSelector((state) => state.productCategory.categories)
  const categoryData = []
  categories.map((category, index) => {
    categoryData.push({
      key: index + 1,
      title: category.title,
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
      <h3 className="mb-4 title">List Category</h3>
      <div>
        <Table columns={columns} dataSource={categoryData} />
      </div>
    </>
  )
}

export default ListCategory
