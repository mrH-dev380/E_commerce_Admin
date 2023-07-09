import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import { getAllBlog } from '~/features/blog/blogSlice'

const ListBlog = () => {
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

  const dispatch = useDispatch()
  useEffect(() => {
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
      <h3 className="mb-4 title">List Blog</h3>
      <div>
        <Table columns={columns} dataSource={blogData} />
      </div>
    </>
  )
}

export default ListBlog
