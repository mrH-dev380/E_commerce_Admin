import CustomInput from '~/components/CustomInput'

const Login = () => {
  return (
    <section className="login-wrapper">
      <div
        className="py-5"
        style={{ background: '#ffd333', minHeight: '100vh' }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <form action="">
            <CustomInput
              type="text"
              label="Email Address"
              id="email"
              name="email"
            />
            <CustomInput
              type="password"
              label="Password"
              id="pass"
              name="password"
            />
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

export default Login
