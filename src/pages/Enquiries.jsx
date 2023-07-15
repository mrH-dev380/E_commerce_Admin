import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

import { getAllEnquiry } from '~/features/enquiry/enquirySlice'

const ListEnquiry = () => {
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
    dispatch(getAllEnquiry())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enquiries = useSelector((state) => state.enquiry.enquiries)
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
            // defaultValue={enqState[i].status ? enqState[i].status : 'Submitted'}
            className="form-control form-select"
            id=""
            // onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
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
      <h3 className="mb-4 title">List Enquiry</h3>
      <div>
        <Table columns={columns} dataSource={enquiryData} />
      </div>
    </>
  )
}

export default ListEnquiry
