<template>
  <div class="pop-up">
    <div class="success-img">
      <lottie-player
        class="complete"
        v-if="isTrue"
        src="https://assets5.lottiefiles.com/private_files/lf30_yo2zavgg.json"
        background="transparent"
        speed="1"
        style="width: full; height: full;"
        autoplay
      ></lottie-player>
      <lottie-player
        class="fail"
        v-else
        src="https://assets9.lottiefiles.com/packages/lf20_eSd5sJ.json"
        background="transparent"
        speed="1"
        autoplay
      ></lottie-player>
    </div>
    <div
      class="success-text"
      :style="[isTrue ? { color: '#35e08e' } : { color: '#ff4026' }]"
    >
      {{ text }}
    </div>
    <div
      class="btn btn--full"
      :style="[
        isTrue
          ? { backgroundColor: '#35e08e' }
          : { backgroundColor: '#ff4026' },
      ]"
      @click="closePopup"
    >
      ok
    </div>
  </div>
</template>
<script>
export default {
  props: ["text", "isTrue"],
  name: "Popup",
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>
<style scoped>
.pop-up {
  margin: auto;
  width: 44rem;
  height: 32rem;
  background-color: #fff;
  padding: 2.4rem 3.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
  animation-name: appears-from-bottom;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
}
.success-text {
  font-size: 2rem;
  font-weight: 700;
  animation: appears-from-bottom 0.75s 1 ease;
}
.success-img {
  width: 15rem;
  height: 15rem;
  animation: appears-from-bottom 0.75s 1 ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.success-img img {
  width: 100%;
  height: 100%;
}
.pop-up .btn--full {
  background-color: #35e08e;
}
.pop-up .btn--full:hover {
  filter: saturate(2);
}
.btn--full,
.btn--full:visited {
  width: 26rem;
  color: white;
  transition: 0.3s all ease-in-out;
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
  margin-top: 1.6rem;
  border-radius: 2.4rem;
}
.fail {
  width: 10.4rem;
  height: 10.4rem;
}

/* below 800px */
@media (max-width: 50em) {
  .pop-up {
    width: 36rem;
    height: 24rem;
    padding: 2.2rem 3.4rem;
    row-gap: 0;
  }
  .success-text {
    font-size: 1.6rem;
  }
  .success-img {
    width: 12rem;
    height: 12rem;
  }
  .btn,
  .btn:link,
  .btn:visited {
    margin-top: 1.2rem;
  }
  /* below 470px */
  @media (max-width: 29em) {
    .pop-up {
      width: 30rem;
      height: 18rem;
      padding: 1.8rem 2.8rem;
    }
    .success-text {
      font-size: 1.2rem;
    }
    .success-img {
      width: 10rem;
      height: 10rem;
    }
    .fail {
      width: 6rem;
      height: 6rem;
    }
    .complete{
      width: 7.4rem;
      height: 7.4rem;
    }
    .btn,
    .btn:link,
    .btn:visited {
      margin-top: 0.8rem;
    }
  }
}
</style>
