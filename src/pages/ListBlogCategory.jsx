import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Table } from 'antd'

import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { getAllCategory } from '~/features/blogCategory/blogCategorySlice'

const ListBlogCategory = () => {
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
    dispatch(getAllCategory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blogCategories = useSelector((state) => state.blogCategory.categories)
  const blogCategoryData = []
  console.log(blogCategories)
  blogCategories.map((blogCategory, index) => {
    blogCategoryData.push({
      key: index + 1,
      title: blogCategory.title,
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
      <h3 className="mb-4 title">List Blog Category</h3>
      <div>
        <Table columns={columns} dataSource={blogCategoryData} />
      </div>
    </>
  )
}

export default ListBlogCategory
