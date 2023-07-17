import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { getAllBrand } from '~/features/brand/brandSlice'
import { resetState, deleteBrand } from '../features/brand/brandSlice'
import CustomModal from '../components/CustomModal/'

const ListBrand = () => {
  const [open, setOpen] = useState(false)
  const [brandId, setBrandId] = useState('')
  const showModal = (id) => {
    setOpen(true)
    setBrandId(id)
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
    dispatch(getAllBrand())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const brands = useSelector((state) => state.brand.brands)
  const brandData = []
  brands.map((brand, index) => {
    brandData.push({
      key: index + 1,
      title: brand.title,
      action: (
        <>
          <Link to={`/admin/brand/${brand._id}`} className=" fs-3">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brand._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    })
  })

  const deleteBrandById = async (id) => {
    await dispatch(deleteBrand(id))
    dispatch(getAllBrand())
    setOpen(false)
  }

  return (
    <>
      <h3 className="mb-4 title">List Brand</h3>
      <div>
        <Table columns={columns} dataSource={brandData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrandById(brandId)
        }}
        title="Are you sure you want to delete this brand?"
      />
    </>
  )
}

export default ListBrand
