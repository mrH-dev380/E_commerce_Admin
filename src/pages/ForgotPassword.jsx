import CustomInput from '~/components/CustomInput'

const ForgotPassword = () => {
  return (
    <section className='forgot-pwd-wrapper'>
      <div
        className="py-5"
        style={{ background: '#ffd333', minHeight: '100vh' }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Forgot Password</h3>
          <p className="text-center">
            Please Enter your register email to get reset password mail.
          </p>
          <form action="">
            <CustomInput
              type="password"
              label="Email Address"
              id="email"
              name="email"
            />

            <button
              className="border-0 px-3 py-2 mt-3 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: '#ffd333' }}
              type="submit"
            >
              Send Link
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
