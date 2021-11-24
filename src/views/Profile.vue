<template>
  <div class="Profile">
    <div class="profile-section">
      <div class="container">
        <transition-group name="slide-fade">
          <div class="profile-container" v-if="isEdit == false">
            <div class="profile-header">
              <div class="profile-tab"></div>
              <div class="flex-absolute">
                <div
                  class="profile-pic"
                  :style="[
                    role_id == 1
                      ? { backgroundColor: '#ffd700' }
                      : role_id == 2
                      ? { backgroundColor: '#FF6347' }
                      : { backgroundColor: '#9400D3' },
                  ]"
                ></div>
                <div class="info">
                  <div class="fullname">{{ first_name }} {{ last_name }}</div>
                  <div class="tags">
                    <div
                      class="role"
                      v-if="role_id == 1"
                      :style="{ backgroundColor: '#ffd700' }"
                    >
                      Admin
                    </div>
                    <div
                      class="role"
                      v-if="role_id == 2"
                      :style="{ backgroundColor: '#FF6347' }"
                    >
                      Deputy Admin
                    </div>
                    <div
                      class="role"
                      v-if="role_id == 3"
                      :style="{ backgroundColor: '#9400D3' }"
                    >
                      Member
                    </div>
                    <div class="privilege" v-if="role_id == 3">
                      Platinum
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-body">
              <div class="username">
                <i class="icon fas fa-user"></i><span>{{ username }}</span>
              </div>
              <div class="email">
                <i class="icon fas fa-envelope"></i>
                <span>{{ email }}</span>
              </div>
              <div class="description">
                <div
                  class="description-header"
                  :style="[
                    role_id == 1
                      ? { color: '#ffd700' }
                      : role_id == 2
                      ? { color: '#FF6347' }
                      : { color: '#9400D3' },
                  ]"
                >
                  What you can do?
                </div>
                <div v-if="role_desc == 1">
                  It's like the owner, you can manage everything in the system
                  but you can't add wishlist .✨
                </div>
                <div v-if="role_desc == 2">
                  Acts as a product administrator by being able to edit products
                  and you can't add wishlist .✨
                </div>
                <div v-if="role_desc == 3">
                  You can browse our products, if you choose wishlist we will
                  remember them for you .💖
                </div>
              </div>
            </div>
            <div class="button">
              <div class="btn btn--ghost" @click="toggleEdit">
                Edit Profile
              </div>
              <div class="btn btn--full" @click="deleteAccount">Delete</div>
            </div>
            <div class="profile-body" v-if="role_id == 3">
              <div class="description-header" :style="{ color: '#9400D3' }">
                You also may like
              </div>

              <div class="card-grid grid">
                <Card
                  v-for="product in getAllproducts"
                  :key="product.product_id"
                  :product="product"
                  @toggleWishList="addWishList"
                  @toggleWishListDelete="deleteWishList"
                ></Card>
                <div class="seemore">
                  <p class="hover-underline-animation">see more &#8594;</p>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="edit-container" v-if="isEdit">
          <div class="left-side">
            <div
              class="profile-pic"
              :style="[
                role_id == 1
                  ? { backgroundColor: '#ffd700' }
                  : role_id == 2
                  ? { backgroundColor: '#FF6347' }
                  : { backgroundColor: '#9400D3' },
              ]"
            ></div>
            <div class="info">
              <div class="fullname">{{ first_name }} {{ last_name }}</div>
              <div
                class="role"
                v-if="role_id == 1"
                :style="{ border: '1.5px solid #ffd700', color: '#ffd700' }"
              >
                Admin
              </div>
              <div
                class="role"
                v-if="role_id == 2"
                :style="{ border: '1.5px solid #FF6347', color: '#FF6347' }"
              >
                Deputy Admin
              </div>
              <div
                class="role"
                v-if="role_id == 3"
                :style="{ border: '1.5px solid #9400D3', color: '#9400D3' }"
              >
                Member
              </div>
            </div>
            <div
              class="btn btn--full reset-btn"
              @click="resetPassword = true"
              v-if="!resetPassword"
            >
              Reset Password
            </div>
          </div>
          <form action="" class="form">
            <div class="reset-password" v-if="resetPassword">
              <div class="form-header">Reset Password</div>
              <div class="input-password">
                <label for="currentPassword"
                  >Current Password
                  <span v-if="!currentPasswordIsValid">*required</span>
                </label>
                <div class="show-hide-passwod">
                  <input
                    :type="type"
                    name="password"
                    id="currentPassword"
                    placeholder="Enter current password"
                    v-model="form.currentPassword"
                  />
                  <div class="btn-eye" @click="togglePassword">
                    <div
                      :style="[
                        type === 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye icon"></i>
                    </div>
                    <div
                      :style="[
                        type !== 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye-slash icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-password">
                <label for="newPassword"
                  >New Password
                  <span v-if="!newPasswordIsValid">*required</span>
                </label>
                <div class="show-hide-passwod">
                  <input
                    :type="type"
                    name="password"
                    id="newPassword"
                    placeholder="Enter new password"
                    v-model="form.newPassword"
                  />
                  <div class="btn-eye" @click="togglePassword">
                    <div
                      :style="[
                        type === 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye icon"></i>
                    </div>
                    <div
                      :style="[
                        type !== 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye-slash icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-password">
                <label for="conNewPassword"
                  >Confirm New Password
                  <span v-if="!confirmNewPasswordIsValid && isPasswordMatch">*required</span>
                  <span v-if="!isPasswordMatch">Password do NOT match</span>
                </label>
                <div class="show-hide-passwod">
                  <input
                    :type="type"
                    name="password"
                    id="conNewPassword"
                    placeholder="Enter new password"
                    v-model="form.confirmNewPassword"
                  />
                  <div class="btn-eye" @click="togglePassword">
                    <div
                      :style="[
                        type === 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye icon"></i>
                    </div>
                    <div
                      :style="[
                        type !== 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye-slash icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn btn--ghost"
                                :style="[
                    resetPasswordIsValid
                      ? {}
                      : {
                          filter: 'grayscale(1)',
                          cursor: 'not-allowed',
                          pointerEvents: 'none',
                        },
                  ]"
              >
                Update Password
              </div>
              <div class="btn btn--full" @click="resetPassword = false">
                Cancel
              </div>
            </div>
            <div class="edit-profile" v-if="!resetPassword">
              <div class="form-header">Edit Profile</div>
              <div class="input-name">
                <label for="name"
                  >Name
                  <span
                    v-if="!editNameIsValid && form.edit_first_name.length == 0"
                    >*required </span
                  ><span
                    v-if="
                      editNameIsValid || 50 - form.edit_first_name.length <= 0
                    "
                    :style="[
                      50 - form.edit_first_name.length <= 0
                        ? { color: '#eb435f' }
                        : { color: '#32CD32' },
                    ]"
                    >({{ 50 - form.edit_first_name.length }}/50)</span
                  ></label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John"
                  v-model="form.edit_first_name"
                />
              </div>
              <div class="input-surname">
                <label for="surname"
                  >Surname
                  <span
                    v-if="
                      !editSurnameIsValid && form.edit_last_name.length == 0
                    "
                    >*required </span
                  ><span
                    v-if="
                      editSurnameIsValid || 50 - form.edit_last_name.length <= 0
                    "
                    :style="[
                      50 - form.edit_last_name.length <= 0
                        ? { color: '#eb435f' }
                        : { color: '#32CD32' },
                    ]"
                    >({{ 50 - form.edit_last_name.length }}/50)</span
                  >
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Maxwell"
                  v-model="form.edit_last_name"
                />
              </div>
              <div class="input-username">
                <label for="username"
                  >Username
                  <span
                    v-if="
                      !editUsernameIsValid && form.edit_username.length == 0
                    "
                    >*required</span
                  >
                  <span v-if="!noSpecialChars"
                    >no special characters(&amp;,&#60;,&#62; or commas)</span
                  >
                  <span
                    v-if="
                      (editUsernameIsValid && noSpecialChars) ||
                        40 - form.edit_username.length <= 0
                    "
                    :style="[
                      40 - form.edit_username.length <= 0
                        ? { color: '#eb435f' }
                        : { color: '#32CD32' },
                    ]"
                    >({{ 40 - form.edit_username.length }}/40)</span
                  >
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="JohnMax"
                  v-model="form.edit_username"
                  readonly
                />
              </div>
              <div class="input-email">
                <label for="email"
                  >Email
                  <span v-if="!editEmailIsValid">*required</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                  v-model="form.edit_email"
                />
              </div>
              <div class="input-password">
                <label for="password"
                  >Confirm Password
                  <span v-if="!confirmPasswordIsValid">*required</span>
                </label>
                <div class="show-hide-passwod">
                  <input
                    :type="type"
                    name="password"
                    id="password"
                    placeholder="*******"
                    v-model="form.password"
                  />
                  <div class="btn-eye" @click="togglePassword">
                    <div
                      :style="[
                        type === 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye icon"></i>
                    </div>
                    <div
                      :style="[
                        type !== 'text'
                          ? { display: 'none' }
                          : { display: 'flex' },
                      ]"
                    >
                      <i class="fas fa-eye-slash icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="button">
                <div
                  class="btn btn--ghost"
                  @click="editProfile"
                  :style="[
                    editFormIsValid
                      ? {}
                      : {
                          filter: 'grayscale(1)',
                          cursor: 'not-allowed',
                          pointerEvents: 'none',
                        },
                  ]"
                >
                  Confirm Edit
                </div>
                <div class="btn btn--full" @click="toggleEdit">Cancel</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal" v-if="failedToEdit">
      <Popup
        @closePopup="failedToEdit = false"
        :text="failedToEditText"
        :isTrue="false"
      />
    </div>
    <div class="modal" v-if="invalidUsername">
      <Popup
        @closePopup="invalidUsername = false"
        :text="invalidUsernameText"
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
import Card from "@/components/Card.vue";
import { jwtDecrypt } from "../shared/jwtHelper";
import authHeader from "../services/auth-header";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Socials,
    Footer,
    Popup,
    Card,
  },
  data() {
    return {
      resetPassword: false,
      allUsername: "",
      failedToEdit: false,
      failedToEditText: "Invalid password",
      invalidUsername: false,
      invalidUsernameText: "This username has already used",
      tokenData: null,
      account_id: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      role_id: "",
      role_desc: "",
      profile: {},
      confirm_password: "",
      urlProfile: this.$store.state.defaultUrl + "/account",
      form: {
        edit_first_name: "",
        edit_last_name: "",
        edit_username: "",
        edit_email: "",
        password: "",
        currentPassword:"",
        newPassword:"",
        confirmNewPassword:""
      },
      isEdit: false,
      type: "password",
    };
  },
  methods: {
    ...mapActions(["getProfileToSite", "getProductsToStore"]),
    toggleEdit() {
      this.isEdit = !this.isEdit;
      this.form.edit_first_name = this.first_name;
      this.form.edit_last_name = this.last_name;
      this.form.edit_username = this.username;
      this.form.edit_email = this.email;
      window.scrollTo(0, 0);
    },
    togglePassword() {
      if (this.type === "password") {
        this.type = "text";
      } else if (this.type === "text") {
        this.type = "password";
      }
    },
    editProfile() {
      if (this.editFormIsValid && this.checkUniqueUsername != true) {
        const editAccount = {
          account_id: this.account_id,
          first_name: this.form.edit_first_name,
          last_name: this.form.edit_last_name,
          username: this.form.edit_username,
          email: this.form.edit_email,
          confirm_password: this.form.password,
        };
        let user = JSON.parse(localStorage.getItem("user"));
        const jsonEditAccount = JSON.stringify(editAccount, {
          type: "application/json",
        });
        fetch(this.urlProfile + "/updateProfile", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: jsonEditAccount,
        })
          .then((res) => {
            if (res.status !== 200) {
              this.failedToEdit = true;
            } else {
              this.$router.go("/profile");
            }
          })
          .catch((err) => console.log(err));
        this.isEdit = false;
        this.form.edit_first_name = "";
        this.form.edit_last_name = "";
        this.form.edit_username = "";
        this.form.edit_email = "";
        this.form.password = "";
      } else {
        this.invalidUsername = true;
      }
    },
    deleteAccount() {
      if (confirm("Do you really want to delete? 😲")) {
        this.$store.dispatch("deleteAccount", {
          account_id: this.account_id,
        });
        this.$store.dispatch("auth/logout");
      }
    },
    addWishList(product) {
      this.$store.dispatch("addToWishList", product);
    },
    deleteWishList(product) {
      this.$store.dispatch("deleteFromWishlist", product);
    },
  },
  computed: mapGetters(["getProfile", "getProducts"]),
  computed: {
    getAllproducts() {
      const shuffled = this.$store.getters.getProducts.sort(
        () => 0.5 - Math.random()
      );
      return shuffled.slice(0, 2);
    },
    getProfile() {
      return this.$store.getters.getProfile;
    },
    editNameIsValid() {
      return (
        !!this.form.edit_first_name && this.form.edit_first_name.length <= 50
      );
    },
    editSurnameIsValid() {
      return (
        !!this.form.edit_last_name && this.form.edit_last_name.length <= 50
      );
    },
    editUsernameIsValid() {
      return !!this.form.edit_username && this.form.edit_username.length <= 40;
    },
    noSpecialChars() {
      return (
        !this.form.edit_username.includes("&") &&
        !this.form.edit_username.includes(",") &&
        !this.form.edit_username.includes("<") &&
        !this.form.edit_username.includes(">")
      );
    },
    editEmailIsValid() {
      return (
        !!this.form.edit_email &&
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          this.form.edit_email
        )
      );
    },
    confirmPasswordIsValid() {
      return !!this.form.password && this.form.password.length >= 8;
    },
    checkUniqueUsername() {
      for (let index = 0; index < this.allUsername.length; index++) {
        if (
          this.allUsername[index].username.toLowerCase() !=
            this.username.toLowerCase() &&
          this.allUsername[index].username.toLowerCase() ==
            this.form.edit_username.toLowerCase()
        ) {
          return true;
        }
      }
    },
    editFormIsValid() {
      return (
        this.confirmPasswordIsValid &&
        this.editEmailIsValid &&
        this.editUsernameIsValid &&
        this.editSurnameIsValid &&
        this.editNameIsValid &&
        this.noSpecialChars
      );
    },
    currentPasswordIsValid() {
      return !!this.form.currentPassword && this.form.currentPassword.length >= 8;
    },
    newPasswordIsValid() {
      return !!this.form.newPassword && this.form.newPassword.length >= 8;
    },
    confirmNewPasswordIsValid() {
      return !!this.form.confirmNewPassword && this.form.confirmNewPassword >= 8;
    },
    isPasswordMatch() {
      return this.form.newPassword == this.form.confirmNewPassword;
    },
    resetPasswordIsValid() {
      return (
        this.currentPasswordIsValid &&
        this.newPasswordIsValid &&
        this.confirmNewPasswordIsValid &&
        this.isPasswordMatch
      );
    }
  },
  async mounted() {
    await this.getProfileToSite();
    window.scrollTo(0, 0);
    this.tokenData = jwtDecrypt(JSON.parse(localStorage.getItem("user")).token);
    this.role_id = this.tokenData.role_id;
    this.account_id = this.tokenData.account_id;
    fetch(this.urlProfile + "/", {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((data) => {
        this.profile = data.data;
        this.username = this.profile.username;
        this.first_name = this.profile.first_name;
        this.last_name = this.profile.last_name;
        this.email = this.profile.email;
        this.role_desc = this.profile.role_id;
        if (this.role_desc == 3) {
          this.getProductsToStore();
        }
      })
      .catch((err) => console.log(err.message));
    fetch(this.$store.state.usernameURL)
      .then((res) => res.json())
      .then((data) => {
        this.allUsername = data.data;
      })
      .catch((err) => console.log(err.message));
  },
  created() {},
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
.profile-section {
  margin: 2.4rem 0 6.4rem 0;
}
.profile-container {
  width: 100%;
  padding-bottom: 5rem;
  background-color: white;
  box-shadow: rgba(70, 50, 50, 0.08) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  height: auto;
}
.profile-header {
  position: relative;
  height: 20rem;
}
.profile-tab {
  width: 100%;
  height: 12rem;
  background-color: #333;
  position: absolute;
}
.flex-absolute {
  position: absolute;
  display: flex;
  gap: 2.4rem;
  margin: 5rem 0rem 0rem 4rem;
  align-items: flex-end;
}
.profile-pic {
  width: 14rem;
  height: 14rem;
  background-color: #ffd700;
  border: 5px solid #fff;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.fullname {
  color: #333;
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  word-spacing: 0.4rem;
  text-align: center;
  line-height: 1.2;
  padding-top: 8rem;
}
.email,
.username {
  background-color: #f3f3f3;
  width: fit-content;
  border-radius: 2rem;
  padding: 0.8rem 1rem;
}
.role,
.privilege {
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  width: fit-content;
  text-align: center;
  border-radius: 2rem;
  padding: 0.8rem 1rem;
  text-transform: uppercase;
}
.privilege {
  background-color: #e5e4e2;
}
.tags {
  display: flex;
  width: 100%;
  gap: 1.2rem;
}
.profile-body {
  margin: 3rem 21rem;
  color: #333;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.12rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.description {
  margin-top: 1rem;
}
.description-header {
  font-weight: 700;
  margin-bottom: 1rem;
  width: fit-content;
}
.card-grid {
  grid-template-columns: 2fr 2fr 1fr;
}
.card-grid.grid {
  column-gap: 1.6rem;
}
.seemore {
  margin-left: 1.2rem;
  text-align: center;
  align-self: center;
  color: #333;
  width: fit-content;
}
.hover-underline-animation {
  cursor: pointer;
  display: inline-block;
  position: relative;
}
.hover-underline-animation:hover {
  color: #eb435f;
  transition: transform 0.25s ease-in-out;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 0.1rem;
  bottom: 0;
  left: 0;
  background-color: #eb435f;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.icon {
  color: rgb(85, 85, 85);
  margin-right: 0.8rem;
}
.button {
  text-align: right;
  margin: 2rem 4rem;
}
.btn {
  display: inline-block;
  text-decoration: none;
  font-size: 1.4rem;
  padding: 1.2rem 2.4rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
.btn--full {
  background-color: #eb435f;
  color: white;
  transition: 0.3s all ease-in-out;
}
.btn--full:hover,
.btn--full:active {
  background-color: #bc364c;
}
.btn--ghost {
  margin-right: 2.4rem;
  box-shadow: inset 0 0 0 1px #eb435f;
  color: #eb435f;
  transition: 0.3s all ease-in-out;
}
.btn--ghost:hover,
.btn--ghost:active {
  background-color: #bc364c;
  color: #fff;
  box-shadow: none;
}
.edit-container {
  margin: 3.6rem;
  grid-template-columns: 2fr 1.5fr;
  background-color: white;
  box-shadow: rgba(70, 50, 50, 0.08) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  max-width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.left-side {
  background-color: #333;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.left-side .profile-pic {
  border: none;
}
.left-side .info {
  margin-top: 2rem;
  align-items: center;
  gap: 1.2rem;
}
.left-side .fullname {
  color: #fff;
}
.left-side .role {
  background-color: transparent;
}
.form {
  margin: 6rem 2.4rem 3.6rem 2.4rem;
  text-align: center;
  align-content: center;
}
.form-header {
  font-size: 4.2rem;
  font-weight: 700;
  color: #333;
  font-family: "Libre Baskerville", serif;
  margin: 3.6rem 0;
  width: 100%;
}
.input-name,
.input-surname,
.input-username,
.input-email,
.input-password {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 3.2rem 20%;
}
.input-username label,
.input-email label,
.input-password label,
.input-name label,
.input-surname label {
  text-align: left;
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 1.2rem;
}
.input-name input,
.input-surname input,
.input-username input,
.input-email input,
.input-password input {
  width: 100%;
  height: 3.6rem;
  background: rgb(250, 250, 250);
  border: none;
  padding: 0 0.8rem;
}
.input-username input:focus,
.input-email input:focus,
.input-password input:focus,
.input-name input:focus,
.input-surname input:focus {
  outline: none;
}

.input-username input::placeholder,
.input-email input::placeholder,
.input-password input::placeholder,
.input-name input::placeholder,
.input-surname input::placeholder {
  color: rgb(85, 85, 85, 0.35);
}
.show-hide-passwod {
  position: relative;
}

.show-hide-passwod .icon {
  position: absolute;
  right: 2%;
  top: 35%;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

.show-hide-passwod .icon:hover {
  color: #333;
}
label span {
  font-size: 1rem;
  color: #eb435f;
}
.edit-container .fullname {
  padding-top: 0;
}
@media (max-width: 62em) {
  .fullname {
    padding-top: 0rem;
  }
  .form {
    margin: 6rem 0 3.6rem 0;
  }
  .left-side .fullname {
    font-size: 1.4rem;
  }
  .left-side .role {
    font-size: 1rem;
  }
  .form-header {
    font-size: 3.6rem;
  }
}
@media (max-width: 56em) {
  .profile-body {
    margin: 3rem 4rem 3rem 21rem;
  }
}
@media (max-width: 40em) {
  .flex-absolute {
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    align-items: center;
    margin: 2rem 0;
    position: absolute !important;
  }
  .tags {
    justify-content: center;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-body {
    margin: 8rem 5rem;
  }
  .profile-pic {
    width: 13rem;
    height: 13rem;
    border: 3px solid #fff;
  }
  .edit-container {
    margin: 3.6rem;
    display: flex;
    flex-direction: column;
  }
  .left-side {
    padding: 2rem 3rem;
  }
  .btn {
    padding: 1rem 2rem;
  }
  .btn--ghost {
    margin: 1rem;
  }
}
@media (max-width: 29em) {
  .seemore {
    display: flex;
    justify-items: center;
    justify-self: center;
    margin-left: 0;
  }
  .card-grid {
    grid-template-columns: 1fr;
  }
  .card-grid.grid {
    column-gap: 0;
    row-gap: 2rem;
  }
  .container {
    padding: 0 !important;
    position: relative;
  }
  footer {
    display: none;
  }
  .profile-container {
    margin: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    transform: translateY(-7rem);
  }
  .edit-container {
    margin: 0;
    width: 100%;
    position: absolute;
    transform: translateY(-7rem);
  }
  .profile-body {
    margin: 8rem 5rem 6rem 5rem;
  }
}
.reset-password {
  margin-bottom: 2rem;
}
.reset-btn {
  margin-top: 1.2rem;
}
</style>
