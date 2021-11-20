<template>
  <div class="AddProduct">
    <div class="add-product-section">
      <div class="container">
        <div class="Form">
          <div>
            <div class="sub-heading">more &amp; more</div>
            <div class="secondary-header">Add product</div>
          </div>
          <form @submit.prevent="addProduct" action="#" class="form">
            <div class="display-img">
              <label class="add-img" for="upload" v-if="preview_img == ''">
                <input
                  @change="uploadImage"
                  type="file"
                  accept="image/*"
                  id="upload"
                  name="upload"
                />
                <i class="fas fa-plus-square"></i>
              </label>
              <img :src="preview_img" alt="" v-else class="preview-img" />
              <div class="img-name" v-if="form.name_img != ''">
                {{ form.name_img }}
                <span @click="changeImg"><i class="fas fa-times"></i></span>
              </div>
            </div>

            <div class="info-form">
              <div class="col-left">
                <div class="prod-name">
                  <label for="name"
                    >Product name
                    <span v-if="!prodNameIsValid">*required</span></label
                  >
                  <input
                    type="text"
                    v-model="form.prod_name"
                    placeholder="Fits T-shirt"
                  />
                </div>
                <div class="prod-desc">
                  <label for="desc"
                    >Description
                    <span v-if="!prodDescIsValid">*required</span></label
                  >
                  <textarea
                    name="desc"
                    id="desc"
                    v-model="form.prod_desc"
                    cols="30"
                    rows="10"
                    placeholder="This shirt is made up with finess silks..."
                  ></textarea>
                </div>
                <div class="prod-price">
                  <label for="price"
                    >Price
                    <span v-if="!prodPriceIsValid"
                      >*required/positive number</span
                    ></label
                  >
                  <input
                    type="text"
                    id="price"
                    name="price"
                    v-model.number="form.prod_price"
                    placeholder="599"
                  />
                </div>
                <div class="prod-brand-type">
                  <div class="prod-brand">
                    <label for="brands">Brand</label>
                    <select
                      name="brands"
                      id="brands"
                      v-model="form.prod_brands"
                      :style="!prodBrandIsValid ? { color: '#eb435f' } : {}"
                    >
                      <option value="">none</option>
                      <option
                        v-for="brand in allBrands"
                        :key="brand.id"
                        :value="brand"
                        >{{ brand.brand_name }}</option
                      >
                    </select>
                  </div>

                  <div class="prod-type">
                    <label for="types">Type</label>
                    <select
                      name="types"
                      id="types"
                      v-model="form.prod_types"
                      :style="!prodTypeIsValid ? { color: '#eb435f' } : {}"
                    >
                      <option value="">none</option>
                      <option
                        v-for="category in allCategories"
                        :key="category.id"
                        :value="category"
                        >{{ category.category_name }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-right">
                <div class="prod-date">
                  <label for="date"
                    >Manufactured date
                    <span v-if="!prodDateIsValid">*required</span></label
                  >
                  <input
                    type="date"
                    name="date"
                    id="date"
                    v-model="form.prod_date"
                    :style="!prodDateIsValid ? { color: '#eb435f' } : {}"
                  />
                </div>
                <div class="prod-colors">
                  <label for="name"
                    >Colors
                    <span v-if="!prodColorsIsValid"
                      >*required at least one</span
                    ></label
                  >
                  <div class="list-of-colors">
                    <input
                      class="checkbox"
                      type="checkbox"
                      v-for="color in allColors"
                      :key="color.color_id"
                      v-model="form.selected_colors"
                      :value="color"
                      :style="{ backgroundColor: color.color_code }"
                    />
                  </div>
                </div>
                <button
                  :style="[
                    formIsValid
                      ? { backgroundColor: '#333' }
                      : { backgroundColor: '#707070', cursor: 'not-allowed', pointerEvents: 'none' },
                  ]"
                  class="btn btn--full"
                  type="submit"
                >
                  Add product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal" v-if="failedToAdd">
      <Popup
        @closePopup="failedToAdd = false"
        :text="failedAddProductText"
        :isTrue="false"
      />
    </div>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Socials from "@/components/Socials.vue";
import Footer from "@/components/Footer.vue";
import Popup from "@/components/Popup.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Socials,
    Footer,
    Popup,
  },
  data() {
    return {
      failedToAdd: false,
      failedAddProductText: "This product name has already used",
      colors: [],
      productUrl: this.$store.state.defaultUrl + "/products",
      products: [],
      form: {
        prod_name: "",
        prod_desc: "",
        prod_price: null,
        prod_brands: "",
        prod_types: "",
        prod_date: "",
        selected_colors: [],
        prod_img: "",
        name_img: "",
      },
      preview_img: "",
    };
  },
  computed: mapGetters([
    "getColors",
    "getBrands",
    "getCategories",
    "getProducts",
  ]),
  computed: {
    allColors() {
      return this.$store.getters.getColors;
    },
    allBrands() {
      return this.$store.getters.getBrands;
    },
    allCategories() {
      return this.$store.getters.getCategories;
    },
    allProducts() {
      return this.$store.getters.getProducts;
    },
    prodImageIsValid() {
      return !!this.form.prod_img;
    },
    prodNameIsValid() {
      return !!this.form.prod_name && this.form.prod_name.length <= 90;
    },
    prodDescIsValid() {
      return !!this.form.prod_desc;
    },
    prodPriceIsValid() {
      return (
        typeof this.form.prod_price == "number" &&
        this.form.prod_price > 0 &&
        this.form.prod_price < 10000
      );
    },
    prodBrandIsValid() {
      return !!this.form.prod_brands;
    },
    prodTypeIsValid() {
      return !!this.form.prod_types;
    },
    prodDateIsValid() {
      return !!this.form.prod_date;
    },
    prodColorsIsValid() {
      return this.form.selected_colors.length != 0;
    },
    formIsValid() {
      return (
        this.prodNameIsValid &&
        this.prodImageIsValid &&
        this.prodDescIsValid &&
        this.prodPriceIsValid &&
        this.prodBrandIsValid &&
        this.prodTypeIsValid &&
        this.prodDateIsValid &&
        this.prodColorsIsValid
      );
    },
    checkUniqueProdName() {
      for (let index = 0; index < this.products.length; index++) {
        if (this.products[index].product_name == this.form.prod_name) {
          return true;
        }
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    fetch(this.productUrl)
      .then((res) => res.json())
      .then((data) => {
        this.products = data.data;
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    ...mapActions([
      "getColorToStore",
      "getBrandsToStore",
      "getCategoriesToStore",
    ]),
    uploadImage(e) {
      const image = e.target.files[0];
      this.form.prod_img = e.target.files[0];
      this.form.name_img = image.name;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.preview_img = e.target.result;
      };
    },
    addProduct() {
      let colors = [];
      for (var i = 0; i < this.form.selected_colors.length; i++) {
        colors.push({ id: this.form.selected_colors[i].color_id });
      }
      if (this.formIsValid && this.checkUniqueProdName != true) {
        const newProduct = {
          product_name: this.form.prod_name,
          product_desc: this.form.prod_desc,
          price: this.form.prod_price,
          brand_id: this.form.prod_brands.brand_id,
          category_id: this.form.prod_types.category_id,
          release_date: this.form.prod_date,
          color_id: colors,
          image: this.form.name_img,
        };
        this.$store
          .dispatch("addProduct", {
            newProduct: newProduct,
            image: this.form.prod_img,
          })
          .catch((err) => console.log(err));
        (this.form.prod_name = ""),
          (this.form.prod_desc = ""),
          (this.form.prod_price = ""),
          (this.form.prod_brands = ""),
          (this.form.prod_types = ""),
          (this.form.prod_date = ""),
          (this.form.selected_colors = []),
          (this.form.prod_img = ""),
          (this.preview_img = ""),
          (this.form.name_img = "");
      } else {
        this.failedToAdd = true;
      }
    },
    changeImg() {
      this.form.prod_img = "";
      this.preview_img = "";
      this.form.name_img = "";
    },
  },
  created() {
    this.getColorToStore();
    this.getBrandsToStore();
    this.getCategoriesToStore();
  },
};
</script>
<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.25);
  left: 0;
  top: 0;
  padding-top: 20rem;
  z-index: 999;
  backdrop-filter: blur(2px);
}
.add-product-section {
  margin: 2.4rem 0 6.4rem 0;
}

.Form {
  width: 100%;
}
.form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  margin: 4.8rem 0;
}

.input-img {
  width: 80%;
  margin: 0 10%;
  text-align: center;
  justify-items: center;
  justify-self: center;
  justify-content: center;
}

.display-img {
  width: 100%;
  position: relative;
}

.display-img img {
  object-fit: cover;
  width: 80%;
  margin: 0 10%;
}

.display-img input {
  display: none;
}

.display-img .img-name {
  font-size: 1.2rem;
  width: 80%;
  margin: 1.2rem 10%;
  text-align: center;
}

.display-img .img-name .fa-times {
  margin-left: 1.4rem;
  font-size: 110%;
  cursor: pointer;
  transition: 0.15s ease-in-out all;
}

.display-img .img-name .fa-times:hover {
  color: red;
}

.add-img {
  width: 80%;
  margin: 0 10%;
  height: 100%;
  background-color: transparent;
  border: 2px dashed rgb(85, 85, 85);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
}
.preview-img {
  width: 80%;
  margin: 0 10%;
  height: 100%;
}

.add-img:hover {
  opacity: 1;
  background-color: rgba(110, 110, 110, 0.15);
  border: 2px dashed #fff;
  color: white;
}

.info-form {
  width: 100%;
  background-color: #fff;
  padding: 3.6rem 4.8rem;
  box-shadow: rgba(70, 50, 50, 0.08) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: 0.3s all ease-in-out;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem;
}

.info-form:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.col-left,
.col-right {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

label {
  display: block;
  text-align: left;
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 1.2rem;
}

label span {
  font-size: 1rem;
  color: #eb435f;
}

input {
  width: auto;
  border: none;
  background: rgb(250, 250, 250);
  height: 2.8rem;
  padding: 0.4rem 0.6rem;
  color: #333;
}

.list-of-colors {
  width: auto;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

input.checkbox {
  width: 2.4rem;
  height: 2.4rem;
  -webkit-appearance: none;
  box-shadow: inset 0 0 0 1px rgba(85, 85, 85, 0.25);
}

input.checkbox:last-child {
  width: 2.4rem;
  height: 2.4rem;
  -webkit-appearance: none;
  box-shadow: inset 0 0 0 1px rgb(184, 184, 184);
}

input.checkbox:checked {
  box-shadow: inset 0 0 0 2px #555;
}

input.checkbox:last-child:checked {
  box-shadow: inset 0 0 0 2px #eb435f;
}

input:focus {
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: rgb(85, 85, 85, 0.35);
}

textarea {
  color: #333;
  padding: 0.6rem 0.8rem;
  width: 100%;
  height: auto;
  resize: none;
  border: none;
  background: rgb(250, 250, 250);
}

textarea:focus {
  outline: none;
}

.prod-brand-type {
  display: flex;
  align-items: center;
  column-gap: 3.6rem;
}

.prod-brand-type label {
  display: inline-block;
  margin-bottom: 1.2rem;
  margin-right: 0.4rem;
}

.prod-colors {
  max-width: 32rem;
}

.btn {
  font-family: "Lato", sans-serif !important;
  text-align: center;
  width: auto;
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1.2rem 2.4rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 2.4rem;
}

.btn--full {
  margin-top: 2.4rem;
  /* background-color: #333; */
  color: white;
  transition: 0.3s all ease-in-out;
}

.btn--full:hover {
  background-color: #555;
}

.fa-plus-square {
  width: 4.8rem;
  height: 4.8rem;
  color: inherit;
}

/* below 850px */
@media (max-width: 53em) {
  .form {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .info-form {
    margin-top: 1.2rem;
  }
  .add-img {
    width: 50%;
    margin: 0 25%;
    height: 48rem;
  }
  .display-img img{
    width: 90%;
    margin: 0 5%;
    height: 48rem;
  }
  
}

/* below 530px */
@media (max-width: 33em) {
  .info-form {
    grid-template-columns: 1fr;
  }
  .add-img {
    width: 70%;
    margin: 0 15%;
    height: 36rem;
  }
}
</style>
