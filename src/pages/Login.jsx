/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import CustomInput from '~/components/CustomInput'
import { login } from '~/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
      password: Yup.string().required('Password is Required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values))
    },
  })

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (user && isSuccess) {
      window.location.reload()
    } else {
      navigate('')
    }
  }, [user, isLoading, isError, isSuccess, message])
  return (
    <section className="login-wrapper">
      <div
        className="py-5"
        style={{ background: '#ffd333', minHeight: '100vh' }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <div className="error text-center">
            {message.message == 'Rejected' ? 'You are not an Admin' : ''}
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="Email Address"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              label="Password"
              id="pass"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
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

export default Login
