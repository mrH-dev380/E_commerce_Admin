import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import {
  getAllEnquiry,
  updateEnquiry,
  deleteEnquiry,
  resetState,
} from '~/features/enquiry/enquirySlice'
import CustomModal from '../components/CustomModal/'

const ListEnquiry = () => {
  const [open, setOpen] = useState(false)
  const [enquiryId, setEnquiryId] = useState('')
  const showModal = (id) => {
    setOpen(true)
    setEnquiryId(id)
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
    {
      title: 'Status',
      dataIndex: 'status',
    },

    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllEnquiry())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enquiries = useSelector((state) => state.enquiry.enquiries)
  // const { enquiryName, enquiryEmail, enquiryMobile } = enquiries
  const enquiryData = []
  enquiries.map((enquiry, index) => {
    enquiryData.push({
      key: index + 1,
      name: enquiry.name,
      email: enquiry.email,
      mobile: enquiry.mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={enquiry.status ? enquiry.status : 'Submitted'}
            className="form-control form-select"
            id=""
            onChange={(status) => {
              setEnquiryStatus(status.target.value, enquiry._id)
            }}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link to={`/admin/detail-enquiry/${enquiry._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiry._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })
  const setEnquiryStatus = (enquiry, enquiryId) => {
    const data = { id: enquiryId, status: enquiry }
    dispatch(updateEnquiry(data))
  }

  const deleteEnquiryById = async (id) => {
    await dispatch(deleteEnquiry(id))
    dispatch(getAllEnquiry())
    setOpen(false)
  }
  return (
    <>
      <h3 className="mb-4 title">List Enquiry</h3>
      <div>
        <Table columns={columns} dataSource={enquiryData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnquiryById(enquiryId)
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </>
  )
}

export default ListEnquiry
