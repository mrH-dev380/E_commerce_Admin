import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import CustomModal from '../components/CustomModal'
import {
  getAllBlogCategory,
  deleteBlogCategory,
  resetState,
} from '~/features/blogCategory/blogCategorySlice'

const ListBlogCategory = () => {
  const [open, setOpen] = useState(false)
  const [blogCategoryId, setBlogCategoryId] = useState('')

  const showModal = (id) => {
    setOpen(true)
    setBlogCategoryId(id)
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
    dispatch(getAllBlogCategory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  )
  const blogCategoryData = []
  blogCategories.map((blogCategory, index) => {
    blogCategoryData.push({
      key: index + 1,
      title: blogCategory.title,
      action: (
        <>
          <Link to={`/admin/category/${blogCategory._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCategory._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })

  const deleteBlogCategoryById = async (id) => {
    await dispatch(deleteBlogCategory(id))
    dispatch(getAllBlogCategory())
    setOpen(false)
  }

  return (
    <>
      <h3 className="mb-4 title">List Blog Category</h3>
      <div>
        <Table columns={columns} dataSource={blogCategoryData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategoryById(blogCategoryId)
        }}
        title="Are you sure you want to delete this product category?"
      />
    </>
  )
}

export default ListBlogCategory
