<template>
  <div class="section section-wish-list">
    <div class="container">
      <div class="sub-heading">wishing</div>
      <div class="secondary-header">Wish List</div>
      <div class="card-grid grid grid--4-cols">
        <!-- component -->
        <transition-group name="slide-fade" v-if="getAllWishlist">
          <!-- <div v-for="(products, index) in getAllWishlist" :key="index"> -->
            <Card
              v-for="product in getAllWishlist"
              :key="product.product_id"
              :product="product.product"
              @toggleWishListDelete="deleteWishList"
            ></Card>
          <!-- </div> -->
          <div class="no-wishlist" v-if="getAllWishlist.length == 0">
            you have not selected any products yet :|
            <div class="empty-wishlist">
              <img src="../../src/assets/images/empty-wishlist.png" alt="" />
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Socials from "@/components/Socials.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "WishList",
  components: {
    Socials,
    Footer,
    Card,
  },
  data() {
    return {
      products: [],
      wishlists: [],
      showProduct: [],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getWishListToStore();
  },
  methods: {
    ...mapActions(["getWishListToStore"]),
    deleteWishList(selectWishlist) {
      for (let index = 0; index < this.getAllWishlist.length; index++) {
        const i = this.getAllWishlist.findIndex(
          (wishlist) => wishlist.product_id == selectWishlist
        );
        if (i !== -1) {
          this.getAllWishlist.splice(i, 1);
          this.$store.dispatch("deleteFromWishlist", selectWishlist);
        }
      }
    },
  },
  computed: mapGetters(["getWishList"]),
  computed: {
    getAllWishlist() {
      return this.$store.getters.getWishList;
    },
    getAllproducts() {
      return this.$store.getters.getProducts;
    },
    queryWishList() {
      return this.products.filter(
        (product) =>
          this.wishlists.findIndex(
            (wishlist) => wishlist.product_id == product.id
          ) > -1
      );
    },
  },
};
</script>
<style scoped>
.section-wish-list {
  margin: 2.4rem 0 6.4rem 0;
}
.card-grid.grid {
  column-gap: 1.6rem;
}
.no-wishlist {
  font-size: 1.8rem;
  color: rgba(84, 84, 84, 0.55);
  align-self: center;
  justify-self: center;
  text-align: center;
  width: 80%;
  margin: 0 10%;
  grid-column: span 4;
  text-transform: uppercase;
  margin-top: 2.4rem;
  line-height: 1.6;
}
.empty-wishlist {
  width: 100%;
}
.empty-wishlist img {
  width: 36rem;
  height: 36rem;
  object-fit: contain;
}

/* below 925px */
@media (max-width: 58em) {
  .card-grid.grid--4-cols {
    grid-template-columns: repeat(3, 1fr);
  }
  .card-grid.grid {
    row-gap: 4.8rem;
  }
  .no-wishlist {
    font-size: 1.4rem;
  }
  .empty-wishlist img {
    width: 28rem;
    height: 28rem;
  }
}
/* below 577px */
@media (max-width: 36em) {
  .card-grid.grid--4-cols {
    grid-template-columns: repeat(2, 1fr);
  }
  .empty-wishlist img {
    width: 24rem;
    height: 24rem;
  }
}
/* below 470px */
@media (max-width: 29em) {
  .card-grid.grid--4-cols {
    grid-template-columns: 1fr 1fr;
  }
}

/* below 375px */
@media (max-width: 24em) {
  .card-grid.grid--4-cols {
    grid-template-columns: 1fr;
  }
}
</style>
