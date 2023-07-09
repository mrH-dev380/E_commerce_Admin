import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Table } from 'antd'

import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { getAllBrand } from '../features/brand/brandSlice'

const ListBrand = () => {
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
    dispatch(getAllBrand())
    console.log('dispatch brand action')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const brands = useSelector((state) => state.brand.brands)
  const brandData = []
  console.log(brands)
  brands.map((brand, index) => {
    brandData.push({
      key: index + 1,
      title: brand.title,
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
      <h3 className="mb-4 title">List Brand</h3>
      <div>
        <Table columns={columns} dataSource={brandData} />
      </div>
    </>
  )
}

export default ListBrand
