import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Stores from '../views/Store.vue'
import Product from '../views/Product.vue'
import SignUp from '../views/SignUp.vue'
import AddProduct from '../views/AddProduct.vue'
import EditProduct from '../views/EditProduct.vue'
import Users from '../views/Users.vue'
import WishList from '../views/WishList.vue'
import NotFound from '../views/NotFound.vue'
import ColorsBrands from '../views/ColorsBrands.vue'
import Profile from '../views/Profile.vue'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Stores
  },
  {
    path: '/stores/product/:id',
    name: 'Product',
    props: true,
    component: Product
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
    beforeEnter: ((to, from, next) => {
      const loggedIn = localStorage.getItem('user');
      let isAdmin = JSON.parse(localStorage.getItem("user")).role;
      if (isAdmin != 1 && loggedIn) {
        next('/sign-up');
      } else {
        next();
      }
    })
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProduct,
    props: true,
    beforeEnter: ((to, from, next) => {
      const loggedIn = localStorage.getItem('user');
      let isNotMember = JSON.parse(localStorage.getItem("user")).role
      if (isNotMember== 3 && loggedIn) {
        next('/sign-up');
      } else {
        next();
      }
    })
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: ((to, from, next) => {
      const loggedIn = localStorage.getItem('user');
      let isAdmin = JSON.parse(localStorage.getItem("user")).role
      if (isAdmin != 1 && loggedIn) {
        next('/sign-up');
      } else {
        next();
      }
    })
  },
  {
    path: '/wish-list',
    name: 'WishList',
    component: WishList,
    beforeEnter: ((to, from, next) => {
      const loggedIn = localStorage.getItem('user');
      if (!loggedIn) {
        next('/sign-up');
      } else {
        next();
      }
    })
  },
  {
    path: '/colors+brands',
    name: 'ColorsBrands',
    component: ColorsBrands,
    beforeEnter: ((to, from, next) => {
      const loggedIn = localStorage.getItem('user');
      let isAdmin = JSON.parse(localStorage.getItem("user")).role;
      let isDeputyAdmin = JSON.parse(localStorage.getItem("user")).role;
      if (isAdmin != 1 && isDeputyAdmin != 2 && loggedIn) {
        next('/sign-up');
      } else {
        next();
      }
    })
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: ((to, from, next) => {
      const loggedIn = localStorage.getItem('user');
      if (!loggedIn) {
        next('/sign-up');
      } else {
        next();
      }
    })
  },
  {
    path: '/:catchall(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
