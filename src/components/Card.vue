<template>
  <div class="card-component">
    <div class="product-img">
      <div
        v-if="isMember"
        class="like-icon"
        @click="toggleWishList"
        :style="
          isWishList == true || $route.name == 'WishList'
            ? { color: '#eb435f' }
            : { color: 'grey' }
        "
      >
        <i class="icon fas fa-heart"></i>
      </div>

      <img
        :src="urlImages"
        @error="
          $event.target.src =
            'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
        "
        alt="product images"
        @click="showDetails(product)"
      />
    </div>
    <div class="product-purchase">
      <div class="add-to-cart">
        Add to cart
        <i class="fas fa-cart-plus"></i>
      </div>
    </div>
    <div class="product-info" v-if="$route.name != 'Profile'">
      <div class="product-brand">
        <div v-if="product.brand">{{ product.brand.brand_name }}</div>
      </div>
      <div class="product-name">
        {{ product.product_name }}
      </div>
      <div class="product-price">฿{{ product.price }}</div>
      <div class="product-colors">
        <div
          class="color"
          v-for="color in product.productdetail"
          :key="color.color.color_code"
          :style="{ backgroundColor: color.color.color_code }"
        >
          <span class="tooltiptext">{{ color.color.color_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { jwtDecrypt } from "../shared/jwtHelper";
import authHeader from "../services/auth-header";
export default {
  name: "Card",
  props: ["product"],
  data() {
    return {
      notFoundImg: "../../src/assets/images/not-found.png",
      heart: false,
      allColors: [],
      urlImages:
        this.$store.state.defaultUrl + "/image/" + this.product.product_id,
      wishlistUrl: this.$store.state.wishlistUrl+"/",
      isWishList: "",
      wishlist:null,
    };
  },
  methods: {
    ...mapActions(["getWishListToStore"]),
    toggleWishList() {
      if (this.isWishList) {
        this.$emit('toggleWishListDelete',this.product.product_id)
        this.isWishList = false;
      }else{
        this.$emit('toggleWishList',this.product)
        this.isWishList = true;
      }
    },
    showDetails(product) {
      this.$router.push({
        name: "Product",
        params: {
          id: product.product_id,
        },
      });
    },
  },
  computed: mapGetters(["getWishList"]),
  computed: {
    currentUser() {
      if (localStorage.getItem("user")) {
              return  jwtDecrypt((JSON.parse(localStorage.getItem("user")).token));
      }
      return false;
    },
    isMember() {
      if (this.currentUser && this.currentUser.role_id == 3) {
        return true;
      }
      return false;
    },
    getAllColors() {
      for (let index = 0; index < this.product.colors.length; index++) {
        this.allColors.push(this.product.colors[index].color_code);
      }
      return this.allColors;
    },
  },
  mounted() {
    if (this.isMember) {
    fetch(this.wishlistUrl,{
        headers: authHeader(),
      })
        .then((res) => res.json())
        .then((data) => {
          this.wishlist = data.data;
          for (let index = 0; index < this.wishlist.length; index++) {
            if (this.wishlist[index].product_id == this.product.product_id) {
              this.isWishList = true;
            }
          }
        })
        .catch((err) => console.log(err.message));
      }
  },
};
</script>

<style scoped>
/* card-component-style */
.card-component {
  width: 100%;
}

.product-img {
  width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.icon {
  width: 3.6rem;
  height: 3.6rem;
  z-index: 999;
  position: absolute;
  top: 0%;
  right: 0%;
  margin: 2.4rem 2.4rem 0 0;
  cursor: pointer;
  background: #fff;
  padding: 1rem;
  border-radius: 50%;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

.product-img img:hover {
  transform: scale(1.05);
}

.product-info {
  color: #333;
  margin-top: 0.8rem;
  padding: 1.2rem 2.4rem;
}

.product-brand {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  background-color: rgba(110, 110, 110, 0.1);
  border-radius: 1rem;
  width: 30%;
  margin: 0 35% 1.2rem 35%;
  padding: 0.2rem;
  color: rgba(110, 110, 110, 0.75);
  text-transform: uppercase;
}

.product-name {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 1rem;
  word-spacing: 0.2rem;
}

.product-price {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 1.4rem;
}

.product-colors {
  display: flex;
  width: 80%;
  margin: 0 10%;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

.color {
  width: 1.2rem;
  height: 1.2rem;
  /* background-color: #eb435f; */
  border: 1px solid rgba(110, 110, 110, 0.5);
}

.product-purchase {
  width: 100%;
  background-color: #333;
  height: 3.6rem;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  color: #fff;
  text-align: center;
}

.product-purchase:hover {
  background-color: #555;
}

.add-to-cart {
  font-size: 1.4rem;
  padding: 1rem;
}

.fa-cart-plus {
  margin-left: 0.8rem;
}

.color:hover .tooltiptext {
  visibility: visible;
}
.tooltiptext {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.55);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0.6rem 0.4rem;
  position: absolute;
  z-index: 1;
  font-size: 1rem;
  margin-left: 0.4rem;
}

/* below 700px */
@media (max-width: 44em) {
  .product-name {
    font-size: 1.4rem;
    line-height: 1.2;
  }
}

/* below 480px */
@media (max-width: 30em) {
  .product-img {
    height: 32rem;
  }
  .product-brand {
    width: 60%;
    margin: 0 20% 1.2rem 20%;
  }
  .color {
    width: 1.4rem;
    height: 1.4rem;
  }
  .icon {
    width: 3.6rem;
    height: 3.6rem;
    z-index: 999;
    position: absolute;
    top: 0%;
    right: 0%;
    margin: 1.2rem 1.2rem 0 0;
    cursor: pointer;
    background: #fff;
    padding: 1rem;
    border-radius: 50%;
  }
}

/* below 375px */
@media (max-width: 24em) {
  .product-img {
    height: 36rem;
    width: 80%;
    margin: 0 10%;
  }
  .product-purchase {
    width: 80%;
    margin: 0 10%;
  }
  .product-brand {
    width: 25%;
    margin: 0 37.5% 1.2rem 37.5%;
  }
  .icon {
    width: 3.6rem;
    height: 3.6rem;
    z-index: 999;
    position: absolute;
    top: 0%;
    right: 0%;
    margin: 2.4rem 2.4rem 0 0;
    cursor: pointer;
    background: #fff;
    padding: 1rem;
    border-radius: 50%;
  }
}
</style>
