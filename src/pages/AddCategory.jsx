import CustomInput from '~/components/CustomInput'

const AddCategory = () => {
  return (
    <>
      <h3 className="mt-4 title">Add Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Category" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </>
  )
}

export default AddCategory
