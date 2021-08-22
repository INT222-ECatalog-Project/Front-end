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
            <div
              class="like-icon"
              @click="toggleWishList"
              :style="
                product.isWishList == true
                  ? { color: '#eb435f' }
                  : { color: 'grey' }
              "
            >
              <i class="heart fas fa-heart"></i>
            </div>
            <img :src="product.product_img" alt="" />
          </div>
          <div class="cloth-details">
            <div class="prod_name">
              {{ product.product_name }}
              <span class="brand">{{ product.product_brand }}</span>
            </div>
            <div class="prod_date">({{ product.date }})</div>
            <div class="prod_price">฿{{ product.product_price }}</div>
            <div class="prod_colors">
              <div
                class="color"
                v-for="color in product.colors"
                :key="color"
                :style="{ backgroundColor: color.color_code }"
              ></div>
            </div>
            <div class="prod_desc">
              {{ product.product_desc }}
            </div>
            <a href="#" class="btn btn--full"
              >Add to cart <i class="icon fas fa-cart-plus"></i
            ></a>
            <div class="action-btn">
              <router-link :to="{ name: 'EditProduct', params: { id: id } }"
                ><div class="btn btn--ghost">Edit</div></router-link
              >
              <div class="btn btn--full" @click="deleteProduct(product)">
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
export default {
  props: ["id"],
  name: "Product",
  components: {
    Socials,
    Footer,
  },
  data() {
    return {
      urlProductShow: "http://localhost:3000/products/" + this.id,
      product: {},
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    deleteProduct() {
      fetch(this.urlProductShow, {
        method: "DELETE",
      })
        .then(() => this.$emit("deleteProduct", this.product.id))
        .catch((err) => console.log(err.message));
      this.$router.go(-1);
    },
    toggleWishList() {
      this.product.isWishList = !this.product.isWishList;
      const editProduct = {
        product_name: this.product.product_name,
        product_desc: this.product.product_desc,
        product_price: this.product.product_price, //
        product_brand: this.product.product_brand, //
        product_type: this.product.product_type, //
        date: this.product.date, //
        colors: this.product.colors, //
        isWishList: !this.product.isWishList, //
        product_img: this.product.product_img,
      };
      // console.log(this.product);
      const jsonProduct = JSON.stringify(editProduct, {
        type: "application/json",
      });
      fetch(this.urlProductShow, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: jsonProduct,
      })
      .catch((err) => console.log(err));
      // this.$emit("toggleWishList", this.product.id);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    fetch(this.urlProductShow)
      .then((res) => res.json())
      .then((data) => (this.product = data))
      .catch((err) => console.log(err.message));
    // console.log(this.isWishList)
  },
};
</script>
<style scoped>
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
  /* margin-top: 2.4rem; */
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
.like-icon {
  z-index: 99;
}
/* below 560px */
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
    width: 100%;
    height: auto;
    position: relative;
  }
  .img-product img {
    width: 100%;
    height: 36rem;
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
  .cloth-details {
    background-color: #fff;
    transform: translateY(-3.6rem);
    width: 90%;
    margin: 0 5%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 0px -5px,
      rgba(0, 0, 0, 0.3) 0px 0px 16px -8px;
    /* position:absolute;
    left:0;
    right:0; */
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