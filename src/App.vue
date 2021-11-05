<template>
  <div>
    <div id="nav">
      <div class="logo"><span>NERDY</span>STYLE</div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <a href="/#section-about">About</a>
        <router-link to="/stores">Stores</router-link>
        <div class="dropdown" v-if="isAdmin || isDeputyAdmin">
          <ul>
            <li>
              Management<i class="fas fa-angle-down"></i>
              <ul>
                <li v-if="isAdmin">
                  <router-link to="/add-product">Products</router-link>
                </li>
                <li>
                  <router-link to="/colors+brands"
                    >Colors &amp; Brands</router-link
                  >
                </li>
                <li v-if="isAdmin">
                  <router-link to="/users">Users</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <router-link v-if="currentUser" to="/profile">Profile</router-link>
        <router-link
          v-if="currentUser"
          to="/sign-up"
          class="sign"
          @click="logOut"
          >Log out</router-link
        >
        <router-link v-if="!currentUser" class="sign" to="/sign-up"
          >Sign up</router-link
        >
        <router-link
          to="/wish-list"
          class="wishlist"
          v-if="!isDeputyAdmin && !isAdmin"
          ><i class="far fa-heart"></i>
        </router-link>
      </div>
      <div
        class="nav-mobile-links"
        @click="isShow = !isShow"
        v-if="isShow == false"
      >
        <i class="fas fa-bars"></i>
      </div>
      <div
        class="nav-mobile-links"
        @click="isShow = !isShow"
        v-if="isShow == true"
      >
        <i class="fas fa-times"></i>
      </div>
      <div class="menu-bar" v-show="isShow">
        <router-link to="/" @click="isShow = !isShow">Home</router-link>
        <a href="/#section-about" @click="isShow = !isShow">About</a>
        <router-link to="/stores" @click="isShow = !isShow">Stores</router-link>
        <router-link to="/add-product" v-if="isAdmin" @click="isShow = !isShow"
          >Product</router-link
        >
        <router-link
          to="/colors+brands"
          v-if="isAdmin || isDeputyAdmin"
          @click="isShow = !isShow"
          >Colors &amp; Brands</router-link
        >
        <router-link to="/users" v-if="isAdmin" @click="isShow = !isShow"
          >Users</router-link
        >
        <router-link v-if="currentUser" to="/profile">Profile</router-link>
        <router-link
          v-if="currentUser"
          to="/sign-up"
          class="sign"
          @click="logOut"
          >Log out</router-link
        >
        <router-link
          v-if="!currentUser"
          class="sign"
          to="/sign-up"
          @click="isShow = !isShow"
          >Sign up</router-link
        >
        <router-link to="/wish-list" @click="isShow = !isShow"
          >Wish List</router-link
        >
      </div>
    </div>
  </div>

  <router-view v-slot="{ Component }">
    <transition name="route">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
  <!-- <router-view/> -->
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      productUrl: "http://localhost:3000/products",
      products: [],
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.isShow = !this.isShow;
    },
    parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
  },
  computed: {
    currentUser() {
      // console.log(JSON.parse(localStorage.getItem("user")).token);
      if (localStorage.getItem("user")) {
              console.log(this.parseJwt((JSON.parse(localStorage.getItem("user")).token)));
              // console.log(this.$store.state.auth.user);
              // return this.parseJwt((JSON.parse(localStorage.getItem("user")).token));
      }

      // return false;
      // console.log(this.state);
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser["role"] == 1) {
        return true;
      }
      return false;
      // if (this.currentUser && this.currentUser.role_id == 1) {
      //   return true;
      // }
      // return false;
    },
    isDeputyAdmin() {
      if (this.currentUser && this.currentUser["role"] == 2) {
        return true;
      }
      return false;
      // if (this.currentUser && this.currentUser.role_id == 2) {
      //   return true;
      // }
      // return false;
    },
    isMobileSign() {
      return window.innerWidth;
    },
    getAllproducts() {
      return this.$store.state.products;
    },
    numberOfWishlist() {
      return this.getAllproducts.filter((product) => {
        return product.isWishList;
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > document.getElementById("nav").offsetTop) {
        document.getElementById("nav").classList.add("sticky");
      } else {
        document.getElementById("nav").classList.remove("sticky");
      }
    });
    document.querySelector(".logo").addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  },
};
</script>

<style scoped>
#nav {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  padding: 3.2rem 4.8rem;
  align-items: center;
  z-index: 1000;
  width: 100%;
  transition: 0.3s all ease-in-out;
}

.sticky {
  top: 0%;
  position: fixed !important;
  background-color: rgba(231, 227, 224, 0.75);
  padding-bottom: 3.6rem;
  backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
  /* webkit is for safari */
  -webkit-backdrop-filter: blur(10px) saturate(100%) contrast(45%)
    brightness(130%);
  transition: 0.3s all ease-in-out;
}

.logo {
  padding-left: 4.8rem;
  font-weight: 900;
  font-size: 2.4rem;
  color: #333;
  cursor: pointer;
}

.logo span {
  color: #eb435f;
}

.fa-angle-down {
  padding-top: 0.2rem;
  margin-left: 0.6rem;
  font-weight: 300;
}
.dropdown ul {
  list-style: none;
}
.dropdown > ul > li {
  position: relative;
}
.dropdown ul ul {
  position: absolute;
  display: none;
}
.dropdown ul li:hover > ul {
  display: block;
  z-index: 999;
  margin-top: 0.2rem;
  background-color: #e7e3e0;
  width: 14rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
.dropdown ul li > ul li {
  padding: 2.4rem 0;
  border-top: 1px solid rgba(85, 85, 85, 0.25);
  width: 90%;
  margin: 0 5%;
}
.dropdown ul li:hover > ul li:first-child {
  border-top: none;
}
.dropdown ul li:hover > ul li a {
  width: 90%;
  margin: 0 5%;
}

.nav-links {
  display: flex;
  flex-direction: row;
  gap: 7.2rem;
  justify-self: center;
  align-items: center;
  font-size: 1.6rem;
}

.nav-links .sign {
  background-color: #eb435f;
  padding: 0.8rem 1.2rem;
  color: white;
}

.nav-links a,
.menu-bar a {
  color: #444;
}

.nav-links .sign:hover {
  background-color: transparent;
  box-shadow: inset 0 0 0 1px #eb435f;
}

.nav-links a:link,
.nav-links a:visited,
.menu-bar a:link,
.menu-bar a:visited {
  text-decoration: none;
  transition: 0.3s all ease-in-out;
}

.nav-links a:hover,
.menu-bar a:hover {
  color: #eb435f;
}

.nav-links a.router-link-exact-active,
.menu-bar a.router-link-exact-active {
  color: #eb435f;
}

.nav-links .sign.router-link-exact-active {
  color: #fff;
  background: #bc364c;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(10rem);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-10rem);
}

.route-leave-active {
  transition: 0.3s all ease-in;
}

.nav-mobile-links {
  display: none;
}

.menu-bar {
  display: none;
}
.wishlist {
  position: relative;
}
.wishlist .number {
  font-size: 1rem;
  top: 0%;
  position: absolute;
}

@media (max-width: 84em) {
  .nav-links {
    display: none;
  }
  .logo {
    padding-left: 0rem;
  }
  .nav-mobile-links {
    display: block;
    font-size: 2rem;
    color: #333;
    justify-self: end;
  }
  .menu-bar {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    grid-column: span 2;
    row-gap: 2.4rem;
    margin-top: 4rem;
    font-size: 1.6rem;
    animation-name: appears-from-top;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
  }
  .menu-bar a {
    /* border-bottom: rgba(85, 85, 85,0.25) solid 0.5px; */
    padding-bottom: 2rem;
  }
  /* .menu-bar a:last-child{
     border-bottom: none;
  } */
}

/* below 588px */
@media (max-width: 37em) {
  .logo {
    padding-left: 0rem;
    font-size: 2rem;
  }
  .menu-bar {
    row-gap: 1.8rem;
  }
}

@media (max-width: 29em) {
  #nav {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    padding: 2.4rem 2rem;
    align-items: center;
    z-index: 1000;
    width: 100%;
    transition: 0.3s all ease-in-out;
  }
}
</style>
