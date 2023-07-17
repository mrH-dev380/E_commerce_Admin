import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Table } from 'antd'

import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { getAllCoupon } from '~/features/coupon/couponSlice'

const ListCoupon = () => {
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
      sorter: (a, b) => a.expiry - b.expiry,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
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
          <Link to={`/admin/brand/${coupon._id}`} className=" fs-3">
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
      <h3 className="mb-4 title">List Coupon</h3>
      <div>
        <Table columns={columns} dataSource={couponData} />
      </div>
    </>
  )
}

export default ListCoupon
