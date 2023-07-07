import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import CustomInput from '~/components/CustomInput'

const AddBlog = () => {
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
      <h3 className='title'>Add Blog</h3>
      <div>
        <form action="">
          <div className="mt-4">
            <CustomInput type="text" label="Enter Blog Title" />
          </div>
          <select className="form-control py-3  mt-3" name="" id="">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill
            className="mt-3"
            modules={module}
            theme="snow"
            value={desc}
            onChange={(e) => setDesc(e)}
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBlog
