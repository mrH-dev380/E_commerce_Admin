import CustomInput from '~/components/CustomInput'

const AddBlogCategory = () => {
  return (
    <>
      <h3 className="mt-4 title">Add Blog Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Blog Category" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBlogCategory
