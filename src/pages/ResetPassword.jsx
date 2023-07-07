import { Link } from 'react-router-dom'

import CustomInput from '~/components/CustomInput'

const ResetPassword = () => {
  return (
    <section className='reset-pwd-wrapper'>
      <div
        className="py-5"
        style={{ background: '#ffd333', minHeight: '100vh' }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title"> Reset Password</h3>
          <p className="text-center">Please Enter your new password.</p>
          <form action="">
            <CustomInput type="password" label="New Password" id="pass" />
            <CustomInput
              type="password"
              label="Confirm Password"
              id="confirmpass"
            />
            <div className="mb-3 text-end">
              <Link to="forgot-password" className="">
                Forgot Password?
              </Link>
            </div>
            <button
              className="border-0 px-3 mt-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: '#ffd333' }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
