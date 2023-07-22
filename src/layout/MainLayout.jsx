/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
const { Header, Sider, Content } = Layout
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// icons
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from 'react-icons/ai'
import { RiCouponLine } from 'react-icons/ri'
import { ImBlog } from 'react-icons/im'
import { FaClipboardList, FaBloggerB } from 'react-icons/fa'
import { SiBrandfolder } from 'react-icons/si'
import { BiCategoryAlt } from 'react-icons/bi'
import { IoIosNotifications } from 'react-icons/io'

// library
import { useNavigate, Outlet, Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const navigate = useNavigate()

  const handleSignout = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">BWL</span>
            <span className="lg-logo">BWL Official</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser />,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <AiOutlineShoppingCart />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart />,
                  label: 'Add Product',
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineShoppingCart />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder />,
                  label: 'Add Brand',
                },
                {
                  key: 'list-brand',
                  icon: <SiBrandfolder />,
                  label: 'Brand List ',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt />,
                  label: 'Add Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors />,
                  label: 'Add Color',
                },
                {
                  key: 'list-color',
                  icon: <AiOutlineBgColors />,
                  label: 'Color List',
                },
              ],
            },
            {
              key: 'orders',
              icon: <FaClipboardList />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <RiCouponLine />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <ImBlog />,
                  label: 'Add Coupon',
                },
                {
                  key: 'list-coupon',
                  icon: <RiCouponLine />,
                  label: 'Coupon List',
                },
              ],
            },
            {
              key: 'blogs',
              icon: <FaBloggerB />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog />,
                  label: 'Add Blog',
                },
                {
                  key: 'list-blog',
                  icon: <FaBloggerB />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'list-blog-category',
                  icon: <FaBloggerB />,
                  label: 'Blog Category List',
                },
              ],
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 54,
              height: 54,
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Mr.H</h5>
                <p className="mb-0">Mr.H3080t@gmail.com</p>
              </div>
              <div
                className="dropdown-menu mt-1"
                aria-labelledby="dropdownMenuLink"
              >
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '24px' }}
                    to="/admin"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <div
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '24px' }}
                    onClick={handleSignout}
                  >
                    Signout
                  </div>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
