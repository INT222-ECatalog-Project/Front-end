<template>
  <div class="Users">
    <div class="container">
      <div class="sub-heading">See all users</div>
      <div class="secondary-header">Users List</div>
      <div class="grid grid--2-cols users-section">
        <div class="form">
          <div class="side-img">
            <img src="../../src/assets/images/side-img-user.jpg" alt="" />
            <div class="text">
              <div class="header">Manage admin</div>
              <div class="info">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </div>
            </div>
          </div>
          <div class="add-user">
            <div class="name">
              <label for="name"
                >Name

                <span v-if="!editNameIsValid && form.name.length == 0"
                  >*required </span
                ><span
                  v-if="editNameIsValid || 50 - form.name.length <= 0"
                  :style="[
                    50 - form.name.length <= 0
                      ? { color: '#eb435f' }
                      : { color: '#32CD32' },
                  ]"
                  >({{ 50 - form.name.length }}/50)</span
                >
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John"
                v-model="form.name"
              />
            </div>
            <div class="surname">
              <label for="surname"
                >Surname
                <span v-if="!editSurnameIsValid && form.surname.length == 0"
                  >*required </span
                ><span
                  v-if="editSurnameIsValid || 50 - form.surname.length <= 0"
                  :style="[
                    50 - form.surname.length <= 0
                      ? { color: '#eb435f' }
                      : { color: '#32CD32' },
                  ]"
                  >({{ 50 - form.surname.length }}/50)</span
                >
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Smith"
                v-model="form.surname"
              />
            </div>
            <div class="username">
              <label for="username"
                >Username
                <span v-if="!editUsernameIsValid && form.username.length == 0"
                  >*required</span
                >
                <span v-if="!noSpecialChars"
                  >no special characters(&amp;,&#60;,&#62; or commas)</span
                >
                <span
                  v-if="
                    (editUsernameIsValid && noSpecialChars) ||
                      40 - form.username.length <= 0
                  "
                  :style="[
                    40 - form.username.length <= 0
                      ? { color: '#eb435f' }
                      : { color: '#32CD32' },
                  ]"
                  >({{ 40 - form.username.length }}/40)</span
                >
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Smith123"
                v-model="form.username"
                :style="[
                  isEdit
                    ? {
                        backgroundColor: '#ebebeb',
                        color: '#6d6d6d',
                        border: '1px solid #cdcdcd',
                      }
                    : {},
                ]"
              />
            </div>
            <div class="email">
              <label for="email"
                >Email
                <span v-if="!editEmailIsValid">*required</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                v-model="form.email"
              />
            </div>
            <div class="old-password" v-if="isEdit">
              <input
                type="checkbox"
                id="useOldPass"
                name="useOldPass"
                v-model="useFormerPassword"
                checked
              />
              <label for="useOldPass">Use former password</label><br />
            </div>
            <div class="password" v-if="!useFormerPassword || !isEdit">
              <label for="password"
                >Password
                <span v-if="!isPasswordValid">*required</span>
                <span
                  :style="{ color: '#FFD700' }"
                  v-if="
                    form.password.length >= 8 &&
                      form.password.length < 10 &&
                      checkStronPassword
                  "
                  >good</span
                >
                <span
                  :style="{ color: '#32CD32' }"
                  v-if="checkStronPassword && form.password.length >= 10"
                  >excellent</span
                >
              </label>
              <input
                :type="type"
                id="password"
                name="password"
                placeholder="Enter your password"
                v-model="form.password"
                :style="[
                  form.password.length <= 0
                    ? { backgroundColor: '' }
                    : !checkStronPassword
                    ? { backgroundColor: '#f9cede' }
                    : form.password.length >= 8 &&
                      form.password.length < 10 &&
                      checkStronPassword
                    ? { backgroundColor: '#fff7cc' }
                    : checkStronPassword
                    ? { backgroundColor: '#d6f5d6' }
                    : {},
                ]"
              />
              <div class="btn-eye" @click="togglePassword">
                <div
                  :style="[
                    type === 'text' ? { display: 'none' } : { display: 'flex' },
                  ]"
                >
                  <i class="fas fa-eye icon"></i>
                </div>
                <div
                  :style="[
                    type !== 'text' ? { display: 'none' } : { display: 'flex' },
                  ]"
                >
                  <i class="fas fa-eye-slash icon"></i>
                </div>
              </div>
            </div>
            <div
              class="warnings"
              v-if="isEdit == false || useFormerPassword == false"
            >
              <div class="warning-header">
                Password must:
              </div>
              <div
                class="warning"
                :style="[
                  isPasswordLenght ? { color: '#35e08e' } : { color: '#333' },
                ]"
              >
                Be at least 8 characters.
              </div>
              <div
                class="warning"
                :style="[
                  isPasswordIncludeUppercase && isPasswordIncludeLowercase
                    ? { color: '#35e08e' }
                    : { color: '#333' },
                ]"
              >
                Contain both UPPERCASE and lowercase characters.
              </div>
              <div
                class="warning"
                :style="[
                  isPasswordIncludeNumber
                    ? { color: '#35e08e' }
                    : { color: '#333' },
                ]"
              >
                Contain numbers.
              </div>
              <div
                class="warning"
                :style="[
                  isPasswordIncludeSpecial
                    ? { color: '#35e08e' }
                    : { color: '#333' },
                ]"
              >
                Contain special characters ! @ # $ % ^ &amp; * _.
              </div>
            </div>
            <div class="role">
              <label for="role"
                >Role
                <span v-if="!editRoleIsValid">*required</span>
              </label>
              <select name="role" id="role" v-model="form.role">
                <option value="" selected>none</option>
                <option
                  :value="role.role_id"
                  v-for="role in getAdminRoles"
                  :key="role.role_id"
                  >{{ role.role_name }}</option
                >
              </select>
            </div>
            <button
              class="btn btn--full"
              v-if="isEdit == false"
              type="submit"
              @click="toggleToPrompt"
              :style="[
                editFormIsValidFirst
                  ? {}
                  : {
                      backgroundColor: '#707070',
                      cursor: 'not-allowed',
                      pointerEvents: 'none',
                    },
              ]"
            >
              Add
            </button>
            <button
              class="btn btn--full edit-btn"
              v-if="isEdit"
              type="submit"
              @click="toggleToPrompt"
              :style="[
                editFormIsValidFirst
                  ? {}
                  : {
                      backgroundColor: '#707070',
                      cursor: 'not-allowed',
                      pointerEvents: 'none',
                    },
              ]"
            >
              Confirm edit
            </button>
            <button
              class="btn btn--full cancel-btn"
              v-if="isEdit"
              @click="toggleEditAccount"
            >
              Cancel
            </button>
          </div>
        </div>
        <div class="filter">
          <div class="role-filter">
            <label for="colors">ROLES</label>
            <select v-model="selectedRole">
              <option value="">none</option>
              <option
                v-for="role in getAllRoles"
                :key="role.role_id"
                :value="role.role_id"
                >{{ role.role_name }}</option
              >
            </select>
          </div>
          <div class="role-filter-mb">
            <div
              class="filter-mb admin-filter"
              :style="[
                adminFilter == true || selectedRole == 1
                  ? { backgroundColor: '#ffd700', color: 'white' }
                  : { backgroundColor: '#ddd', color: '#white' },
              ]"
              @click="filterAdmin"
            >
              Admin
            </div>
            <div
              class="filter-mb deputy-admin-filter"
              :style="[
                deputyAdminFilter == true || selectedRole == 2
                  ? { backgroundColor: '#FF6347', color: 'white' }
                  : { backgroundColor: '#ddd', color: '#white' },
              ]"
              @click="filterDeputyAdmin"
            >
              Deputy Admin
            </div>
            <div
              class="filter-mb member-filter"
              :style="[
                memberFilter == true || selectedRole == 3
                  ? { backgroundColor: '#9400D3', color: 'white' }
                  : { backgroundColor: '#ddd', color: '#white' },
              ]"
              @click="filterMember"
            >
              Member
            </div>
          </div>
          <input
            type="text"
            class="search"
            placeholder="Search by username"
            v-model="searchInput"
          />
        </div>
        <transition-group name="fade">
          <!-- component -->
          <List
            class="List"
            v-for="(user, index) in getAllUsers"
            :key="user.account_id"
            :user="user"
            :accountId="account_id"
            @deleteAccountById="handleDelete"
            @editAccountById="handleEdit"
            v-show="setPaginate(index)"
          ></List>
        </transition-group>
        <transition-group name="slide-fade">
          <Table :ths="ths" class="table" id="table" :key="ths">
            <tbody
              v-for="(user, index) in getAllUsers"
              :key="user.account_id"
              v-show="setPaginate(index)"
            >
              <!-- :style="[ account_id == user.account_id ? {backgroundColor:'#ebebeb'}:{}]" -->
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td v-if="user.role_id == 1">Admin</td>
                <td v-if="user.role_id == 2">Deputy Admin</td>
                <td v-if="user.role_id == 3">Member</td>
                <td>
                  <div
                    class="delete"
                    @click="deleteAccount(user.account_id)"
                    :style="[
                      account_id == user.account_id
                        ? { display: 'none' }
                        : { display: 'inline' },
                    ]"
                  >
                    Delete
                  </div>
                  <div
                    v-if="account_id == user.account_id"
                    class="delete"
                    :style="{ display: 'inline', textDecoration: 'none' }"
                  >
                    -
                  </div>

                  <div
                    v-if="user.role_id != 3"
                    class="edit"
                    @click="toggleEditAccount(user)"
                    :style="[
                      account_id == user.account_id
                        ? { display: 'none' }
                        : { display: 'inline' },
                    ]"
                  >
                    | Edit
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <!-- -------- -->
        </transition-group>
      </div>
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
    <div class="modal" v-if="failedCreate">
      <Popup
        @closePopup="failedCreate = false"
        :text="failedCreateText"
        :isTrue="false"
      />
    </div>
    <div class="modal" v-if="showPrompt">
      <Prompt
        :username="form.username"
        :role="form.role"
        @closePrompt="showPrompt = false"
        @sendConfirmPassword="startAction"
      />
    </div>
    <div v-if="successToAdd" id="noti">
      <Notification> {{ successData }} is completed </Notification>
    </div>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import Socials from "@/components/Socials.vue";
import Footer from "@/components/Footer.vue";
import List from "@/components/List.vue";
import Table from "@/components/Table.vue";
import Popup from "@/components/Popup.vue";
import Prompt from "@/components/Prompt.vue";
import Notification from "@/components/Notification.vue";
import { jwtDecrypt } from "../shared/jwtHelper";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Users",
  components: {
    Socials,
    Footer,
    List,
    Table,
    Popup,
    Notification,
    Prompt,
  },
  data() {
    return {
      showPrompt: false,
      useFormerPassword: true,
      successData: "",
      successToAdd: false,
      failedCreate: false,
      failedCreateText: "This username has already used",
      current: 1,
      paginate: 10,
      type: "password",
      isEdit: false,
      users: [],
      allUsername: "",
      searchInput: "",
      selectedRole: "",
      adminFilter: false,
      deputyAdminFilter: false,
      memberFilter: false,
      confirmPassword: "",
      account_id: "",
      ths: ["No", "First Name", "Last Name", "Username", "Email", "Role"],
      form: {
        id: "",
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        adminPassword: "",
        role: "",
      },
    };
  },
  methods: {
    ...mapActions(["getAccountsToSite", "getRolesToSite"]),
    startAction(conPass) {
      this.form.adminPassword = conPass;
      if (this.isEdit) {
        this.editAccount();
      } else {
        this.createAccount();
      }
    },
    toggleToPrompt() {
      this.showPrompt = true;
    },
    togglePassword() {
      if (this.type === "password") {
        this.type = "text";
      } else if (this.type === "text") {
        this.type = "password";
      }
    },
    filterAdmin() {
      this.deputyAdminFilter = false;
      this.memberFilter = false;
      this.adminFilter = !this.adminFilter;
      if (this.adminFilter) {
        this.selectedRole = this.getAllRoles[0].role_id;
      } else {
        this.selectedRole = null;
      }
    },
    filterDeputyAdmin() {
      this.adminFilter = false;
      this.memberFilter = false;
      this.deputyAdminFilter = !this.deputyAdminFilter;
      if (this.deputyAdminFilter) {
        this.selectedRole = this.getAllRoles[1].role_id;
      } else {
        this.selectedRole = null;
      }
    },
    filterMember() {
      this.adminFilter = false;
      this.deputyAdminFilter = false;
      this.memberFilter = !this.memberFilter;
      if (this.memberFilter) {
        this.selectedRole = this.getAllRoles[2].role_id;
      } else {
        this.selectedRole = null;
      }
    },
    toggleEditAccount(editAccount) {
      window.scrollTo(0, 0);
      this.isEdit = !this.isEdit;
      if (this.isEdit == true) {
        document.getElementById("username").readOnly = true;
        this.form.id = editAccount.account_id;
        this.form.name = editAccount.first_name;
        this.form.surname = editAccount.last_name;
        this.form.username = editAccount.username;
        this.form.email = editAccount.email;
        this.form.role = editAccount.role_id;
      } else {
        document.getElementById("username").readOnly = false;
        this.form.id = "";
        this.form.name = "";
        this.form.surname = "";
        this.form.username = "";
        this.form.email = "";
        this.form.password = "";
        this.form.role = "";
      }
    },
    // in the table
    deleteAccount(id) {
      if (confirm("Do you really want to delete? 😲")) {
        this.$store.dispatch("deleteAccountByAdmin", id);
      }
    },
    editAccount() {
      if (this.useFormerPassword) {
        this.form.password = "";
      }
      if (this.editFormIsValidLast && this.checkUniqueUsername != true) {
        const index = this.getAllUsers.findIndex(
          (account) => account.account_id == this.form.id
        );
        if (index !== -1) {
          const editAccount = {
            account_id: this.form.id,
            first_name: this.form.name,
            last_name: this.form.surname,
            username: this.form.username,
            email: this.form.email,
            userPassword: this.form.password,
            adminPassword: this.form.adminPassword,
            role_id: this.form.role,
          };
          let user = JSON.parse(localStorage.getItem("user"));
          const jsonEditAccount = JSON.stringify(editAccount, {
            type: "application/json",
          });
          fetch(
            this.$store.state.accountActionURL + "/" + editAccount.account_id,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + user.token,
              },
              body: jsonEditAccount,
            }
          )
            .then((response) => {
              if (response.status === 200) {
                this.$store.getters.getAccounts.splice(index, 1, editAccount);
                this.successData = "Editing user " + editAccount.username;
                this.successToAdd = true;
              } else {
                alert("❌Invalid admin password❌");
              }
            })
            .catch((err) => console.log(err));
          this.isEdit = false;
          this.form.account_id = "";
          this.form.name = "";
          this.form.surname = "";
          this.form.username = "";
          this.form.email = "";
          this.form.password = "";
          this.form.adminPassword = "";
          this.form.role = "";
          this.showPrompt = false;
          setTimeout(
            () => ((this.successToAdd = false), (this.successData = "")),
            2500
          );
        }
      } else {
        this.form.password = "";
        this.form.adminPassword = "";
        this.failedCreate = true;
        this.showPrompt = false;
      }
    },
    createAccount() {
      if (this.editFormIsValidLast && this.checkUniqueUsername != true) {
        const newAccount = {
          first_name: this.form.name,
          last_name: this.form.surname,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          role_id: this.form.role,
          adminPassword: this.form.adminPassword,
        };
        const jsonAccount = JSON.stringify(newAccount, {
          type: "application/json",
        });
        let user = JSON.parse(localStorage.getItem("user"));
        fetch(this.$store.state.accountAddURL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: jsonAccount,
        })
          .then((res) => {
            if (res.status == 400) {
              this.$store.dispatch("auth/logout");
              router.push("/sign-up");
            }
            if (res.status == 403) {
              alert("❌Invalid admin password❌");
            }
            if (res.status == 200) {
              this.getAllUsers.push(newAccount);
              this.successData = "Adding user " + newAccount.username;
              this.successToAdd = true;
              this.current = 1;
              // this.$router.go();
            }
          })
          .catch((err) => console.log(err));
        this.form.name = "";
        this.form.surname = "";
        this.form.username = "";
        this.form.email = "";
        this.form.password = "";
        this.form.role = "";
        this.form.adminPassword = "";
        this.showPrompt = false;
        setTimeout(
          () => ((this.successToAdd = false), (this.successData = "")),
          2500
        );
      } else {
        this.form.password = "";
        this.form.adminPassword = "";
        this.failedCreate = true;
        this.showPrompt = false;
      }
    },
    // in list compo
    handleDelete(id) {
      this.getAllUsers = this.getAllUsers.filter((user) => {
        return user.account_id != id;
      });
    },
    handleEdit(user) {
      this.toggleEditAccount(user);
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
      let table = document.querySelector("#table");
      window.scrollTo(0, table.offsetTop);
    },
  },
  computed: mapGetters(["getAccounts", "getRoles"]),
  computed: {
    getAllUsers() {
      this.account_id = jwtDecrypt(
        JSON.parse(localStorage.getItem("user")).token
      ).account_id;
      if (this.searchInput && this.selectedRole) {
        return this.$store.getters.getAccounts.filter((user) => {
          return (
            // user.account_id != this.account_id &&
            user.role_id == this.selectedRole &&
            user.username.toLowerCase().includes(this.searchInput)
          );
        });
      } else if (this.selectedRole) {
        return this.$store.getters.getAccounts.filter((user) => {
          return (
            user.role_id == this.selectedRole &&
            user.account_id != this.account_id
          );
        });
      } else if (this.searchInput) {
        return this.$store.getters.getAccounts.filter((user) => {
          return (
            user.username.toLowerCase().includes(this.searchInput) &&
            user.account_id != this.account_id
          );
        });
      }
      // return this.$store.getters.getAccounts.filter((user) => {
      //   return user.account_id != this.account_id;
      // });
      return this.$store.getters.getAccounts;
    },
    getAllRoles() {
      return this.$store.getters.getRoles;
    },
    getAdminRoles() {
      return this.$store.getters.getRoles.filter((roles) => {
        return roles.role_name != "member";
      });
    },
    editNameIsValid() {
      return !!this.form.name && this.form.name.length <= 50;
    },
    editSurnameIsValid() {
      return !!this.form.surname && this.form.surname.length <= 50;
    },
    editUsernameIsValid() {
      return !!this.form.username && this.form.username.length <= 40;
    },
    noSpecialChars() {
      return (
        !this.form.username.includes("&") &&
        !this.form.username.includes(",") &&
        !this.form.username.includes("<") &&
        !this.form.username.includes(">")
      );
    },
    editEmailIsValid() {
      return (
        !!this.form.email &&
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          this.form.email
        )
      );
    },
    isPasswordValid() {
      return !!this.form.password;
    },
    editPasswordIsValid() {
      if (this.useFormerPassword) {
        return true;
      }
      return !!this.form.password;
    },
    editAdminPasswordIsValid() {
      return !!this.form.adminPassword;
    },
    isPasswordLenght() {
      return this.form.password.length >= 8;
    },
    isPasswordIncludeUppercase() {
      return /[A-Z]/.test(this.form.password);
    },
    isPasswordIncludeLowercase() {
      return /[a-z]/.test(this.form.password);
    },
    isPasswordIncludeNumber() {
      return /[0-9]/.test(this.form.password);
    },
    isPasswordIncludeSpecial() {
      return /[_#?!@$%^&*-]/.test(this.form.password);
    },
    checkStronPassword() {
      return (
        this.isPasswordIncludeSpecial &&
        this.isPasswordIncludeNumber &&
        this.isPasswordIncludeLowercase &&
        this.isPasswordIncludeUppercase &&
        this.isPasswordLenght
      );
    },
    editRoleIsValid() {
      return !!this.form.role;
    },
    checkUniqueUsername() {
      for (let index = 0; index < this.allUsername.length; index++) {
        if (this.isEdit == true) {
          if (
            this.$store.getters.getAccounts[index].account_id != this.form.id &&
            this.allUsername[index].username.toLowerCase() ==
              this.form.username.toLowerCase()
          ) {
            return true;
          }
        } else {
          if (
            this.allUsername[index].username.toLowerCase() ==
            this.form.username.toLowerCase()
          ) {
            return true;
          }
        }
      }
      return false;
    },
    editFormIsValidFirst() {
      if (this.useFormerPassword) {
        return (
          this.editPasswordIsValid &&
          this.editEmailIsValid &&
          this.editUsernameIsValid &&
          this.editSurnameIsValid &&
          this.editNameIsValid &&
          this.noSpecialChars &&
          this.editRoleIsValid
        );
      }
      return (
        this.editPasswordIsValid &&
        this.editEmailIsValid &&
        this.editUsernameIsValid &&
        this.editSurnameIsValid &&
        this.editNameIsValid &&
        this.noSpecialChars &&
        this.editRoleIsValid &&
        this.isPasswordLenght &&
        this.isPasswordLenght &&
        this.isPasswordIncludeUppercase &&
        this.isPasswordIncludeLowercase &&
        this.isPasswordIncludeNumber &&
        this.isPasswordIncludeSpecial
      );
    },
    editFormIsValidLast() {
      return (
        this.editPasswordIsValid &&
        this.editEmailIsValid &&
        this.editUsernameIsValid &&
        this.editSurnameIsValid &&
        this.editNameIsValid &&
        this.noSpecialChars &&
        this.editAdminPasswordIsValid &&
        this.editRoleIsValid
      );
    },
    pageTotal() {
      if (this.getAllUsers) {
        return Math.ceil(this.getAllUsers.length / this.paginate);
      }
    },
  },
  // created() {
  //   this.getAccountsToSite();
  //   this.getRolesToSite();
  // },
  async mounted() {
    window.scrollTo(0, 0);
    await this.getAccountsToSite();
    await this.getRolesToSite();
    fetch(this.$store.state.usernameURL)
      .then((res) => res.json())
      .then((data) => {
        this.allUsername = data.data;
      })
      .catch((err) => console.log(err.message));
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
.Users {
  margin: 3.6rem 0 4.8rem 0;
}

.container {
  margin-bottom: 4.8rem;
}
.grid {
  gap: 3.6rem;
}
.form {
  margin: 0 10%;
  width: 80%;
  background-color: white;
  height: auto;
  /* padding: 2rem 4rem; */
  grid-column: span 2;
  display: grid;
  grid-template-columns: 60fr 40fr;
  column-gap: 2.4rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.add-user {
  display: flex;
  flex-direction: column;
  padding: 4rem 4rem 2rem 2rem;
  height: 100%;
}
.filter {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 60fr 40fr;
  column-gap: 2.4rem;
}
.filter input,
.filter select {
  height: 3.2rem;
  margin-bottom: 0;
  background-color: #fff;
  font-size: 1.4rem;
  font-weight: 300;
}

.filter .role-filter {
  display: flex;
  justify-content: right;
  align-self: center;
}
.filter .role-filter label {
  align-self: center;
  margin-right: 1.2rem;
  margin-bottom: 0;
}
.role-filter-mb {
  display: none;
}
.filter-mb {
  /* width: 3.6rem; */
  height: 3.6rem;
  background-color: #fff;
  font-size: 1.4rem;
  padding: 1rem 1.2rem;
  color: white;
  text-transform: capitalize;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
}
.filter-mb:hover {
  filter: saturate(100%);
}
.List {
  display: none;
}
.table {
  grid-column: span 2;
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
label {
  display: block;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
}

input {
  width: 100%;
  border: none;
  background: rgb(250, 250, 250);
  height: 2.8rem;
  padding: 0 0.8rem;
  color: #333;
  margin-bottom: 2rem;
  height: 3.6rem;
}
input:focus {
  outline: none;
}

input::placeholder {
  color: rgb(85, 85, 85, 0.35);
}
.side-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.side-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.text {
  position: absolute;
  text-align: center;
  top: 50%;
  width: 80%;
  margin: 0 10%;
}
.text .header {
  font-size: 4.2rem;
  color: #fff;
  font-weight: 700;
  text-transform: capitalize;
  font-family: "Libre Baskerville", serif;
  margin-bottom: 1.2rem;
}

.text .info {
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.4;
}
.password {
  position: relative;
}
.password .icon {
  position: absolute;
  right: 5%;
  top: 42%;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  align-self: center;
}
.password .icon:hover {
  color: #333;
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
  margin-top: 1.8rem;
  transition: 0.25s all ease-in-out;
}

.btn--full {
  background-color: #32cd32;
  color: #fff;
}
.btn--full:hover {
  background-color: #3df53d;
}
.cancel-btn {
  background-color: #eb435f;
}
.cancel-btn:hover {
  background-color: #bc364c;
}
label span {
  font-size: 1rem;
  color: #eb435f;
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
/* below 928px */
@media (max-width: 58em) {
  .form {
    column-gap: 0rem;
  }
  .table {
    display: none;
  }
  .List {
    display: inline;
  }
  .add-user {
    padding: 4rem;
  }
}
@media (max-width: 53em) {
  .form {
    display: grid;
    grid-template-columns: 1fr;
    /* height: 72rem; */
  }
  .side-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
}

/* below 680px */
@media (max-width: 43em) {
  .grid--2-cols {
    display: flex;
    flex-direction: column;
  }
  .grid {
    gap: 2.4rem;
  }
  .text .header {
    font-size: 3.2rem;
  }
  .text .info {
    font-size: 1.2rem;
  }
  .filter .search {
    grid-column: span 2;
    width: 80%;
    margin: 0 10%;
  }
  .filter .search {
    grid-row: 1;
  }
  .filter .role-filter {
    display: none;
  }
  .role-filter-mb {
    grid-column: span 2;
    justify-self: center;
    justify-items: center;
    justify-content: center;
    display: flex;
    column-gap: 1.2rem;
    width: 90%;
    margin: 1.2rem 10% 0 10%;
  }
}
/* below 470px */
@media (max-width: 29em) {
  .text .header {
    font-size: 2.4rem;
  }
  .text .info {
    font-size: 1rem;
  }
  .add-user {
    padding: 2rem;
  }
}
.old-password {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 1.4rem 0 2.4rem 0;
}
.old-password label {
  display: inline;
}
input[type="checkbox"] {
  width: auto;
  height: auto;
  margin-bottom: 1rem;
}
.warnings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  background-color: rgb(245, 245, 245);
  padding: 1.2rem 1.4rem;
  border-radius: 0.6rem;
  margin-bottom: 3.6rem;
}
.warning-header {
  font-size: 1.4rem;
  font-weight: 600;
}
.warning {
  font-size: 1.3rem;
  padding-left: 1rem;
}
</style>
