import config from '~/config'

// Page
import AddBlog from '~/pages/AddBlog'
import AddBlogCategory from '~/pages/AddBlogCategory'
import AddBrand from '~/pages/AddBrand'
import AddCategory from '~/pages/AddCategory'
import AddColor from '~/pages/AddColor'
import AddCoupon from '~/pages/AddCoupon'
import AddProduct from '~/pages/AddProduct'
import Customers from '~/pages/Customers'
import Dashboard from '~/pages/Dashboard'
import Enquiries from '~/pages/Enquiries'
import ListBlog from '~/pages/ListBlog'
import ListBlogCategory from '~/pages/ListBlogCategory'
import ListBrand from '~/pages/ListBrand'
import ListCategory from '~/pages/ListCategory'
import ListColor from '~/pages/ListColor'
import ListCoupon from '~/pages/ListCoupon'
import ListProduct from '~/pages/ListProduct'
import Orders from '~/pages/Orders'

// Public Routes
const publicRoutes = [
  { path: config.routes.admin, component: Dashboard },
  { path: config.routes.blog, component: AddBlog },
  { path: config.routes.blogInfo, component: AddBlog },
  { path: config.routes.blogCategory, component: AddBlogCategory },
  { path: config.routes.blogCategoryInfo, component: AddBlogCategory },
  { path: config.routes.brand, component: AddBrand },
  { path: config.routes.brandInfo, component: AddBrand },
  { path: config.routes.category, component: AddCategory },
  { path: config.routes.categoryInfo, component: AddCategory },
  { path: config.routes.color, component: AddColor },
  { path: config.routes.colorInfo, component: AddColor },
  { path: config.routes.coupon, component: AddCoupon },
  { path: config.routes.couponInfo, component: AddCoupon },
  { path: config.routes.customers, component: Customers },
  { path: config.routes.enquiries, component: Enquiries },
  { path: config.routes.listBlog, component: ListBlog },
  { path: config.routes.listBlogCategory, component: ListBlogCategory },
  { path: config.routes.listBrand, component: ListBrand },
  { path: config.routes.listCategory, component: ListCategory },
  { path: config.routes.listColor, component: ListColor },
  { path: config.routes.listCoupon, component: ListCoupon },
  { path: config.routes.listProduct, component: ListProduct },
  { path: config.routes.orders, component: Orders },
  { path: config.routes.product, component: AddProduct },
  { path: config.routes.productInfo, component: AddProduct },
]

// Private Routes
const privateRoutes = []

export { publicRoutes, privateRoutes }
