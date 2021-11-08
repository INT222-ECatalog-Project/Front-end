<template>
  <div class="Management">
    <div class="management-section">
      <div class="container">
        <div class="Form">
          <div>
            <div class="sub-heading">Colors &amp; Brands</div>
            <div class="secondary-header" id="breakPoint">Management</div>
          </div>
          <div class="options">
            <div class="switch-btn">
              <div
                class="btn-colors"
                @click="isShow = !isShow; current = 1"
                :style="[
                  isShow == true
                    ? { backgroundColor: '#eb435f', color: 'white' }
                    : { backgroundColor: '#e7e3e0', color: '#eb435f' },
                ]"
              >
                Colors
              </div>
              <div
                class="btn-brands"
                @click="isShow = !isShow; current = 1"
                :style="[
                  isShow == false
                    ? { backgroundColor: '#eb435f', color: 'white' }
                    : { backgroundColor: '#e7e3e0', color: '#eb435f' },
                ]"
              >
                Brands
              </div>
            </div>
          </div>
          <!-- Colors -->
          <transition name="slide-fade">
            <div class="table" v-if="isShow">
              <div class="tertiary-header">Colors</div>
              <!-- addForm -->
              <div v-if="isAdmin">
                <form
                  class="color-inputs"
                  @submit.prevent="addNewColor"
                  v-if="isEditColor == false"
                >
                  <div class="color-name">
                    <label for="color-name"
                      >Color name<span v-if="!addColorNameIsValid"
                        >*</span
                      ></label
                    >
                    <input
                      type="text"
                      placeholder="red"
                      name="color-name"
                      id="color-name"
                      v-model="form.color_name"
                    />
                  </div>
                  <div class="color-code">
                    <label for="color-code"
                      >Color code<span v-if="!addColorCodeIsValid"
                        >*</span
                      ></label
                    >
                    <input
                      type="text"
                      placeholder="#FF4219"
                      name="color-code"
                      id="color-code"
                      v-model="form.color_code"
                    />
                  </div>
                  <div
                    class="example-color"
                    :style="[
                      form.color_code
                        ? { backgroundColor: form.color_code }
                        : { backgroundColor: '#ffffff' },
                    ]"
                  >
                    <i class="fas fa-eye-dropper icon"></i>
                    <input
                      type="color"
                      v-model="form.color_code"
                      :style="{ position: 'absolute' }"
                    />
                  </div>
                  <button
                    type="submit"
                    :style="[
                      addColorFormIsValid
                        ? { backgroundColor: '#333' }
                        : { backgroundColor: '#707070', cursor: 'not-allowed' },
                    ]"
                    class="btn btn--full"
                  >
                    Add Color
                  </button>
                </form>
              </div>
              <!-- /addForm -->

              <!-- editForm -->
              <form
                v-if="isEditColor"
                class="color-inputs"
                @submit.prevent="editColorById"
              >
                <div class="color-name">
                  <label for="color-name"
                    >Color name<span v-if="!editColorNameIsValid"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    placeholder="red"
                    name="color-name"
                    id="color-name"
                    v-model="form.edit_color_name"
                  />
                </div>
                <div class="color-code">
                  <label for="color-code"
                    >Color code<span v-if="!editColorCodeIsValid"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    placeholder="#FF4219"
                    name="color-code"
                    id="color-code"
                    v-model="form.edit_color_code"
                  />
                </div>
                <div
                  class="example-color"
                  :style="[
                    form.edit_color_code
                      ? { backgroundColor: form.edit_color_code }
                      : { backgroundColor: '#ffffff' },
                  ]"
                >
                  <i class="fas fa-eye-dropper icon"></i>
                  <input
                    type="color"
                    v-model="form.edit_color_code"
                    :style="{ position: 'absolute' }"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn--full"
                  :style="[
                    editColorFormIsValid
                      ? { backgroundColor: '#333' }
                      : { backgroundColor: '#707070', cursor: 'not-allowed' },
                  ]"
                >
                  Edit Color
                </button>
              </form>
              <!-- /editForm -->
              <Table :ths="thsColor">
                <tbody
                  v-for="(color, index) in getAllColors"
                  :key="color.color_code"
                  v-show="setPaginate(index)"
                >
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ color.color_name }}</td>
                    <td>{{ color.color_code }}</td>
                    <td>
                      <div
                        class="example-color"
                        :style="{ backgroundColor: color.color_code }"
                      ></div>
                    </td>
                    <td v-if="isAdmin">
                      <div
                        class="delete"
                        @click="deleteColorById(color.color_id)"
                        :style="{ display: 'inline' }"
                      >
                        Delete
                      </div>
                      |
                      <div
                        class="edit"
                        @click="toggleEditColor(color.color_id)"
                        :style="{ display: 'inline' }"
                      >
                        Edit
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </transition>
          <!-- /Colors -->
          <!-- Brands -->
          <transition name="slide-fade">
            <div class="table" v-if="isShow == false">
              <div class="tertiary-header">Brands</div>
              <!-- addBrand -->
              <div v-if="isAdmin">
                <form
                  class="color-inputs"
                  @submit.prevent="addNewBrand"
                  v-if="isEditBrand == false"
                >
                  <div class="color-name">
                    <label for="brand-name"
                      >Brand name<span v-if="!addBrandNameIsValid"
                        >*</span
                      ></label
                    >
                    <input
                      type="text"
                      placeholder="GUCCI"
                      name="brand-name"
                      id="brand-name"
                      v-model="form.brand_name"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn--full"
                    :style="[
                      addBrandNameIsValid
                        ? { backgroundColor: '#333' }
                        : { backgroundColor: '#707070', cursor: 'not-allowed' },
                    ]"
                  >
                    Add Brand
                  </button>
                </form>
              </div>
              <!-- /addBrand -->
              <!-- editBrand -->
              <form
                class="color-inputs"
                @submit.prevent="editBrandById"
                v-if="isEditBrand"
              >
                <div class="color-name">
                  <label for="brand-name"
                    >Brand<span v-if="!editBrandNameIsValid">*</span></label
                  >
                  <input
                    type="text"
                    placeholder="GUCCI"
                    name="brand-name"
                    id="brand-name"
                    v-model="form.edit_brand_name"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn--full"
                  :style="[
                    editBrandNameIsValid
                      ? { backgroundColor: '#333' }
                      : { backgroundColor: '#707070', cursor: 'not-allowed' },
                  ]"
                >
                  Edit Brand
                </button>
              </form>
              <!-- /editBrand -->
              <Table :ths="thsBrand">
                <tbody
                  v-for="(brand, index) in getAllBrands"
                  :key="brand.brand_id"
                  v-show="setPaginate(index)"
                >
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ brand.brand_name }}</td>
                    <td v-if="isAdmin">
                      <div
                        class="delete"
                        @click="deleteBrandById(brand.brand_id)"
                        :style="{ display: 'inline' }"
                      >
                        Delete
                      </div>
                      |
                      <div
                        class="edit"
                        @click="toggleEditBrand(brand.brand_id)"
                        :style="{ display: 'inline' }"
                      >
                        Edit
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </transition>
          <!-- /Brands -->
        </div>
      </div>
    </div>
    <!-- component  popup -->
    <div class="modal" v-if="failedToAdd">
      <Popup
        @closePopup="failedToAdd = false"
        :text="
          (form.brand_name ||
            form.edit_brand_name ||
            form.color_code ||
            form.edit_color_code) +
            ' ' +
            failedToAddText
        "
        :isTrue="false"
      />
    </div>
        <div id="pagination">
      <div
        :style="[
          current == page_index
            ? { backgroundColor: '#333', color: '#fff' }
            : {},
        ]"
        class="btn-page"
        v-for="page_index in pageTotal"
        :key="page_index"
        @click.prevent="updateCurrent(page_index)"
      >
        {{ page_index }}
      </div>
    </div>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Socials from "@/components/Socials.vue";
import Footer from "@/components/Footer.vue";
import Popup from "@/components/Popup.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ColorsBrands",
  components: {
    Socials,
    Footer,
    Table,
    Popup,
  },
  data() {
    return {
      current: 1,
      paginate: 20,
      failedToAdd: false,
      failedToAddText: "has already used",
      colors: [],
      thsColor: ["No", "Color Name", "Color Code", "Example"],
      thsBrand: ["No", "Brand Name"],
      isShow: true,
      isEditColor: false,
      isEditBrand: false,
      form: {
        color_name: "",
        color_code: "",
        edit_color_name: "",
        edit_color_code: "",
        brand_name: "",
        edit_brand_name: "",
      },
      edit_color_id: "",
      edit_brand_id: "",
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    await this.getColorToStore();
    await this.getBrandsToStore();
  },
  computed: mapGetters(["getColors", "getBrands"]),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser["role"] == 1) {
        return true;
      }
      return false;
    },
    getAllColors() {
      return this.$store.getters.getColors;
    },
    getAllBrands() {
      return this.$store.getters.getBrands;
    },
    // validations-colors
    addColorNameIsValid() {
      return !!this.form.color_name && this.form.color_name.length <= 40;
    },
    addColorCodeIsValid() {
      return (
        !!this.form.color_code &&
        /^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(this.form.color_code) &&
        this.form.color_code.includes("#")
      );
    },
    addColorFormIsValid() {
      return this.addColorNameIsValid && this.addColorCodeIsValid;
    },
    editColorNameIsValid() {
      return !!this.form.edit_color_name;
    },
    editColorCodeIsValid() {
      return (
        !!this.form.edit_color_code &&
        /^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(this.form.edit_color_code)
      );
    },
    editColorFormIsValid() {
      return this.editColorNameIsValid && this.editColorCodeIsValid;
    },
    checkUniqueColorCode() {
      if (this.edit_color_id) {
        for (let index = 0; index < this.getAllColors.length; index++) {
          if (
            this.getAllColors[index].color_id != this.edit_color_id &&
            this.getAllColors[index].color_code == this.form.edit_color_code
          ) {
            return true;
          }
        }
      } else {
        for (let index = 0; index < this.getAllColors.length; index++) {
          if (this.getAllColors[index].color_code == this.form.color_code) {
            return true;
          }
        }
      }
    },
    // validations-brands
    addBrandNameIsValid() {
      return !!this.form.brand_name && this.form.brand_name.length <= 40;
    },
    editBrandNameIsValid() {
      return !!this.form.edit_brand_name;
    },
    checkUniqueBrandName() {
      if (this.edit_brand_id != "") {
        for (let index = 0; index < this.getAllBrands.length; index++) {
          if (
            this.getAllBrands[index].brand_name == this.form.edit_brand_name &&
            this.getAllBrands[index].brand_id != this.edit_brand_id
          ) {
            return true;
          }
        }
      } else {
        for (let index = 0; index < this.getAllBrands.length; index++) {
          if (this.getAllBrands[index].brand_name == this.form.brand_name) {
            return true;
          }
        }
      }
    },
        pageTotal() {
          return this.isShow ?  Math.ceil((this.getAllColors.length - 1) / this.paginate) :  Math.ceil((this.getAllBrands.length - 1) / this.paginate);
      // return Math.ceil((this.getAllUsers.length - 1) / this.paginate);
    },
  },

  methods: {
    ...mapActions(["getColorToStore", "getBrandsToStore"]),
    // Colors
    addNewColor() {
      if (this.addColorFormIsValid && !this.checkUniqueColorCode) {
        const newColor = {
          color_code: this.form.color_code,
          color_name: this.form.color_name,
        };
        this.$store
          .dispatch("addColor", newColor)
          .catch((err) => console.log(err));
        this.form.color_code = "";
        this.form.color_name = "";
      } else {
        this.failedToAdd = true;
      }
    },
    deleteColorById(id) {
      if (confirm("Do you really want to delete? 👹")) {
        const index = this.getAllColors.findIndex(
          (color) => color.color_id == id
        );
        if (index !== -1) {
          this.getAllColors.splice(index, 1);
          this.$store.dispatch("deleteColor", id);
        }
      }
    },
    editColorById() {
      if (this.editColorFormIsValid && !this.checkUniqueColorCode) {
        const index = this.getAllColors.findIndex(
          (color) => color.color_id == this.edit_color_id
        );
        const editColor = {
          color_id: this.edit_color_id,
          color_name: this.form.edit_color_name,
          color_code: this.form.edit_color_code,
        };
        if (index !== -1) {
          // this.colors.splice(index, 1, editColor);
          this.getAllColors.splice(index, 1, editColor);
          this.$store.dispatch("editColor", editColor);
          this.edit_color_id = "";
          this.form.edit_color_name = "";
          this.form.edit_color_code = "";
          this.isEditColor = false;
        }
      } else {
        this.failedToAdd = true;
      }
    },
    toggleEditColor(id) {
      window.scrollTo(0, 0);
      const index = this.getAllColors.findIndex(
        (color) => color.color_id == id
      );
      this.edit_color_id = id;
      this.form.edit_color_name = this.getAllColors[index].color_name;
      this.form.edit_color_code = this.getAllColors[index].color_code;
      this.isEditColor = !this.isEditColor;
    },
    // Brands
    addNewBrand() {
      if (this.addBrandNameIsValid && !this.checkUniqueBrandName) {
        const newBrand = {
          brand_name: this.form.brand_name,
        };
        this.$store
          .dispatch("addBrand", newBrand)
          .catch((err) => console.log(err));
        this.form.brand_name = "";
      } else {
        this.failedToAdd = true;
      }
    },
    deleteBrandById(id) {
      if (confirm("Do you really want to delete? 👹")) {
        const index = this.getAllBrands.findIndex(
          (brand) => brand.brand_id == id
        );
        if (index !== -1) {
          this.getAllBrands.splice(index, 1);
          this.$store.dispatch("deleteBrand", id);
        }
      }
    },
    editBrandById() {
      if (this.editBrandNameIsValid && !this.checkUniqueBrandName) {
        const index = this.getAllBrands.findIndex(
          (brand) => brand.brand_id == this.edit_brand_id
        );
        const editBrand = {
          brand_id: this.edit_brand_id,
          brand_name: this.form.edit_brand_name,
        };
        if (index !== -1) {
          this.getAllBrands.splice(index, 1, editBrand);
          this.$store.dispatch("editBrand", editBrand);
          this.edit_brand_id = "";
          this.form.edit_brand_name = "";
          this.isEditBrand = false;
        }
      } else {
        this.failedToAdd = true;
      }
    },
    toggleEditBrand(id) {
      window.scrollTo(0, 0);
      const index = this.getAllBrands.findIndex(
        (brand) => brand.brand_id == id
      );
      this.edit_brand_id = id;
      this.form.edit_brand_name = this.getAllBrands[index].brand_name;
      this.isEditBrand = !this.isEditBrand;
    },
     setPaginate(i) {
      if (this.current == 1) {
        return i < this.paginate;
      } else {
        return (
          i >= this.paginate * (this.current - 1) &&
          i < this.current * this.paginate
        );
      }
    },
    updateCurrent(i) {
      this.current = i;
      let breakPoint = document.querySelector("#breakPoint");
      window.scrollTo(0, breakPoint.offsetTop);
    },
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
.tertiary-header {
  text-align: start;
}
.management-section {
  margin: 2.4rem 0 6.4rem 0;
}

.options {
  display: grid;
  grid-template-columns: 1fr;
  width: 90%;
  margin: 0 5%;
  justify-items: end;
}
.switch-btn {
  display: flex;
  font-size: 1.4rem;
  text-align: center;
  text-transform: uppercase;
  gap: 1.2rem;
  flex-wrap: wrap;
}
.switch-btn .btn-colors,
.switch-btn .btn-brands {
  box-shadow: inset 0 0 0 1px #eb435f;
  padding: 1.2rem;
  width: 12rem;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}
.switch-btn .btn-colors:hover,
.switch-btn .btn-brands:hover {
  color: white !important;
  background-color: #bc364c !important;
}
.Form {
  width: 100%;
}
.table {
  width: 90%;
  margin: 4.8rem 5%;
}
.color-inputs {
  width: 100%;
  margin: 2.4rem 0;
  display: flex;
  flex-direction: row;
  gap: 3.6rem;
  justify-items: center;
  flex-wrap: wrap;
}

.color-inputs label {
  font-size: 1.4rem;
  margin-right: 1.2rem;
}

label span {
  font-size: 1rem;
  color: #eb435f;
}

input {
  width: auto;
  border: none;
  background: #fff;
  height: 2.8rem;
  padding: 0.4rem 0.6rem;
  color: #333;
}
input:focus {
  outline: none;
}

input::placeholder {
  color: rgb(85, 85, 85, 0.35);
}
.btn {
  font-family: "Lato", sans-serif !important;
  text-align: center;
  width: auto;
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0 1.2rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  height: 2.8rem;
}
.btn--full {
  background-color: #333;
  color: white;
  transition: 0.3s all ease-in-out;
}
.btn--full:hover {
  background-color: #555;
}

table {
  border-collapse: collapse;
  width: 100%;
}
thead {
  font-size: 1.4rem;
  text-transform: uppercase;
  background-color: #333;
  color: white;
}
th {
  font-weight: 400;
  padding: 2rem;
}
th:nth-child(even) {
  background-color: #555;
}
tbody {
  font-size: 1.4rem;
  text-align: center;
  background-color: #fff;
  transition: 0.2s all ease-in-out;
}
tbody td {
  padding: 1.4rem;
  line-height: 1.8;
  max-width: 12rem;
}
tbody:hover {
  background-color: rgb(250, 250, 250);
}
tbody td:nth-child(4) {
  height: 8rem;
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 !important;
  max-width: 100%;
}
.example-color {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  box-shadow: inset 0 0 0 1px rgba(85, 85, 85, 0.25);
}
.example-color .icon {
  width: 1rem;
  height: 1rem;
}
input[type="color"] {
  opacity: 0;
  cursor: pointer;
}
.delete,
.edit {
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  text-decoration: underline;
}
.delete:hover {
  color: #eb435f;
}
.edit:hover {
  color: #ffd700;
}
#pagination {
  margin: 5.8rem 0;
  display: flex;
  justify-content: center;
}
.btn-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  font-size: 1.6rem;
  color: #333;
  cursor: pointer;
  margin: 0 0.6rem;
  font-weight: 700;
  transition: 00.15s all ease-in-out;
  box-shadow: inset 0 0 0 1px #333;
}
.btn-page:hover {
  background-color: #333;
  color: #fff;
}
/* below 872px */
@media (max-width: 55em) {
  .color-inputs {
    row-gap: 1.2rem;
  }
  .options {
    justify-items: start;
  }
}
/* below 542px */
@media (max-width: 34em) {
  .switch-btn {
    font-size: 1.2rem;
  }
  .options {
    justify-items: center;
  }
  .color-inputs .example-color {
    display: none;
  }
  .table {
    margin: 4.8rem 0;
    width: 100%;
  }
  th {
    padding: 1.2rem;
  }
  thead,
  tbody {
    font-size: 1.2rem;
  }
}
/* below 450px */
@media (max-width: 28em) {
  input {
    width: 12rem;
    font-size: 1.4rem;
  }
  .color-inputs {
    gap: 1.6rem;
  }
  .tertiary-header {
    display: none;
  }
  .options {
    width: 100%;
    margin: 0%;
  }
  .switch-btn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    width: 100%;
  }
  .switch-btn .btn-brands,
  .switch-btn .btn-colors {
    width: 100%;
  }

  .switch-btn .btn-colors {
    border-top-left-radius: 2.4rem;
    border-bottom-left-radius: 2.4rem;
  }
  .switch-btn .btn-brands {
    border-top-right-radius: 2.4rem;
    border-bottom-right-radius: 2.4rem;
  }
  .example-color {
    width: 1.6rem;
    height: 1.6rem;
  }
  .table {
    margin: 2.4rem 0;
  }
  th {
    padding: 1rem;
  }
  tbody td {
    padding: 1.8rem;
  }
}
</style>
