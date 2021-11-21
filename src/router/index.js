import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("../views/Home.vue");
const Stores = () => import("../views/Store.vue");
const Product = () => import("../views/Product.vue");
const SignUp = () => import("../views/SignUp.vue");
const AddProduct = () => import("../views/AddProduct.vue");
const EditProduct = () => import("../views/EditProduct.vue");
const Users = () => import("../views/Users.vue");
const WishList = () => import("../views/WishList.vue");
const NotFound = () => import("../views/NotFound.vue");
const ColorsBrands = () => import("../views/ColorsBrands.vue");
const Profile = () => import("../views/Profile.vue");
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { jwtDecrypt } from "../shared/jwtHelper";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/stores",
    name: "Stores",
    component: Stores,
  },
  {
    path: "/stores/product/:id",
    name: "Product",
    props: true,
    component: Product,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/add-product",
    name: "AddProduct",
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem("user");
      if (loggedIn) {
        let isAdmin = jwtDecrypt(loggedIn);
        if (isAdmin.role_id != 1) {
          next("/sign-up");
        } else {
          next();
        }
      } else {
        next("/sign-up");
      }
    },
  },
  {
    path: "/edit-product/:id",
    name: "EditProduct",
    component: EditProduct,
    props: true,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem("user");
      if (loggedIn) {
        let isAdmin = jwtDecrypt(loggedIn);
        let isDeputyAdmin = jwtDecrypt(loggedIn);
        if (isAdmin.role_id != 1 && isDeputyAdmin.role_id != 2) {
          next("/sign-up");
        } else {
          next();
        }
      } else {
        next("/sign-up");
      }
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem("user");
      if (loggedIn) {
        let isAdmin = jwtDecrypt(loggedIn);
        if (isAdmin.role_id != 1) {
          next("/sign-up");
        } else {
          next();
        }
      } else {
        next("/sign-up");
      }
    },
  },
  {
    path: "/wish-list",
    name: "WishList",
    component: WishList,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem("user");
      let isMember;
      if (loggedIn) {
        isMember = jwtDecrypt(loggedIn);
        if (isMember.role_id != 3) {
          alert("Only member can have wishlists 👌");
          next("/sign-up");
        } else {
          next();
        }
      } else {
        alert("Please Sign in first 👌");
        next("/sign-up");
      }
    },
  },
  {
    path: "/colors+brands",
    name: "ColorsBrands",
    component: ColorsBrands,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem("user");
      if (loggedIn) {
        let isAdmin = jwtDecrypt(loggedIn);
        let isDeputyAdmin = jwtDecrypt(loggedIn);
        if (isAdmin.role_id != 1 && isDeputyAdmin.role_id != 2) {
          next("/sign-up");
        } else {
          next();
        }
      } else {
        next("/sign-up");
      }
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem("user");
      if (!loggedIn) {
        next("/sign-up");
      } else {
        next();
      }
    },
  },
  {
    path: "/:catchall(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
