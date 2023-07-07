import CustomInput from '~/components/CustomInput'

const AddBrand = () => {
  return (
    <>
      <h3 className="mt-4 title">Add Brand</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Brand" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBrand
