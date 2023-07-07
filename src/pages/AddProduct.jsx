import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '~/components/CustomInput'

import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
const { Dragger } = Upload
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

const AddProduct = () => {
  const [desc, setDesc] = useState('')
  const toolbarOptions = [
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    ['bold', 'italic', 'underline'], // toggled buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],

    [{ color: [] }], // dropdown with defaults from theme
    ['video', 'image'],
  ]
  const module = {
    toolbar: toolbarOptions,
  }
  return (
    <>
      <h3 className="mt-4 title">Add Product</h3>
      <div>
        <form action="" className="d-flex gap-3 flex-column">
          <CustomInput type="text" label="Enter Product Title" />
          <div className="mbb-3">
            <ReactQuill
              className="mt-3"
              modules={module}
              theme="snow"
              value={desc}
              onChange={(e) => setDesc(e)}
            />
          </div>
          <CustomInput type="number" label="Enter Product Price ($$)" />
          <select className="form-control py-3 mb-3 mt-3" name="" id="">
            <option value="">Select Brand</option>
          </select>
          <select className="form-control py-3 mb-3" name="" id="">
            <option value="">Select Category</option>
          </select>
          <select className="form-control py-3" name="" id="">
            <option value="">Select Color</option>
          </select>
          <CustomInput type="number" label="Enter Product Quantity" />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
