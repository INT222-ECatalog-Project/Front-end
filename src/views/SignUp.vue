<template>
  <div class="SignUp">
    <div class="container">
      <transition-group name="fade">
        <div class="sign-in grid" v-if="isSignUp == false">
          <div class="img-show">
            <div class="text-header">
              Welcome back!
              <div class="text-desc">
                To keep in touch with us all time, please sign in.
              </div>
              <div class="or">
                or
              </div>
              <div class="sign-btn" @click="isSignUp = true">Sign up</div>
            </div>
            <img src="../../src/assets/images/sign-up-gif.gif" alt="" />
          </div>
          <div class="back-btn" @click="goBack">
            <i class="fas fa-chevron-left"></i>
          </div>
          <form class="form" @submit.prevent="handleLogin">
            <div class="form-header">
              Sign in
            </div>
            <div class="input-username">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                v-model="form.sign_in_username"
              />
            </div>
            <div class="input-password">
              <label for="password">Password</label>
              <div class="show-hide-passwod">
                <input
                  :type="type"
                  name="password"
                  id="password-sign-in"
                  placeholder="Enter your password"
                  v-model="form.sign_in_password"
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
            <a href="#" class="forgot">Forgot your password?</a>
            <button
              class="btn btn--full"
              type="submit"
              :style="
                signInUsernameisValid && signInPasswordisValid
                  ? {}
                  : { backgroundColor: '#707070', cursor: 'not-allowed', pointerEvents: 'none' }
              "
            >
              Sign in
            </button>
            <div class="mobile sign-btn" @click="isSignUp = true">Sign up</div>
          </form>
        </div>
      </transition-group>
      <transition-group name="fade">
        <div class="sign-up grid" v-if="isSignUp">
          <div class="back-btn" @click="goBack">
            <i class="fas fa-chevron-left"></i>
          </div>
          <form class="form" @submit.prevent="createAccount">
            <div class="form-header">
              Create account
            </div>
            <div class="flex-display">
              <div class="input-name">
                <label for="name"
                  >Name
                  <span
                    v-if="!signUpNameIsValid && form.sign_up_name.length == 0"
                    >*required </span
                  ><span
                    v-if="
                      signUpNameIsValid || 50 - form.sign_up_name.length <= 0
                    "
                    :style="[
                      50 - form.sign_up_name.length <= 0
                        ? { color: '#eb435f' }
                        : { color: '#32CD32' },
                    ]"
                    >({{ 50 - form.sign_up_name.length }}/50)</span
                  ></label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John"
                  v-model="form.sign_up_name"
                />
              </div>
              <div class="input-surname">
                <label for="surname"
                  >Surname
                  <span
                    v-if="
                      !signUpSurnameIsValid && form.sign_up_surname.length == 0
                    "
                    >*required </span
                  ><span
                    v-if="
                      signUpSurnameIsValid ||
                        50 - form.sign_up_surname.length <= 0
                    "
                    :style="[
                      50 - form.sign_up_surname.length <= 0
                        ? { color: '#eb435f' }
                        : { color: '#32CD32' },
                    ]"
                    >({{ 50 - form.sign_up_surname.length }}/50)</span
                  >
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Smith"
                  v-model="form.sign_up_surname"
                />
              </div>
            </div>
            <div class="input-username">
              <label for="username"
                >Username
                <span
                  v-if="
                    !signUpUsernameIsValid && form.sign_up_username.length == 0
                  "
                  >*required</span
                >
                <span v-if="!noSpecialChars"
                  >no special characters(&amp;,&#60;,&#62; or commas)</span
                >
                <span
                  v-if="
                    (signUpUsernameIsValid && noSpecialChars) ||
                      40 - form.sign_up_username.length <= 0
                  "
                  :style="[
                    40 - form.sign_up_username.length <= 0
                      ? { color: '#eb435f' }
                      : { color: '#32CD32' },
                  ]"
                  >({{ 40 - form.sign_up_username.length }}/40)</span
                >
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                v-model="form.sign_up_username"
              />
            </div>
            <div class="input-email">
              <label for="email"
                >Email <span v-if="!signUpEmailIsValid">*required</span></label
              >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                v-model="form.sign_up_email"
              />
            </div>
            <div class="input-password">
              <label for="password"
                >Password
                <span v-if="!signUpPasswordIsValid"
                  >*required at least 8 chars</span
                >
                <span
                  :style="{ color: '#FFD700' }"
                  v-if="
                    form.sign_up_password.length >= 8 &&
                      form.sign_up_password.length < 10
                  "
                  >good</span
                >
                <span
                  :style="{ color: '#32CD32' }"
                  v-if="form.sign_up_password.length >= 10"
                  >excellent</span
                >
              </label>
              <div class="show-hide-passwod">
                <input
                  :type="type"
                  name="password"
                  id="password-sign-up"
                  placeholder="Enter your password"
                  v-model="form.sign_up_password"
                  :style="[
                    form.sign_up_password.length <= 0
                      ? { backgroundColor: '' }
                      : form.sign_up_password.length < 8
                      ? { backgroundColor: '#f9cede' }
                      : form.sign_up_password.length >= 8 &&
                        form.sign_up_password.length < 10
                      ? { backgroundColor: '#fff7cc' }
                      : { backgroundColor: '#d6f5d6' },
                  ]"
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
            <button
              class="btn btn--full"
              type="submit"
              :style="[
                signUpFormIsValid
                  ? { backgroundColor: '#333' }
                  : { backgroundColor: '#707070', cursor: 'not-allowed', pointerEvents: 'none' },
              ]"
            >
              Sign up
            </button>
            <div class=" mobile sign-btn" @click="isSignUp = false">
              Sign in
            </div>
          </form>
          <div class="img-show">
            <div class="text-header">
              Hello, friend!
              <div class="text-desc">
                Enter your details, and start to experience with us.
              </div>
              <div class="or">
                or
              </div>
              <div class="sign-btn" @click="isSignUp = false">Sign in</div>
            </div>
            <img
              src="../../src/assets/images/sign-in-gif.gif"
              alt="sign-in-image"
            />
          </div>
        </div>
      </transition-group>
    </div>
    <div class="modal" v-if="successSignUp">
      <Popup
        @closePopup="successSignUp = false"
        :text="successSignUpText"
        :isTrue="true"
      />
    </div>
    <div class="modal" v-if="failedSignUp">
      <Popup
        @closePopup="failedSignUp = false"
        :text="failedSignUpText"
        :isTrue="false"
      />
    </div>
    <div class="modal" v-if="failedSignIn">
      <Popup
        @closePopup="failedSignIn = false"
        :text="failedSignInText"
        :isTrue="false"
      />
    </div>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
    <div class="big-circle"></div>
    <div class="small-circle"></div>
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
      successSignUp: false,
      failedSignUp: false,
      failedSignIn: false,
      successSignUpText: "Congratulations, your account is ready!",
      failedSignUpText: "This username has already used",
      failedSignInText: "Invalid username or password",
      loading: false, //login + signup
      message: "", //login + signup
      type: "password",
      successful: false, //signup
      isSignUp: false,
      form: {
        sign_in_username: "",
        sign_in_password: "",
        sign_up_name: "",
        sign_up_surname: "",
        sign_up_username: "",
        sign_up_email: "",
        sign_up_password: "",
      },
      allUsername:""
    };
  },
  computed: mapGetters(["getAccounts","getUsernames"]),
  mounted() {
    window.scrollTo(0, 0);
    if (this.loggedIn) {
      this.$router.push("/stores");
    }
    this.getAccountsToSite();
    this.getAllUsernames();
          fetch(this.$store.state.usernameURL)
        .then((res) => res.json())
        .then((data) => {
          this.allUsername = data.data
        })
        .catch((err) => console.log(err.message));
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/stores");
    }
  },
  computed: {
    getAllUsersToSite() {
      return this.$store.getters.getAccounts;
    },
    getAllUsername() {
      return this.$store.getters.getUsernames;
    },
    signInUsernameisValid() {
      return !!this.form.sign_in_username;
    },
    signInPasswordisValid() {
      return !!this.form.sign_in_password;
    },
    checkUniqueUsername() {
      for (let index = 0; index < this.allUsername.length; index++) {
        if (this.allUsername[index].username.toLowerCase() == this.form.sign_up_username.toLowerCase()) {
          return true;
        }
      }
    },
    signUpNameIsValid() {
      return !!this.form.sign_up_name && this.form.sign_up_name.length <= 50;
    },
    signUpSurnameIsValid() {
      return (
        !!this.form.sign_up_surname && this.form.sign_up_surname.length <= 50
      );
    },
    signUpUsernameIsValid() {
      return (
        !!this.form.sign_up_username && this.form.sign_up_username.length <= 40
      );
    },
    noSpecialChars() {
      return (
        !this.form.sign_up_username.includes("&") &&
        !this.form.sign_up_username.includes(",") &&
        !this.form.sign_up_username.includes("<") &&
        !this.form.sign_up_username.includes(">")
      );
    },
    signUpEmailIsValid() {
      return !!this.form.sign_up_email && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.form.sign_up_email);
    },
    signUpPasswordIsValid() {
      return (
        !!this.form.sign_up_password && this.form.sign_up_password.length >= 8
      );
    },
    signUpFormIsValid() {
      return (
        this.signUpPasswordIsValid &&
        this.signUpEmailIsValid &&
        this.signUpUsernameIsValid &&
        this.signUpSurnameIsValid &&
        this.signUpNameIsValid &&
        this.noSpecialChars
      );
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    ...mapActions(["getAccountsToSite","getAllUsernames"]),
    goBack() {
      this.$router.go(-1);
    },
    togglePassword() {
      if (this.type === "password") {
        this.type = "text";
      } else if (this.type === "text") {
        this.type = "password";
      }
    },
    createAccount() {
      if (this.signUpFormIsValid && this.checkUniqueUsername != true) {
        const newAccount = {
          first_name: this.form.sign_up_name,
          last_name: this.form.sign_up_surname,
          username: this.form.sign_up_username,
          email: this.form.sign_up_email,
          password: this.form.sign_up_password,
          role: {
            id: 3,
            role_name: "member",
            role_desc: "Able to [ADD/DELETE/GET] Wishlist and [GET] Products",
          },
        };
        this.$store.dispatch("auth/register", newAccount);
        (this.form.sign_up_name = ""),
          (this.form.sign_up_surname = ""),
          (this.form.sign_up_username = ""),
          (this.form.sign_up_email = ""),
          (this.form.sign_up_password = "");
        this.successSignUp = true;
      } else {
        this.form.sign_in_password = "";
        this.failedSignUp = true;
      }
    },
    handleLogin() {
      let user = {
        username: this.form.sign_in_username,
        password: this.form.sign_in_password,
      };
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          window.location.reload();
          this.$router.push("/stores");
        },
        (err) => {
          this.loading = false;
          this.form.sign_in_password = "";
          this.failedSignIn = true;
          this.message =
            (err.respose && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          console.log(this.message);
        }
      );
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
.mobile {
  display: none !important;
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
  color: white;
  font-size: 1.6rem;
}
.SignUp {
  position: relative;
}

.SignUp .small-circle {
  top: 25%;
  left: -5%;
}

.SignUp .big-circle {
  right: -2%;
}

.sign-up {
  margin: 3.6rem;
  grid-template-columns: 2fr 1.5fr;
  background-color: white;
  box-shadow: rgba(70, 50, 50, 0.08) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: 0.3s all ease-in-out;
}

.sign-in {
  margin: 3.6rem;
  grid-template-columns: 1.5fr 2fr;
  background-color: white;
  box-shadow: rgba(70, 50, 50, 0.08) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: 0.3s all ease-in-out;
}

.sign-up:hover,
.sign-in:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.sign-up.grid,
.sign-in.grid {
  gap: 0;
}

.img-show {
  width: 100%;
  position: relative;
  height: 100%;
}

.text-header {
  font-size: 4.8rem;
  font-family: "Libre Baskerville", serif;
  position: absolute;
  color: #fff;
  text-align: center;
  width: 100%;
  top: 35%;
}

.text-desc {
  margin: 2.4rem 20%;
  width: 60%;
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  line-height: 1.4;
}

.or {
  margin: 0 20%;
  width: 60%;
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  line-height: 1.4;
}
.or::before,
.or::after {
  content: "______________";
}

.img-show img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.btn,
.btn:link,
.btn:visited {
  font-family: "Lato", sans-serif !important;
  text-align: center;
  width: 60%;
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1.2rem 2.4rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  /* margin-top: 2.4rem; */
  border-radius: 2.4rem;
}

.btn--ghost:link,
.btn--ghost:visited {
  box-shadow: inset 0 0 0 1px #fff;
  color: #fff;
  transition: 0.3s all ease-in-out;
}

.btn--ghost:hover,
.btn--ghost:active {
  background-color: #fff;
  color: #333;
  box-shadow: none;
}

.sign-btn {
  font-family: "Lato", sans-serif !important;
  text-align: center;
  width: 60%;
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1.2rem 2.4rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 2.4rem;
  border-radius: 2.4rem;
  box-shadow: inset 0 0 0 1px #fff;
  color: #fff;
  transition: 0.3s all ease-in-out;
}

.sign-btn:hover {
  background-color: #fff;
  color: #333;
  box-shadow: none;
}

.form {
  margin: 6rem 2.4rem 3.6rem 2.4rem;
  /* width: 100%; */
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

.flex-display {
  display: flex;
  height: auto;
  /* flex-wrap: wrap; */
}

.input-name,
.input-surname {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.input-name {
  margin-left: 20%;
  margin-top: 2.4rem;
}

.input-surname {
  margin-right: 20%;
  margin-top: 2.4rem;
}

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

.input-name input {
  width: 80%;
  height: 3.6rem;
  background: rgb(250, 250, 250);
  border: none;
  padding: 0 0.8rem;
}
.input-surname input {
  width: 100%;
  height: 3.6rem;
  background: rgb(250, 250, 250);
  border: none;
  padding: 0 0.8rem;
}
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

label span {
  font-size: 1rem;
  color: #eb435f;
}

.forgot {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 4.8rem;
  display: block;
}

a:link,
a:visited {
  text-decoration: none;
  transition: 0.2s all ease-in-out;
}

a:hover,
a:active {
  color: #555;
}

.btn--full,
.btn--full:visited {
  width: 26rem;
  background-color: #eb435f;
  color: white;
  transition: 0.3s all ease-in-out;
}

.btn--full:hover,
.btn--full:active {
  background-color: #bc364c;
}

@media (max-width: 62em) {
  .form {
    margin: 6rem 0 3.6rem 0;
  }
  .text-header {
    font-size: 3.2rem;
  }
  .text-desc {
    margin: 2.4rem 10%;
    width: 80%;
    font-size: 1.2rem;
  }
  .or {
    font-size: 1.2rem;
  }
  .form-header {
    font-size: 3.6rem;
  }
}
@media (max-width: 47em) {
  .text-header {
    font-size: 2.8rem;
  }
  .or {
    font-size: 1rem;
  }
  .form-header {
    font-size: 3.2rem;
  }
}

@media (max-width: 40em) {
  .sign-up {
    display: flex;
    flex-direction: column-reverse;
  }

  .sign-in {
    display: flex;
    /* flex-direction: column-reverse; */
    flex-direction: column;
  }
  .img-show {
    width: 100%;
    position: relative;
    height: 36rem;
  }
  .img-show img[data-v-6f83b81c] {
    width: 100%;
    height: 100%;
  }
}

/* below 470px */
@media (max-width: 29em) {
  .back-btn {
    display: flex !important;
  }
  .container {
    padding: 0 !important;
    position: relative;
  }
  footer {
    display: none;
  }
  .sign-in {
    margin: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    transform: translateY(-7rem);
  }
  .sign-up {
    flex-direction: column;
    margin: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    transform: translateY(-7rem);
    background-color: #eb435f;
  }
  .sign-up span {
    color: #6b202d;
  }
  .sign-up .form-header {
    color: white;
  }
  .sign-up .input-username label,
  .sign-up .input-email label,
  .sign-up .input-password label,
  .sign-up .input-name label,
  .sign-up .input-surname label {
    color: white;
  }

  .sign-up .input-email input::placeholder,
  .sign-up .input-username input::placeholder,
  .sign-up .input-password input::placeholder,
  .sign-up .input-name input::placeholder,
  .sign-up .input-surname input::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }
  .sign-up .btn--full,
  .sign-up .btn--full:visited {
    width: 26rem;
    background-color: white;
    color: white;
    transition: 0.3s all ease-in-out;
  }

  .sign-up .btn--full:hover,
  .sign-up .btn--full:active {
    background-color: rgba(255, 255, 255, 0.35);
  }
  .img-show {
    display: none;
  }
  .mobile {
    display: inline-block !important;
  }
  .mobile.sign-btn {
    box-shadow: inset 0 0 0 1px #333;
    color: #333;
  }
}
</style>
