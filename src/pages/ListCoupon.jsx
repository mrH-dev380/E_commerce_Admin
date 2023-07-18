import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import {
  getAllCoupon,
  deleteCoupon,
  resetState,
} from '~/features/coupon/couponSlice'
import CustomModal from '../components/CustomModal'

const ListCoupon = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [couponId, setCouponId] = useState('')

  const showModal = (id) => {
    setOpen(true)
    setCouponId(id)
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
      title: 'Discount %',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: 'Expire Date',
      dataIndex: 'expiry',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllCoupon())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const coupons = useSelector((state) => state.coupon.coupons)
  const couponData = []
  coupons.map((coupon, index) => {
    couponData.push({
      key: index + 1,
      name: coupon.name,
      discount: coupon.discount,
      expiry: new Date(coupon.expiry).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/coupon/${coupon._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(coupon._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })

  const deleteCouponById = async (id) => {
    await dispatch(deleteCoupon(id))
    dispatch(getAllCoupon())
    setOpen(false)
  }
  return (
    <>
      <h3 className="mb-4 title">List Coupon</h3>
      <div>
        <Table columns={columns} dataSource={couponData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCouponById(couponId)
        }}
        title="Are you sure you want to delete this coupon?"
      />
    </>
  )
}

export default ListCoupon
