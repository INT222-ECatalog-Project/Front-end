<template>
  <div class="prompt">
    <div class="prompt-header">
      Please inform your password
    </div>
    <div class="prompt-content">
      You about to create/edit [{{ username }}] - [{{ getRoleName }}] profile
    </div>
    <div class="prompt-input">
      <input
        :type="type"
        id="password-prompt"
        name="password-prompt"
        placeholder="Enter your password"
        v-model="confirmPassword"
      />
      <div class="btn-eye" @click="togglePassword">
        <div
          :style="[type === 'text' ? { display: 'none' } : { display: 'flex' }]"
        >
          <i class="fas fa-eye icon"></i>
        </div>
        <div
          :style="[type !== 'text' ? { display: 'none' } : { display: 'flex' }]"
        >
          <i class="fas fa-eye-slash icon"></i>
        </div>
      </div>
    </div>
    <div class="action-btn">
      <div
        class="btn btn--full"
        @click="confirmPrompt"
        :style="[
          isConfirmPasswordValid
            ? {}
            : {
                backgroundColor: '#707070',
                cursor: 'not-allowed',
                pointerEvents: 'none',
              },
        ]"
      >
        Confirm Edit
      </div>
      <div class="btn btn--ghost" @click="close">
        Cancel
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["username", "role"],
  data() {
    return {
      type: "password",
      confirmPassword: "",
      role_name: "",
    };
  },
  computed: {
    isConfirmPasswordValid() {
      return !!this.confirmPassword && this.confirmPassword.length >= 8;
    },
    getRoleName() {
      return (this.role_name = this.role == 1 ? "Admin" : "Deputy Admin");
    },
  },
  methods: {
    togglePassword() {
      if (this.type === "password") {
        this.type = "text";
      } else if (this.type === "text") {
        this.type = "password";
      }
    },
    confirmPrompt() {
      this.$emit("sendConfirmPassword", this.confirmPassword);
    },
    close() {
      this.$emit("closePrompt");
    },
  },
};
</script>

<style scoped>
.prompt {
  margin: auto;
  max-width: 46rem;
  height: 30rem;
  background-color: #fff;
  padding: 2rem 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
  animation-name: appears-from-bottom;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
}
.prompt input {
  width: 28rem;
}
.prompt-header {
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 700;
  animation: appears-from-bottom 0.75s 1 ease;
}
.prompt-content {
  font-size: 1.4rem;
  color: rgb(150, 150, 150);
}
.action-btn {
  display: flex;
  gap: 1rem;
}
.btn--full {
  align-self: center;
  background-color: #35e08e;
}
.btn--full:hover {
  filter: saturate(2);
}
.btn--full,
.btn--full:visited {
  color: white;
  transition: 0.3s all ease-in-out;
}

.btn,
.btn:link,
.btn:visited {
  font-family: "Lato", sans-serif !important;
  text-align: center;
  width: fit-content;
  display: inline-block;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1.2rem 2.4rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 1rem;
}
.btn--ghost {
  align-self: center;
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
input {
  width: 100%;
  border: none;
  background: rgb(250, 250, 250);
  height: 2.8rem;
  padding: 0 0.8rem;
  color: #333;
  height: 3.6rem;
}
input:focus {
  outline: none;
}

input::placeholder {
  color: rgb(85, 85, 85, 0.35);
}
.prompt-input {
  position: relative;
}
.prompt-input .icon {
  position: absolute;
  right: 5%;
  top: 35%;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  align-self: center;
}
.prompt-input .icon:hover {
  color: #333;
}
/* below 800px */
@media (max-width: 50em) {
  .prompt {
    width: 36rem;
    padding: 1.8rem 2rem;
  }
  .prompt-header {
    font-size: 1.6rem;
  }
  .btn,
  .btn:link,
  .btn:visited {
    margin-top: 1.2rem;
  }
  /* below 470px */
  @media (max-width: 29em) {
    .prompt {
      padding: 1.2rem 1.6rem;
    }
    .btn,
    .btn:link,
    .btn:visited {
      margin-top: 0.8rem;
    }
  }
}
</style>
