<template>
  <div class="list">
    <div
      class="tab-color"
      :style="[
        user.role_id == 1
          ? { backgroundColor: '#ffd700' }
          : user.role_id == 2
          ? { backgroundColor: '#FF6347' }
          : { backgroundColor: '#9400D3' },
      ]"
    ></div>
    <div class="profile-info">
      <div class="name">
        {{ user.first_name }} {{ user.last_name }}
        <div
          class="role"
          :style="[
            user.role_id == 1
              ? { backgroundColor: '#ffd700' }
              : user.role_id == 2
              ? { backgroundColor: '#FF6347' }
              : { backgroundColor: '#9400D3' },
          ]"
        >
          <div v-if="user.role_id == 1">Admin</div>
          <div v-if="user.role_id == 2">Deputy Admin</div>
          <div v-if="user.role_id == 3">Member</div>
        </div>
      </div>
      <div class="email">
        <i class="icon fas fa-envelope"></i>
        <span>{{ user.email }}</span>
      </div>
      <div class="username">
        <i class="icon fas fa-user"></i> <span>{{ user.username }}</span>
      </div>
      <div class="action-btn">
        <button
          class="btn btn-edit"
          type="submit"
          @click="editAccount"
          v-if="user.role_id != 3"
        >
          <span class="edit-text">edit</span><i class="edit fas fa-pen"></i>
        </button>
        <div class="btn btn-delete" @click="deleteAccount(user.account_id)">
          <span class="delete-text">delete</span
          ><i class="delete fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "List",
  props: ["user"],
  methods: {
    deleteAccount(id) {
      if (confirm("Do you really want to delete? 😲")) {
        this.$store.dispatch("deleteAccount", id);
        this.$emit("deleteAccountById", id);
      }
    },
    editAccount() {
      this.$emit("editAccountById");
    },
  },
};
</script>
<style scoped>
.list {
  width: 100%;
  background-color: white;
  height: auto;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.3s all ease-in-out;
}
.list:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.tab-color {
  width: 1rem;
  background-color: #ffd700;
  height: 100%;
  left: 0;
  position: absolute;
}
.profile-info {
  margin: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.name {
  font-size: 1.8rem;
  font-weight: 700;
  word-spacing: 0.6rem;
  letter-spacing: 0.2rem;
  color: #333;
  display: inline;
  position: relative;
}
.role {
  display: inline;
  font-size: 1.2rem;
  padding: 0.24rem 0.4rem;
  letter-spacing: 0;
  word-spacing: 0;
  border-radius: 0.2rem;
  color: white;
  position: absolute;
  right: 0%;
  text-transform: capitalize;
}
.email,
.username {
  font-size: 1.4rem;
}
.icon {
  color: rgba(85, 85, 85, 0.35);
  margin-right: 0.8rem;
}
.email span,
.username span {
  color: #555;
}
.action-btn {
  display: flex;
  gap: 1.2rem;
  align-self: flex-end;
}
.action-btn .btn {
  background-color: red;
  width: 8.6rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.25s all ease-in-out;
}
.action-btn .btn:hover {
  background-color: rgb(151, 0, 0);
}

.action-btn .btn-edit {
  background-color: transparent;
  color: #333;
}
.action-btn .btn-edit:hover {
  background-color: #333;
  color: #fff !important;
}
.action-btn .delete-text {
  font-size: 1.4rem;
  margin-right: 0.4rem;
  color: #fff;
}
.action-btn .edit-text {
  font-size: 1.4rem;
  margin-right: 0.4rem;
}
.action-btn .delete {
  font-size: 1.2rem;
  color: #fff;
}
.action-btn .edit {
  font-size: 1.2rem;
}
/* below 850px */
@media (max-width: 53em) {
  .profile-info {
    margin: 1.6rem 2.4rem;
  }
  .name {
    font-size: 1.4rem;
  }
  .role {
    font-size: 1rem;
  }
}
/* below 680px */
@media (max-width: 43em) {
  .profile-info {
    margin: 2rem 3.6rem;
  }
  .role {
    font-size: 1.2rem;
  }
}
</style>
