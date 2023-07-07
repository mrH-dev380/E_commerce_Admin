import CustomInput from '~/components/CustomInput'

const AddCoupon = () => {
  return (
    <>
      <h3 className="mt-4 title">Add Coupon</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Coupon" />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </>
  )
}

export default AddCoupon
