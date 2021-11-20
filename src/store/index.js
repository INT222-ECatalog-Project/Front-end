import { createStore, storeKey } from "vuex";
import router from "../router";
import { auth } from "./auth.module";
import authHeader from "../services/auth-header";
let user = JSON.parse(localStorage.getItem("user"));
const BASE_URL = "https://52.187.114.221/backend/api";
// const BASE_URL = "http://localhost:9000/api";
export default createStore({
  state: {
    defaultUrl: "https://52.187.114.221/backend/api",
    // defaultUrl: "http://localhost:9000/api",
    products: [],
    colors: [],
    brands: [],
    categories: [],
    wishlists: [],
    productUrl: `${BASE_URL}/products`,
    colorUrl: `${BASE_URL}/colors`,
    brandUrl: `${BASE_URL}/brands`,
    categoryUrl: `${BASE_URL}/categories`,
    wishlistUrl: `${BASE_URL}/wishlist`,

    // account
    accounts: [],
    accountUrl: `${BASE_URL}/accounts/adminpage`,
    accountActionURL: `${BASE_URL}/account`,
    // accountAddURL: `${BASE_URL}/register`,
    accountAddURL: `${BASE_URL}/account/addAdmin`,
    usernameURL: `${BASE_URL}/accounts`,
    username: "",
    profile: "",
    roles: [],
    roleUrl: `${BASE_URL}/roles`,
  },
  mutations: {
    // products
    GET_PRODUCTS(state, products) {
      state.products = products;
    },

    ADD_PRODUCT(state, product) {
      // console.log(product);
      state.products.push(product);
    },

    UPDATE_PRODUCT(state, updateProduct) {
      const index = state.products.findIndex(
        (product) => product.product_id === updateProduct.product_id
      );
      if (index !== -1) {
        state.products.splice(index, 1, updateProduct);
      }
    },

    DELETE_PRODUCT(state, id) {
      const index = state.products.findIndex(
        (product) => product.product_id == id
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },

    // wishlist
    GET_WISHLIST(state, wishlists) {
      state.wishlists = wishlists;
    },

    ADD_WISHLIST(state, newWishlist) {
      state.wishlists.push(newWishlist);
    },

    DELETE_WISHLIST(state, id) {
      const index = state.wishlists.findIndex((wishlist) => wishlist.product_id == id);
      if (index !== -1) {
        state.wishlists.splice(index, 1);
      }
    },

    // colors
    GET_COLORS(state, colors) {
      state.colors = colors;
      // console.log(state.colors)
    },

    ADD_COLOR(state, color) {
      // console.log(state.colors);
      state.colors.push(color);
    },

    DELETE_COLOR(state, id) {
      const index = state.colors.findIndex((color) => color.color_id == id);
      if (index !== -1) {
        state.colors.splice(index, 1);
      }
    },

    UPDATE_COLOR(state, updateColor) {
      const index = state.colors.findIndex(
        (color) => color.color_id == updateColor.color_id
      );
      if (index !== -1) {
        state.colors.splice(index, 1, updateColor);
      }
    },
    // brands
    GET_BRANDS(state, brands) {
      state.brands = brands;
    },
    ADD_BRAND(state, brand) {
      // console.log(state.brands);
      state.brands.push(brand);
    },
    DELETE_BRAND(state, id) {
      const index = state.brands.findIndex((brand) => brand.brand_id == id);
      if (index !== -1) {
        state.brands.splice(index, 1);
      }
    },
    UPDATE_BRAND(state, updateBrand) {
      // console.log(state.brands);
      const index = state.brands.findIndex(
        (brand) => brand.brand_id == updateBrand.brand_id
      );
      if (index !== -1) {
        state.brands.splice(index, 1, updateBrand);
      }
    },

    // categories
    GET_CATEGORIES(state, categories) {
      state.categories = categories;
    },

    // accounts
    GET_USERNAMES(state, username) {
      state.username = username;
    },
    GET_PROFILE(state, profile) {
      state.profile = profile;
    },
    GET_ACCOUNTS(state, accounts) {
      state.accounts = accounts;
    },
    ADD_ACCOUNT(state, newAccount) {
      state.accounts.push(newAccount);
    },
    DELETE_ACCOUNT(state, id) {
      const index = state.accounts.findIndex(
        (account) => account.account_id == id
      );
      if (index != -1) {
        state.accounts.splice(index, 1);
      }
    },
    UPDATE_ACCOUNT(state, updateAccount) {
      const index = state.accounts.findIndex(
        (account) => account.account_id == updateAccount.account_id
      );
      if (index !== -1) {
        state.accounts.splice(index, 1, updateAccount);
      }
    },
    // roles
    GET_ROLES(state, roles) {
      state.roles = roles;
    },
  },
  actions: {
    async getProductsToStore(context) {
      fetch(this.state.productUrl)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_PRODUCTS", data.data);
        })
        .catch((err) => console.log(err.message));
    },

    addProduct(context, payload) {
      const jsonProduct = JSON.stringify(payload.newProduct);
      const blob = new Blob([jsonProduct], {
        type: "application/json",
      });
      const formData = new FormData();
      formData.append("imageFile", payload.image);
      formData.append("newProduct", blob);
      fetch(this.state.productUrl, {
        headers: authHeader(),
        method: "POST",
        body: formData,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("ADD_PRODUCT", data);
        })
        .catch((err) => console.log(err));
    },

    editProduct(context, payload) {
      const jsonEditProduct = JSON.stringify(payload.editProduct);
      const blob = new Blob([jsonEditProduct], {
        type: "application/json",
      });
      const formData = new FormData();
      formData.append("imageFile", payload.image);
      formData.append("editedProduct", blob);
      fetch(this.state.productUrl + "/" + payload.product_id, {
        headers: authHeader(),
        method: "PUT",
        body: formData,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("UPDATE_PRODUCT", data);
        })
        .catch((err) => console.log(err));
    },

    deleteProduct(context, id) {
      fetch(this.state.productUrl + "/" + id, {
        headers: authHeader(),
        method: "DELETE",
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
      })
      .catch((err) => console.log(err.message));
      context.commit("DELETE_PRODUCT", id);
    },

    // wishlist
    getWishListToStore(context) {
      fetch(this.state.wishlistUrl + "/", {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("GET_WISHLIST", data.data);
        })
        .catch((err) => console.log(err.message));
    },

    addToWishList(context, newWishList) {
      fetch(this.state.wishlistUrl + "/" + newWishList.product_id, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("ADD_WISHLIST", data);
        })
        .catch((err) => console.log(err));
    },

    deleteFromWishlist(context, id) {
      fetch(this.state.wishlistUrl + "/" + id, {
        headers: authHeader(),
        method: "DELETE",
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_WISHLIST", id);
    },

    // colors
    getColorToStore(context) {
      fetch(this.state.colorUrl)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_COLORS", data.data);
        })
        .catch((err) => console.log(err.message));
    },

    addColor(context, newColor) {
      const jsonColor = JSON.stringify(newColor, {
        type: "application/json",
      });
      fetch(this.state.colorUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonColor,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          // console.log(data);
          context.commit("ADD_COLOR", data);
        })
        .catch((err) => console.log(err));
    },

    deleteColor(context, id) {
      fetch(this.state.colorUrl + "/" + id, {
        headers: authHeader(),
        method: "DELETE",
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_COLOR", id);
    },

    editColor(context, editcolor) {
      const jsonColor = JSON.stringify(editcolor, {
        type: "application/json",
      });
      fetch(this.state.colorUrl + "/" + editcolor.color_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonColor,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("UPDATE_COLOR", data);
        })
        .catch((err) => console.log(err));
    },

    // brands
    getBrandsToStore(context) {
      fetch(this.state.brandUrl)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_BRANDS", data.data);
        })
        .catch((err) => console.log(err.message));
    },
    addBrand(context, newBrand) {
      const jsonBrand = JSON.stringify(newBrand, {
        type: "application/json",
      });
      fetch(this.state.brandUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonBrand,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          // console.log(data);
          context.commit("ADD_BRAND", data);
        })
        .catch((err) => console.log(err));
    },
    deleteBrand(context, id) {
      fetch(this.state.brandUrl + "/" + id, {
        method: "DELETE",
        headers: authHeader(),
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_BRAND", id);
    },
    editBrand(context, editBrand) {
      const jsonBrand = JSON.stringify(editBrand, {
        type: "application/json",
      });
      fetch(this.state.brandUrl + "/" + editBrand.brand_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonBrand,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("UPDATE_BRAND", data);
        })
        .catch((err) => console.log(err));
    },

    // categories
    getCategoriesToStore(context) {
      fetch(this.state.categoryUrl)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_CATEGORIES", data.data);
        })
        .catch((err) => console.log(err.message));
    },

    // Accounts
    getAccountsToSite(context) {
      // if (user && user.token) {
      fetch(this.state.accountUrl, {
        headers: authHeader(),
      })
        .then((res) => {
          if (res.status == 400) {
            this.dispatch("auth/logout")
            // router.push("/");
          }
          return res.json()
        })
        .then((data) => {
          context.commit("GET_ACCOUNTS", data.data);
        })
        .catch((err) => console.log(err.message));
      // }
    },
    getAllUsernames(context) {
      fetch(this.state.usernameURL)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_USERNAMES", data.data);
        })
        .catch((err) => console.log(err.message));
    },
    createAccount(context, newAccount) {
      const jsonAccount = JSON.stringify(newAccount, {
        type: "application/json",
      });
      fetch(this.state.accountAddURL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonAccount,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        if(res.status == 403){
          alert("Invalid admin password")
        }
        return res.json()
      })
        .then((data) => {
          context.commit("ADD_ACCOUNT", data);
        })
        .catch((err) => console.log(err));
    },
    getProfileToSite(context) {
      fetch(this.state.accountActionURL + "/", {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("GET_PROFILE", data.data);
        })
        .catch((err) => console.log(err.message));
    },
    profileCustomization(context, editAccount) {
      const jsonEditAccount = JSON.stringify(editAccount, {
        type: "application/json",
      });
      console.log(jsonEditAccount);
      fetch(this.state.accountActionURL + "/updateProfile", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonEditAccount,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("UPDATE_ACCOUNT", data);
        })
        .catch((err) => console.log(err));
    },
    deleteAccount(context, payload) {
      // const jsonPassword = JSON.stringify(payload.password, {
      //   type: "application/json",
      // });
      // console.log(jsonPassword);
      fetch(this.state.accountActionURL + "/", {
        headers: authHeader(),
        method: "DELETE",
        // body: jsonPassword,
      })
        .then((res) => {
          if (res.status === 200) {
            router.push("/");
            // localStorage.removeItem("user")
          }
        })
        .catch((err) => console.log(err.message));
      // context.commit("DELETE_ACCOUNT", payload.account_id);
    },
    deleteAccountByAdmin(context, id) {
      fetch(this.state.accountActionURL + "/" + id, {
        headers: authHeader(),
        method: "DELETE",
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_ACCOUNT", id);
    },

    editAccountByAdmin(context, editAccount) {
      const jsonEditAccount = JSON.stringify(editAccount, {
        type: "application/json",
      });
      console.log(editAccount.account_id);
      fetch(this.state.accountActionURL + "/" + editAccount.account_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: jsonEditAccount,
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          console.log(data);
          context.commit("UPDATE_ACCOUNT", data);
        })
        .catch((err) => console.log(err));
    },

    // roles
    getRolesToSite(context) {
      fetch(this.state.roleUrl, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.status == 400) {
          this.dispatch("auth/logout")
          router.push("/sign-up");
        }
        return res.json()
      })
        .then((data) => {
          context.commit("GET_ROLES", data.data);
        })
        .catch((err) => console.log(err.message));
    },
  },
  getters: {
    // product getters
    getProducts(state) {
      return state.products;
    },
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },

    // color getters
    getColors(state) {
      return state.colors;
    },

    // brand getters
    getBrands(state) {
      return state.brands;
    },

    // category getters
    getCategories(state) {
      return state.categories;
    },

    // wishlist getters
    getWishList(state) {
      return state.wishlists;
    },

    // account getters
    getAccounts(state) {
      return state.accounts;
    },
    getProfile(state) {
      return state.profile;
    },
    getUsernames(state) {
      return state.username;
    },

    // role getters
    getRoles(state) {
      return state.roles;
    },
  },
  modules: { auth },
});
