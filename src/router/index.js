import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../views/Home.vue');
const Stores = () => import('../views/Store.vue');
const Product = () => import('../views/Product.vue');
const SignUp = () => import('../views/SignUp.vue');
const AddProduct = () => import('../views/AddProduct.vue');
const EditProduct = () => import('../views/EditProduct.vue');
const Users = () => import('../views/Users.vue');
const WishList = () => import('../views/WishList.vue');
const NotFound = () => import('../views/NotFound.vue');
const ColorsBrands = () => import('../views/ColorsBrands.vue');
const Profile = () => import('../views/Profile.vue');
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
      let isMember;
      if (loggedIn) {
        isMember = JSON.parse(localStorage.getItem("user")).role
      }
      if (isMember != 3) {
        alert("Please Sign in first 👌")
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
      if (loggedIn) {
        let isAdmin = JSON.parse(localStorage.getItem("user")).role;
        let isDeputyAdmin = JSON.parse(localStorage.getItem("user")).role;
        if (isAdmin != 1 && isDeputyAdmin != 2) {
          next('/sign-up');
        } else {
          next();
        }
      }else{
        next('/sign-up');
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
