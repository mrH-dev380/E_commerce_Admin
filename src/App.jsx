import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '~/pages/Login'
import ResetPassword from '~/pages/ResetPassword'
import ForgotPassword from '~/pages/ForgotPassword'
import Layout from '~/Layout'
import { publicRoutes } from './routes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<Layout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component

            if (route.path === '/admin') {
              return (
                <Route key={index} index path={route.path} element={<Page />} />
              )
            } else {
              return <Route key={index} path={route.path} element={<Page />} />
            }
          })}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
