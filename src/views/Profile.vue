<template>
  <div class="Profile">
    <div class="profile-section">
      <div class="container">
        <transition-group name="slide-fade">
          <div class="profile-container" v-if="isEdit == false">
            <div class="profile-header">
              <div class="profile-tab"></div>
              <div class="flex-absolute">
                <div class="profile-pic"></div>
                <div class="info">
                  <div class="fullname">Similan Klinsmith</div>
                  <div class="role">Admin</div>
                </div>
              </div>
            </div>
            <div class="profile-body">
              <div class="email">
                <i class="icon fas fa-envelope"></i>
                <span>deep25952@gmail.com</span>
              </div>
              <div class="username">
                <i class="icon fas fa-user"></i> <span>ddivdeep</span>
              </div>
              <div class="description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptas velit nisi cupiditate inventore, fugiat nemo.
              </div>
            </div>
            <div class="button">
              <div class="btn btn--ghost" @click="toggleEdit">
                Edit Profile
              </div>
              <div class="btn btn--full">Delete</div>
            </div>
          </div>
        </transition-group>
        <div class="edit-container" v-if="isEdit">
          <div class="left-side">
            <div class="profile-pic"></div>
            <div class="info">
              <div class="fullname">Similan Klinsmith</div>
              <div class="role">Admin</div>
            </div>
          </div>
          <form action="" class="form">
            <div class="form-header">Edit Profile</div>
            <div class="input-name">
              <label for="name">Name </label>
              <input type="text" name="name" id="name" placeholder="John" />
            </div>
            <div class="input-surname">
              <label for="surname">Surname </label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Maxwell"
              />
            </div>
            <div class="input-username">
              <label for="username">Username </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="JohnMax"
              />
            </div>
            <div class="input-email">
              <label for="email">Email </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </div>
            <div class="input-password">
              <label for="password">Confirm Password </label>
              <div class="show-hide-passwod">
                <input
                  :type="type"
                  name="password"
                  id="password"
                  placeholder="*******"
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
              <div class="btn btn--ghost">Confirm Edit</div>
              <div class="btn btn--full" @click="toggleEdit">Cancel</div>
            </div>
          </form>
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
  components: {
    Socials,
    Footer,
  },
  data() {
    return {
      isEdit: false,
      type: "password",
    };
  },
  methods: {
    toggleEdit() {
      this.isEdit = !this.isEdit;
      window.scrollTo(0, 0);
    },
    togglePassword() {
      if (this.type === "password") {
        this.type = "text";
      } else if (this.type === "text") {
        this.type = "password";
      }
    },
  },
};
</script>

<style scoped>
.profile-section {
  margin: 2.4rem 0 6.4rem 0;
}
.profile-container {
  margin: 3.6rem;
  padding-bottom: 5rem;
  grid-template-columns: 2fr 1.5fr;
  background-color: white;
  box-shadow: rgba(70, 50, 50, 0.08) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  max-width: 100%;
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
  width: 15rem;
  height: 15rem;
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
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  word-spacing: 0.4rem;
}
.role {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: #ffd700;
  width: 10rem;
  text-align: center;
  border-radius: 2rem;
  padding: 0.8rem 0.2rem;
  text-transform: uppercase;
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
  /* position: relative; */
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
  color: #ffd700;
  border: 1.5px solid #ffd700;
  background-color: transparent;
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

@media (max-width: 62em) {
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
    margin: 3rem 10rem 3rem 21rem;
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
    /* height: 100vh; */
    position: absolute;
    transform: translateY(-7rem);
  }
  .profile-body {
    margin: 8rem 5rem 6rem 5rem;
  }
}
</style>
