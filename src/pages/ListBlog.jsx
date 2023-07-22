import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import CustomModal from '../components/CustomModal'
import { getAllBlog, deleteBlog, resetState } from '~/features/blog/blogSlice'

const ListBlog = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [blogId, setBlogId] = useState('')

  const showModal = (id) => {
    setOpen(true)
    setBlogId(id)
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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllBlog())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blogs = useSelector((state) => state.blog.blogs)
  const blogData = []
  blogs.map((blog, index) => {
    blogData.push({
      key: index + 1,
      title: blog.title,
      category: blog.category,
      action: (
        <>
          <Link to={`/admin/blog/${blog._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blog._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })

  const deleteBlogById = async (id) => {
    await dispatch(deleteBlog(id))
    dispatch(getAllBlog())
    setOpen(false)
  }

  return (
    <>
      <h3 className="mb-4 title">List Blog</h3>
      <div>
        <Table columns={columns} dataSource={blogData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogById(blogId)
        }}
        title="Are you sure you want to delete this blog?"
      />
    </>
  )
}

export default ListBlog
