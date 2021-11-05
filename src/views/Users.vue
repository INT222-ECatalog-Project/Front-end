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
              />
            </div>
            <div class="email">
              <label for="email"
                >Email
                <span v-if="!editEmailIsValid">*required</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="example@mail.com"
                v-model="form.email"
              />
            </div>
            <div class="password">
              <label for="password"
                >Password
                <span v-if="!editPasswordIsValid"
                  >*required at least 8 chars</span
                >
                <span
                  :style="{ color: '#FFD700' }"
                  v-if="form.password.length >= 8 && form.password.length < 10"
                  >good</span
                >
                <span
                  :style="{ color: '#32CD32' }"
                  v-if="form.password.length >= 10"
                  >excellent</span
                >
              </label>
              <input
                :type="type"
                id="password"
                name="password"
                placeholder="*********"
                v-model="form.password"
                :style="[
                  form.password.length <= 0
                    ? { backgroundColor: '' }
                    : form.password.length < 8
                    ? { backgroundColor: '#f9cede' }
                    : form.password.length >= 8 && form.password.length < 10
                    ? { backgroundColor: '#fff7cc' }
                    : { backgroundColor: '#d6f5d6' },
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
            <div class="role">
              <label for="role"
                >Role
                <span v-if="!editRoleIsValid">*required</span>
              </label>
              <select name="role" id="role" v-model="form.role">
                <option value="" selected>none</option>
                <option
                  :value="role"
                  v-for="role in getAdminRoles"
                  :key="role.id"
                  >{{ role.role_name }}</option
                >
              </select>
            </div>
            <button
              class="btn btn--full"
              v-if="isEdit == false"
              type="submit"
              @click="createAccount"
              :style="[
                editFormIsValid
                  ? {}
                  : { backgroundColor: '#707070', cursor: 'not-allowed' },
              ]"
            >
              Add
            </button>
            <button
              class="btn btn--full edit-btn"
              v-if="isEdit"
              type="submit"
              @click="editAccount"
              :style="[
                editFormIsValid
                  ? {}
                  : { backgroundColor: '#707070', cursor: 'not-allowed' },
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
                :key="role.id"
                :value="role.role_name"
                >{{ role.role_name }}</option
              >
            </select>
          </div>
          <div class="role-filter-mb">
            <div
              class="filter-mb admin-filter"
              :style="[
                adminFilter == true || selectedRole == 'Admin'
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
                deputyAdminFilter == true || selectedRole == 'Deputy Admin'
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
                memberFilter == true || selectedRole == 'Member'
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
            v-for="user in getAllUsers"
            :key="user.id"
            :user="user"
            @deleteAccountById="handleDelete"
            @editAccountById="toggleEditAccount(user)"
          ></List>
        </transition-group>
        <transition-group name="slide-fade">
          <Table :ths="ths" class="table" :key="ths">
            <tbody v-for="(user, index) in getAllUsers" :key="user.id">
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.password }}</td>
                <td>{{ user.role.role_name }}</td>
                <td>
                  <div
                    class="delete"
                    @click="deleteAccount(user.id)"
                    :style="{ display: 'inline' }"
                  >
                    Delete
                  </div>
                  |
                  <div
                    class="edit"
                    @click="toggleEditAccount(user)"
                    :style="{ display: 'inline' }"
                  >
                    Edit
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <!-- -------- -->
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
import List from "@/components/List.vue";
import Table from "@/components/Table.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Users",
  components: {
    Socials,
    Footer,
    List,
    Table,
  },
  data() {
    return {
      type: "password",
      isEdit: false,
      users: [],
      searchInput: "",
      selectedRole: "",
      adminFilter: false,
      deputyAdminFilter: false,
      memberFilter: false,
      ths: [
        "No",
        "First Name",
        "Last Name",
        "Username",
        "Email",
        "Password",
        "Role",
      ],
      form: {
        id: "",
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    ...mapActions(["getAccountsToSite", "getRolesToSite"]),
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
        this.selectedRole = this.getAllRoles[0].role_name;
      } else {
        this.selectedRole = null;
      }
    },
    filterDeputyAdmin() {
      this.adminFilter = false;
      this.memberFilter = false;
      this.deputyAdminFilter = !this.deputyAdminFilter;
      if (this.deputyAdminFilter) {
        this.selectedRole = this.getAllRoles[1].role_name;
      } else {
        this.selectedRole = null;
      }
    },
    filterMember() {
      this.adminFilter = false;
      this.deputyAdminFilter = false;
      this.memberFilter = !this.memberFilter;
      if (this.memberFilter) {
        this.selectedRole = this.getAllRoles[2].role_name;
      } else {
        this.selectedRole = null;
      }
    },
    toggleEditAccount(editAccount) {
      window.scrollTo(0, 0);
      this.isEdit = !this.isEdit;
      if (this.isEdit == true) {
        this.form.id = editAccount.id;
        this.form.name = editAccount.first_name;
        this.form.surname = editAccount.last_name;
        this.form.username = editAccount.username;
        this.form.email = editAccount.email;
        this.form.password = editAccount.password;
        this.form.role = editAccount.role;
      } else {
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
        this.$store.dispatch("deleteAccount", id);
      }
    },
    editAccount() {
      if (this.editFormIsValid) {
        const index = this.getAllUsers.findIndex(
          (account) => account.id == this.form.id
        );
        if (index !== -1) {
          const editAccount = {
            id: this.form.id,
            first_name: this.form.name,
            last_name: this.form.surname,
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            role: this.form.role,
          };
          // console.log(this.form.id);
          this.getAllUsers.splice(index, 1, editAccount);
          // console.log(this.queryUsers);
          this.$store.dispatch("editAccount", editAccount);
          this.isEdit = false;
          this.form.id = "";
          this.form.name = "";
          this.form.surname = "";
          this.form.username = "";
          this.form.email = "";
          this.form.password = "";
          this.form.role = "";
        }
      } else {
      }
    },
    createAccount() {
      if (this.editFormIsValid) {
        const newAccount = {
          first_name: this.form.name,
          last_name: this.form.surname,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          role: this.form.role,
        };
        this.$store
          .dispatch("createAccount", newAccount)
          .catch((err) => console.log(err));
        this.form.name = "";
        this.form.surname = "";
        this.form.username = "";
        this.form.email = "";
        this.form.password = "";
        this.form.role = "";
      } else {
      }
    },
    // in card compo
    handleDelete(id) {
      this.getAllUsers = this.getAllUsers.filter((user) => {
        return user.id != id;
      });
    },
    handleEdit(user){
    }
  },
  computed: mapGetters(["getAccounts", "getRoles"]),
  computed: {
    getAllUsers() {
      if (this.searchInput || this.selectedRole) {
        return this.$store.getters.getAccounts.filter((user) => {
          return (
            user.role.role_name
              .toLowerCase()
              .includes(this.selectedRole.toLowerCase()) &&
            user.username.toLowerCase().includes(this.searchInput)
          );
        });
      }
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
    // queryUsers() {
    //   return this.getAllUsers.filter((user) => {
    //     return (
    //       user.role.role_name
    //         .toLowerCase()
    //         .includes(this.selectedRole.toLowerCase()) &&
    //       user.username.toLowerCase().includes(this.searchInput)
    //     );
    //   });
    // },
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
      return !!this.form.email;
    },
    editPasswordIsValid() {
      return !!this.form.password && this.form.password.length >= 8;
    },
    editRoleIsValid() {
      return !!this.form.role;
    },
    editFormIsValid() {
      return (
        this.editPasswordIsValid &&
        this.editEmailIsValid &&
        this.editUsernameIsValid &&
        this.editSurnameIsValid &&
        this.editNameIsValid &&
        this.noSpecialChars &&
        this.editRoleIsValid
      );
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
  },
};
</script>
<style scoped>
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
  background-color: rgb(230, 230, 230);
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
</style>
