import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import {
  getAllCategory,
  deleteCategory,
  resetState,
} from '~/features/productCategory/productCategorySlice'
import CustomModal from '../components/CustomModal'

const ListCategory = () => {
  const [open, setOpen] = useState(false)
  const [categoryId, setCategoryId] = useState('')

  const showModal = (id) => {
    setOpen(true)
    setCategoryId(id)
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
          <Link to={`/admin/category/${category._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(category._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })

  const deleteCategoryById = async (id) => {
    await dispatch(deleteCategory(id))
    dispatch(getAllCategory())
    setOpen(false)
  }
  return (
    <>
      <h3 className="mb-4 title">List Category</h3>
      <div>
        <Table columns={columns} dataSource={categoryData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategoryById(categoryId)
        }}
        title="Are you sure you want to delete this product category?"
      />
    </>
  )
}

export default ListCategory
