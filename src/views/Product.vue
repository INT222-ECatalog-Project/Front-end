<template>
  <div class="Product">
    <div class="section detail-section">
      <div class="container">
        <div class="sub-heading">Get in details</div>
        <div class="secondary-header">Clothes</div>
        <div class="back-btn" @click="goBack">
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class="product-details grid grid--2-cols">
          <div class="img-product">
            <div v-if="isMember"
              class="like-icon"
              @click="toggleWishList"
              :style="
                isWishList == true
                  ? { color: '#eb435f' }
                  : { color: 'grey' }
              "
            >
              <i class="heart fas fa-heart"></i>
            </div>
            <img :src="urlImages" @error="$event.target.src='http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'" alt="product image" />
          </div>
          <div class="cloth-details">
            <div class="prod_name">
              {{ product.product_name }}
              <span class="brand">{{ brand }}</span>
            </div>
            <div class="prod_date">({{ date.toString().split('T')[0] }})</div>
            <div class="prod_price">฿{{ product.price }}</div>
            <div class="prod_colors">
              <div
                class="color"
                v-for="color in product.productdetail"
                :key="color.color_id"
                :style="{ backgroundColor: color.color.color_code }"
              >
                <span class="tooltiptext">{{ color.color.color_name }}</span>
              </div>
            </div>
            <div class="prod_desc">
              {{ product.product_desc }}
            </div>
            <a href="#" class="btn btn--full"
              >Add to cart <i class="icon fas fa-cart-plus"></i
            ></a>
            <div class="action-btn">
              <router-link v-if="isAdmin || isDeputyAdmin" :to="{ name: 'EditProduct', params: { id: id } }"
                ><div class="btn btn--ghost">Edit</div></router-link
              >
              <div v-if="isAdmin" class="btn btn--full" @click="deleteProduct(product)">
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Socials from "@/components/Socials.vue";
import Footer from "@/components/Footer.vue";
import authHeader from "../services/auth-header";
export default {
  props: ["id"],
  name: "Product",
  components: {
    Socials,
    Footer,
  },
  data() {
    return {
      urlImages: this.$store.state.defaultUrl+ "/image/" +this.id,
      urlProductShow: this.$store.state.defaultUrl+ "/products/" + this.id,
      product: {},
      brand: "",
      date:"",
      heart: false,
      wishlistUrl: this.$store.state.wishlistUrl+"/",
      isWishList:false,
      wishlist:null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    deleteProduct() {
      if (confirm("Do you really want to delete? 😲")) {
        this.$store.dispatch("deleteProduct", this.id);
        this.$router.push("/stores");
      }
    },
    toggleWishList() {
      if (this.isWishList) {
        this.$store.dispatch("deleteFromWishlist", this.id);
        this.isWishList = false;
      }else{
        this.$store.dispatch("addToWishList", this.product);
        this.isWishList = true;
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isMember() {
      if (this.currentUser && this.currentUser["role"] == 3) {
        return true;
      }
      return false;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser['role']==1) {
        return true
      }
      return false;
    },
    isDeputyAdmin() {
      if (this.currentUser && this.currentUser['role']==2) {
        return true
      }
      return false;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    fetch(this.urlProductShow)
      .then((res) => {
        if (res.status == 404) {
          alert("This product is not released yet")
          this.$router.go(-1)
        }
        return res.json()
        })
      .then((data) => {
        this.product = data.data;
        this.brand = data.data.brand.brand_name;
        this.date = data.data.release_date;
      })
      .catch((err) => console.log(err.message));
    if (this.isMember) {
    fetch(this.wishlistUrl,{
        headers: authHeader(),
      })
        .then((res) => res.json())
        .then((data) => {
          this.wishlist = data.data;
          for (let index = 0; index < this.wishlist.length; index++) {
            if (this.wishlist[index].product_id == this.id) {
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
.section{
  margin-top: 3.6rem;
}
.container {
  position: relative;
}
.heart {
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
.back-btn {
  z-index: 999;
  display: none !important ;
  background-color: #333;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-left: 2.4rem;
  margin-top: 2.4rem;
  cursor: pointer;
}
.fa-chevron-left {
  width: 2.4rem;
  height: 2.4rem;
  color: #fff;
}
.img-product {
  width: 100%;
  height: 64rem;
  position: relative;
}

.img-product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cloth-details {
  width: 100%;
  padding: 2.4rem 3.6rem;
}

.prod_name {
  font-size: 2.4rem;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 0.8rem;
}

.brand {
  font-size: 1.2rem;
  color: rgba(110, 110, 110, 0.75);
  background-color: rgba(110, 110, 110, 0.1);
  padding: 0.8rem;
  border-radius: 1.4rem;
}

.prod_date {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2.4rem;
}

.prod_desc {
  font-size: 1.6rem;
  line-height: 1.4;
  word-spacing: 0.2rem;
  color: #555;
}

.prod_price {
  font-size: 2.4rem;
  color: #333;
  margin-bottom: 2.4rem;
}

.action-btn {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.8rem;
}

.btn {
  text-align: center;
  width: 100%;
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1.2rem 2.4rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  margin-top: 1.6rem;
}

.action-btn .btn--full {
  background-color: red;
}

.action-btn .btn--full:hover {
  background-color: rgb(153, 0, 0);
}

.btn--full {
  background-color: #333;
  color: white;
  transition: 0.3s all ease-in-out;
}

.btn--full:hover {
  background-color: #555;
}

.btn--ghost {
  box-shadow: inset 0 0 0 1px #eb435f;
  color: #eb435f;
  transition: 0.3s all ease-in-out;
}

.btn--ghost:hover {
  background-color: #bc364c;
  color: #e7e3e0;
  box-shadow: none;
}
.prod_colors {
  flex-wrap: wrap;
  display: flex;
  gap: 0.4rem;
  margin-bottom: 2.4rem;
}
.color {
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid rgba(85, 85, 85, 0.55);
  background-color: #fff;
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
  font-size: 1.2rem;
  margin-top: 2.4rem;
}
.like-icon {
  z-index: 99;
}
/* below 870px */
@media (max-width: 54em) {
  .section {
    margin-top: 2.4rem;
  }
  .product-details.grid {
    row-gap: 4.8rem;
  }
  .product-details.grid--2-cols {
    grid-template-columns: 1fr;
  }
  .img-product {
    width: 80%;
    height: 62rem;
    position: relative;
    margin: 0 10%;
  }
  .img-product img {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .prod_name {
    font-size: 2rem;
  }
  .prod_desc {
    font-size: 1.4rem;
  }
}

/* below 470px */
@media (max-width: 29em) {
  .back-btn {
    display: flex !important;
  }
  footer {
    display: none;
  }
  .sub-heading,
  .secondary-header {
    display: none;
  }
  .product-details.grid {
    row-gap: 0rem;
  }
  .img-product img {
    width: 100%;
    margin: 0;
  }
  .img-product {
    width: 100%;
    height: auto;
    position: relative;
    margin: 0;
  }
  .cloth-details {
    background-color: #fff;
    transform: translateY(-3.6rem);
    width: 90%;
    margin: 0 5% 2.4rem 5%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 0px -5px,
      rgba(0, 0, 0, 0.3) 0px 0px 16px -8px;
  }
  .prod_name {
    font-size: 1.8rem;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .prod_desc {
    font-size: 1.2rem;
  }
}
</style>
