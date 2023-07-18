import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import {
  getAllColor,
  deleteColor,
  resetState,
} from '~/features/color/colorSlice'
import CustomModal from '../components/CustomModal'

const ListColor = () => {
  const [open, setOpen] = useState(false)
  const [colorId, setColorId] = useState('')

  const showModal = (id) => {
    setOpen(true)
    setColorId(id)
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
          <Link to={`/admin/color/${color._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(color._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })

  const deleteColorById = async (id) => {
    await dispatch(deleteColor(id))
    dispatch(getAllColor())
    setOpen(false)
  }
  return (
    <>
      <h3 className="mb-4 title">List Color</h3>
      <div>
        <Table columns={columns} dataSource={colorData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColorById(colorId)
        }}
        title="Are you sure you want to delete this color?"
      />
    </>
  )
}

export default ListColor
