<template>
  <table>
    <thead>
      <tr>
        <th v-for="th in ths" :key="th">{{ th }}</th>
        <th v-if="isAdmin">Actions</th>
      </tr>
    </thead>
    <slot></slot>
  </table>
</template>
<script>
export default {
  name: "Table",
  props: ["ths"],
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
}
};
</script>
<style scoped>
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
