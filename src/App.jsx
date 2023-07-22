/* eslint-disable react/jsx-key */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from '~/pages/Login'
import ResetPassword from '~/pages/ResetPassword'
import ForgotPassword from '~/pages/ForgotPassword'
import Layout from '~/Layout'
import { publicRoutes } from './routes'

function App() {
  const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
  const user = !!getUserFromLocalStorage
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/admin" /> : <Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={user ? <Layout /> : <Navigate to="/" />}>
          {publicRoutes.map((route, i) => {
            const Page = route.component

            if (route.path === '/admin') {
              return (
                <Route
                  index
                  key={i}
                  path={route.path}
                  element={user ? <Page /> : <Navigate to="/" />}
                />
              )
            } else {
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={user ? <Page /> : <Navigate to="/" />}
                />
              )
            }
          })}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
