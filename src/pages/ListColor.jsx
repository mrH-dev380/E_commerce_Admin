import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import { getAllColor } from '~/features/color/colorSlice'

const ListColor = () => {
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
    dispatch(getAllColor())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const colors = useSelector((state) => state.color.colors)
  const colorData = []
  colors.map((color, index) => {
    colorData.push({
      key: index + 1,
      title: color.title,
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
      <h3 className="mb-4 title">List Color</h3>
      <div>
        <Table columns={columns} dataSource={colorData} />
      </div>
    </>
  )
}

export default ListColor
