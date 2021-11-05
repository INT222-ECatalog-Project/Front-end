import { createStore, storeKey } from "vuex";
import { auth } from "./auth.module";
import authHeader from '../services/auth-header';
let user = JSON.parse(localStorage.getItem("user"));
// const BASE_URL = "http://52.187.114.221:9000/api";
const BASE_URL = "http://localhost:9000/api";
export default createStore({
  state: {
    // defaultUrl: "http://52.187.114.221:9000/api",
    defaultUrl: "http://localhost:9000/api",
    products: [],
    colors: [],
    brands: [],
    categories: [],
    wishlists: [],
    productUrl: `${BASE_URL}/products`,
    colorUrl: `${BASE_URL}/colors`,
    brandUrl: `${BASE_URL}/brands`,
    categoryUrl: `${BASE_URL}/categories`,
    wishlistUrl: "http://localhost:3000/wishlist",

    // account
    accounts: [],
    accountUrl: "http://localhost:3000/accounts",
    roles: [],
    roleUrl: "http://localhost:3000/roles",
  },
  mutations: {
    // products
    GET_PRODUCTS(state, products) {
      state.products = products;
    },

    // UPDATE_WISHLIST(state, updateWishlist) {
    //   const index = state.products.findIndex(
    //     (product) => product.id === updateWishlist.id
    //   );
    //   if (index !== -1) {
    //     // replace element at index from products[index] to updateWishlist
    //     state.products.splice(index, 1, updateWishlist);
    //   }
    // },

    ADD_PRODUCT(state, product) {
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
      const index = state.wishlists.findIndex((wishlist) => wishlist.id == id);
      if (index !== -1) {
        state.wishlist.splice(index, 1);
      }
    },

    // colors
    GET_COLORS(state, colors) {
      state.colors = colors;
      // console.log(state.colors)
    },

    ADD_COLOR(state, color) {
      console.log(state.colors);
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
    GET_ACCOUNTS(state, accounts) {
      state.accounts = accounts;
    },
    ADD_ACCOUNT(state, newAccount) {
      state.accounts.push(newAccount);
    },
    DELETE_ACCOUNT(state, id) {
      const index = state.accounts.findIndex((account) => account.id == id);
      if (index != -1) {
        state.accounts.splice(index, 1);
      }
    },
    UPDATE_ACCOUNT(state, updateAccount) {
      const index = state.accounts.findIndex(
        (account) => account.id == updateAccount.id
      );
      if (index !== -1) {
        state.accounts.splice(index, 1, updateAccount);
      }
    },
    // roles
    GET_ROLES(state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    async getProductsToStore(context) {
      fetch(this.state.productUrl,
      )
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_PRODUCTS", data.data);
          // console.log(data.data);
        })
        .catch((err) => console.log(err.message));
    },

    // setProductWishList(context, editProduct) {
    //   const jsonProduct = JSON.stringify(editProduct, {
    //     type: "application/json",
    //   });
    //   fetch(this.state.productUrl + "/" + editProduct.id, {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: jsonProduct,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       context.commit("UPDATE_WISHLIST", data);
    //     })
    //     .catch((err) => console.log(err));
    // },

    addProduct(context, payload) {
      console.log(payload.image);
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
        .then((res) => res.json())
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
      console.log(payload.product_id);
      console.log(payload.image);
      fetch(this.state.productUrl + "/" + payload.product_id, {
        headers: authHeader(),
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          context.commit("UPDATE_PRODUCT", data);
        })
        .catch((err) => console.log(err));
    },

    deleteProduct(context, id) {
      fetch(this.state.productUrl + "/" + id, {
        headers: authHeader(),
        method: "DELETE",
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_PRODUCT", id);
    },

    // wishlist
    getWishListToStore(context) {
      fetch(this.state.wishlistUrl)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_WISHLIST", data);
        })
        .catch((err) => console.log(err.message));
    },

    addToWishList(context, newWishList) {
      const jsonWishList = JSON.stringify(newWishList, {
        type: "application/json",
      });
      fetch(this.state.wishlistUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: jsonWishList,
      })
        .then((res) => res.json())
        .then((data) => {
          context.commit("ADD_WISHLIST", data);
        })
        .catch((err) => console.log(err));
    },

    deleteWishlist(context, id) {
      const index = this.state.wishlists.findIndex(
        (wishlist) => wishlist.product_id == id
      );
      const wishlistId = this.state.wishlists[index];
      console.log(this.state.wishlists);
      fetch(this.state.wishlistUrl + "/" + wishlistId, {
        method: "DELETE",
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_WISHLIST", wishlistId);
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
          "Authorization": 'Bearer ' + user.token 
        },
        body: jsonColor,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
          "Authorization": 'Bearer ' + user.token 
        },
        body: jsonColor,
      })
        // .then((res) => res.json())
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
        },
        body: jsonBrand,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          context.commit("ADD_BRAND", data);
        })
        .catch((err) => console.log(err));
    },
    deleteBrand(context, id) {
      fetch(this.state.brandUrl + "/" + id, {
        method: "DELETE",
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
        },
        body: jsonBrand,
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
      fetch(this.state.accountUrl)
        .then((res) => res.json())
        .then((data) => {
          context.commit("GET_ACCOUNTS", data);
        })
        .catch((err) => console.log(err.message));
    },

    createAccount(context, newAccount) {
      const jsonAccount = JSON.stringify(newAccount, {
        type: "application/json",
      });
      fetch(this.state.accountUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: jsonAccount,
      })
        .then((res) => res.json())
        .then((data) => {
          context.commit("ADD_ACCOUNT", data);
        })
        .catch((err) => console.log(err));
    },

    deleteAccount(context, id) {
      fetch(this.state.accountUrl + "/" + id, {
        method: "DELETE",
      }).catch((err) => console.log(err.message));
      context.commit("DELETE_ACCOUNT", id);
    },

    editAccount(context, editAccount) {
      const jsonEditAccount = JSON.stringify(editAccount, {
        type: "application/json",
      });
      fetch(this.state.accountUrl + "/" + editAccount.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: jsonEditAccount,
      })
        .then((data) => {
          context.commit("UPDATE_ACCOUNT", data);
        })
        .catch((err) => console.log(err));
    },

    // roles
    getRolesToSite(context) {
      fetch(this.state.roleUrl)
      .then((res) => res.json())
      .then((data) => {
        context.commit("GET_ROLES", data);
      })
      .catch((err) => console.log(err.message));
    }
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

    // role getters
    getRoles(state) {
      return state.roles;
    },
  },
  modules: { auth },
});
