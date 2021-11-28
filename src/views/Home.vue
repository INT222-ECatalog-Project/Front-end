<template>
  <div class="home">
    <section
      class="section section-header"
      :style="{
        'background-image': 'url(' + bgImages[cursorBgImage].imgSrc + ')',
      }"
    >
      <div class="space">
        <div class="box-product" @click="changeImg(2)">
          <div class="box-details">
            <div class="img-box">
              <img
                :src="bgImages[1].imgSrc"
                alt="pic of women in white uniform"
                :style="[
                  cursorBgImage != 1 ? { filter: 'grayscale(100%)' } : {},
                ]"
              />
            </div>
            <div class="text-bg">
              {{ bgImages[1].text }} {{ bgImages[1].textBr }}
            </div>
          </div>
        </div>
        <div class="box-product" @click="changeImg(3)">
          <div class="box-details">
            <div class="img-box">
              <img
                :src="bgImages[2].imgSrc"
                alt="pic of women in red uniform"
                :style="[
                  cursorBgImage != 2 ? { filter: 'grayscale(100%)' } : {},
                ]"
              />
            </div>
            <div class="text-bg">{{ bgImages[2].textSpan }}</div>
          </div>
        </div>
        <div class="box-product" @click="changeImg(4)">
          <div class="box-details">
            <div class="img-box">
              <img
                :src="bgImages[3].imgSrc"
                alt="pic of women in 90's uniform"
                :style="[
                  cursorBgImage != 3 ? { filter: 'grayscale(100%)' } : {},
                ]"
              />
            </div>
            <div class="text-bg">
              {{ bgImages[3].textBr }} {{ bgImages[3].textSpan }}
            </div>
          </div>
        </div>
      </div>
      <div class="hero">
        <div class="header-text">
          <div
            class="sub-heading"
            :style="[
              cursorBgImage == 2 || cursorBgImage == 3
                ? { color: 'white' }
                : {},
            ]"
          >
            new collection
          </div>
          <div class="hero-header">
            <h3
              class="header"
              :style="[
                cursorBgImage == 2 || cursorBgImage == 3
                  ? { color: 'white' }
                  : {},
              ]"
            >
              {{ bgImages[cursorBgImage].text }} <br />{{
                bgImages[cursorBgImage].textBr
              }}
              <br />
              <div class="wrapper">
                <span class="typing-demo" :style="cssVar">{{
                  bgImages[cursorBgImage].textSpan
                }}</span>
              </div>
            </h3>
          </div>
          <div
            class="hero-text"
            :style="[
              cursorBgImage == 2 || cursorBgImage == 3
                ? { color: 'white' }
                : {},
            ]"
          >
          NerdyStyle is a cloth catalog, 
          which includes many cooperated high-end brands such as UNIQLO, CC-OO, ZARA, and H&amp;M.
          </div>
          <div class="button">
            <router-link class="btn btn--full" to="/sign-up">Get yours</router-link>
            <a href="#arrivals" class="btn btn--ghost">Learn more &darr;</a>
          </div>
        </div>
      </div>
      <div class="icon-scroll"></div>
    </section>

    <section class="section section-features">
      <div class="container">
        <div class="tertiary-header">Co-operating Brands</div>
        <div class="brand-logos">
          <img
            class="logo"
            src="../../src/assets/images/brand-logos/uniqlo-logo.jpg"
            alt="UNIQLO Logo"
          />
          <img
            class="logo"
            src="../../src/assets/images/brand-logos/CC-OO.jpg"
            alt="CC-OO Logo"
          />
          <img
            class="logo"
            src="../../src/assets/images/brand-logos/zara-logo.jpg"
            alt="ZARA Logo"
          />
          <img
            class="logo"
            src="../../src/assets/images/brand-logos/HM.png"
            alt="H&amp;M Logo"
          />
        </div>
      </div>
    </section>

    <section class="section section-new" id="section-new">
      <div class="container">
        <div class="sub-heading">check it out</div>
        <div class="secondary-header" id="arrivals">New Arrivals</div>
        <div class="new-info">
          <div class="new-header">
            <div class="figure">
              <img
                class="new-header-img"
                id="new-header-img"
                src="../../src/assets/images/section-new-header.jpg"
                alt="Header Image of Beautiful model"
              />
            </div>
            <div class="new-ads">
              <div class="new-header-text">Got matchy-matchy from ฿599</div>
              <div class="new sub-heading">
                We're totally set on (basic) sets.
              </div>
              <div class="btn-new">
                <router-link class="btn btn--full" to="/stores"
                  >Shop now</router-link
                >
              </div>
            </div>
            <div class="big-circle"></div>
            <div class="small-circle"></div>
          </div>
          <div class="gallery-category">
            <div class="cards grid grid--2-cols">
              <div class="card" v-if="categories[0].selected">
                <splide :options="options">
                  <splide-slide
                    v-for="slide in getShirts.slice(0, 3)"
                    :key="slide.product_id"
                  >
                    <img
                      @click="goToProductPage(slide.product_id)"
                      :src="urlImages + slide.product_id"
                      alt="Product Images for Shirts"
                      @error="
                        $event.target.src =
                          'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
                      "
                    />
                  </splide-slide>
                </splide>
              </div>
              <div class="card" v-if="categories[1].selected">
                <splide :options="options">
                  <splide-slide
                    v-for="slide in getSweaters.slice(0, 3)"
                    :key="slide.product_id"
                  >
                    <img
                      @click="goToProductPage(slide.product_id)"
                      :src="urlImages + slide.product_id"
                      alt="Product Images for Sweaters"
                      @error="
                        $event.target.src =
                          'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
                      "
                    />
                  </splide-slide>
                </splide>
              </div>
              <div class="card" v-if="categories[2].selected">
                <splide :options="options">
                  <splide-slide
                    v-for="slide in getJackets.slice(0, 3)"
                    :key="slide.product_id"
                  >
                    <img
                      @click="goToProductPage(slide.product_id)"
                      :src="urlImages + slide.product_id"
                      alt="Product Images for Jackets"
                      @error="
                        $event.target.src =
                          'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
                      "
                    />
                  </splide-slide>
                </splide>
              </div>
              <div class="card" v-if="categories[3].selected">
                <splide :options="options">
                  <splide-slide
                    v-for="slide in getCoats.slice(0, 3)"
                    :key="slide.product_id"
                  >
                    <img
                      @click="goToProductPage(slide.product_id)"
                      :src="urlImages + slide.product_id"
                      alt="Product Images for Coats"
                      @error="
                        $event.target.src =
                          'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
                      "
                    />
                  </splide-slide>
                </splide>
              </div>
              <div class="card" v-if="categories[4].selected">
                <splide :options="options">
                  <splide-slide
                    v-for="slide in getPants.slice(0, 3)"
                    :key="slide.product_id"
                  >
                    <img
                      @click="goToProductPage(slide.product_id)"
                      :src="urlImages + slide.product_id"
                      alt="Product Images for Pants"
                      @error="
                        $event.target.src =
                          'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
                      "
                    />
                  </splide-slide>
                </splide>
              </div>
              <div class="card" v-if="categories[5].selected">
                <splide :options="options">
                  <splide-slide
                    v-for="slide in getDresses.slice(0, 3)"
                    :key="slide.product_id"
                  >
                    <img
                      @click="goToProductPage(slide.product_id)"
                      :src="urlImages + slide.product_id"
                      alt="Product Images for Pants"
                      @error="
                        $event.target.src =
                          'http://www.grand-cordel.com/wp-content/uploads/2015/08/import_placeholder.png'
                      "
                    />
                  </splide-slide>
                </splide>
              </div>
              <div class="categories">
                <div class="tertiary-header">Category:</div>
                <ul class="lists">
                  <li v-for="category in categories" :key="category.id">
                    <a
                      @click="selected(category.id)"
                      :class="category.selected ? 'selected-category' : ''"
                      >{{ category.text }}</a
                    >
                  </li>
                  <li class="see-more">
                    <a @click="$router.push('/stores')"
                      >See more <span>&rarr;</span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="get-app">
          <div class="new-header-text">
            Get the
            <div class="logo"><span>NERDY</span>STYLE</div>
            App
          </div>
          <div class="sub-heading">Keep in touch</div>
          <div class="app-button">
            <a href="#" class="btn btn--ghost">Android</a>
            <a href="#" class="btn btn--ghost">IOS</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-testimonials">
      <div class="container">
        <div class="sub-heading">Testimonials</div>
        <div class="secondary-header">Into new world</div>
        <div class="grid">
          <div class="testimonials">
            <div class="col-left">
              <figure
                class="testimonial"
                v-for="testimonial in testimonials"
                :key="testimonial.id"
                @click="selectedTestimonial(testimonial.id)"
                :style="[
                  testimonial.selected ? { opaity: 1 } : { opacity: 0.5 },
                ]"
              >
                <img
                  class="testimonial-img"
                  alt="Photo of customer Dave Bryson"
                  src="../../src/assets/images/hero-image.jpg"
                />
                <div class="tester-info">
                  <div class="testimonial-name">{{ testimonial.fullname }}</div>
                  <div class="testimonial-info">
                    Lorem ipsum dolor sit amet.
                  </div>
                </div>
              </figure>
            </div>
            <div class="col-right col-right-com">
              <div class="show-feedback">
                <div class="testimonial-header-text">
                  {{ testimonials[cursorTestimonial].headerText }}
                </div>
                <div class="ratings">
                  <div
                    class="stars"
                    v-for="star in testimonials[cursorTestimonial].ratings"
                    :key="star"
                  >
                    <i class="fas fa-star icon" />
                  </div>
                </div>
                <div class="testimonial-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum autem enim corrupti, nisi laborum corporis.
                  Repellendus sapiente natus porro quaerat dolor quo ad
                  doloremque alias hic sit odit nulla itaque recusandae debitis
                  aspernatur, ex eveniet. Magnam eligendi ipsa a qui error,
                  quisquam sed commodi molestias obcaecati nemo nobis, cum
                  fugiat.
                </div>
                <p class="testimonial-name">
                  &mdash; {{ testimonials[cursorTestimonial].fullname }}
                </p>
              </div>
            </div>
            <div class="testimonials-slide">
              <splide :options="options">
                <splide-slide
                  v-for="testimonial in testimonials"
                  :key="testimonial"
                >
                  <div class="col-right">
                    <div class="show-feedback">
                      <div class="testimonial-header-text">
                        {{ testimonial.headerText }}
                      </div>
                      <div class="ratings">
                        <div
                          class="stars"
                          v-for="star in testimonial.ratings"
                          :key="star"
                        >
                          <i class="fas fa-star icon" />
                        </div>
                      </div>
                      <div class="testimonial-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum autem enim corrupti, nisi laborum corporis.
                        Repellendus sapiente natus porro quaerat dolor quo ad
                        doloremque alias hic sit odit nulla itaque recusandae
                        debitis aspernatur, ex eveniet. Magnam eligendi ipsa a
                        qui error, quisquam sed commodi molestias obcaecati nemo
                        nobis, cum fugiat.
                      </div>
                      <p class="testimonial-name">
                        &mdash; {{ testimonial.fullname }}
                      </p>
                    </div>
                  </div>
                </splide-slide>
              </splide>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-about" id="section-about">
      <div class="container">
        <div class="sub-heading">Let's talk</div>
        <div class="secondary-header">About us</div>
        <div class="profile grid">
          <div
            class="profile-img"
            v-if="members[cursorMember - 1].show == true"
          >
            <img :src="members[cursorMember - 1].image" alt="Image of member" />
          </div>
          <div
            class="profile info"
            v-if="members[cursorMember - 1].show == true"
          >
            <div class="name">
              {{ members[cursorMember - 1].lastname }}
              <div class="first-name">{{ members[cursorMember - 1].name }}</div>
            </div>
            <br />
            <div
              class="position"
              v-for="position in members[cursorMember - 1].positions"
              :key="position"
            >
              {{ position + ", " }}
            </div>
            <div class="line-border"></div>
            <div class="text-info">
              {{ members[cursorMember - 1].text }}
            </div>
            <ul class="social-links">
              <li>
                <a class="footer-link" href="#"
                  ><i class="icon fab fa-facebook-square"></i
                ></a>
              </li>
              <li>
                <a class="footer-link" href="#"
                  ><i class="icon fab fa-instagram-square"></i
                ></a>
              </li>
              <li>
                <a class="footer-link" href="#"
                  ><i class="icon fab fa-twitter-square"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="prev-btn" @click="nextMember">
          <i class="fas icon fa-chevron-right"></i>
        </div>
      </div>
    </section>
    <Socials class="socials"></Socials>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Socials from "@/components/Socials.vue";
import Footer from "@/components/Footer.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    Socials,
    Footer,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      urlImages: this.$store.state.defaultUrl + "/image/",
      options: {
        rewind: true,
        gap: "2rem",
        autoplay: "playing",
      },
      cursorBgImage: 0,
      bgImages: [
        {
          id: 1,
          imgSrc: require("../../src/assets/images/header-change-2.jpg"),
          text: "CREATE",
          textBr: "YOUR OWN",
          textSpan: "STYLE.",
        },
        {
          id: 2,
          imgSrc: require("../../src/assets/images/header-img-1.jpg"),
          text: "MIX & ",
          textBr: "MATCH.",
          textSpan: "COMBO.",
        },
        {
          id: 3,
          imgSrc: require("../../src/assets/images/header-img-2.jpg"),
          text: "MAKE",
          textBr: "THEM SO",
          textSpan: "SASSY.",
        },
        {
          id: 4,
          imgSrc: require("../../src/assets/images/header-img-3.jpg"),
          text: "BACK",
          textBr: "TO 90'S",
          textSpan: "VIBES.",
        },
      ],
      cursorMember: 1,
      cursorCategory: 1,
      cursorTestimonial: 0,
      categories: [
        {
          id: 1,
          text: "Shirts",
          selected: true,
        },
        {
          id: 2,
          text: "Sweaters",
          selected: false,
        },
        {
          id: 3,
          text: "Jackets",
          selected: false,
        },
        {
          id: 4,
          text: "Coats",
          selected: false,
        },
        {
          id: 5,
          text: "Pants",
          selected: false,
        },
        {
          id: 6,
          text: "Dresses",
          selected: false,
        },
      ],
      testimonials: [
        {
          id: 1,
          fullname: "Dave Bryson",
          headerText: "Have huge number of product catalogs!",
          ratings: 5,
          selected: true,
        },
        {
          id: 2,
          fullname: "Steve Miller",
          headerText: "NerdyStyle is my life saver! Help me a lot",
          ratings: 4,
          selected: false,
        },
        {
          id: 3,
          fullname: "Ben Hadley",
          headerText: "This site is having freaking cool awesome UI design!",
          ratings: 5,
          selected: false,
        },
      ],
      members: [
        {
          id: 1,
          name: "Noparat",
          lastname: "Prasongdee",
          positions: ["Database", "Devops"],
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil beatae temporibus assumenda delectus sit",
          image: require("../../src/assets/images/teams/saimai.jpg"),
          show: true,
        },
        {
          id: 2,
          name: "Similan",
          lastname: "Klinsmith",
          positions: ["UX/UI", "Front-end"],
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil beatae temporibus assumenda delectus sit",
          image: require("../../src/assets/images/teams/deep.jpg"),
          show: false,
        },
        {
          id: 3,
          name: "Praepanwa",
          lastname: "Tedprasit",
          positions: ["Backend"],
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil beatae temporibus assumenda delectus sit",
          image: require("../../src/assets/images/teams/phaeng.jpg"),
          show: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getProductsToStore"]),
    goToProductPage(id) {
      this.$router.push("/stores/product/" + id);
    },
    changeImg(id) {
      if (id == this.cursorBgImage + 1) {
        this.cursorBgImage = 0;
      } else {
        this.cursorBgImage = id - 1;
      }
    },
    selected(id) {
      this.cursorCategory = id - 1;
      for (let index = 0; index < this.categories.length; index++) {
        if (this.categories[index].selected === true) {
          this.categories[index].selected = false;
        }
      }
      this.categories[id - 1].selected = true;
    },
    selectedTestimonial(id) {
      this.cursorTestimonial = id - 1;
      for (let index = 0; index < this.testimonials.length; index++) {
        if (this.testimonials[index].selected === true) {
          this.testimonials[index].selected = false;
        }
      }
      this.testimonials[id - 1].selected = true;
    },
    nextMember() {
      this.cursorMember++;
      for (let index = 0; index < this.members.length; index++) {
        if (this.members[index].show === true) {
          this.members[index].show = false;
        }
      }
      if (this.cursorMember > this.members.length) {
        this.cursorMember = 1;
      }
      this.members[this.cursorMember - 1].show = true;
    },
  },
  computed: mapGetters(["getProducts"]),
  computed: {
    getAllproducts() {
      this.$store.getters.getProducts.sort( ( a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
        });
      return this.$store.getters.getProducts;
    },
    getShirts() {
      return this.getAllproducts.filter((product) => {
        return (
          product.category.category_name.toLowerCase() ==
          this.categories[0].text.toLowerCase()
        );
      });
    },
    getSweaters() {
      return this.getAllproducts.filter((product) => {
        return (
          product.category.category_name.toLowerCase() ==
          this.categories[1].text.toLowerCase()
        );
      });
    },
    getJackets() {
      return this.getAllproducts.filter((product) => {
        return (
          product.category.category_name.toLowerCase() ==
          this.categories[2].text.toLowerCase()
        );
      });
    },
    getCoats() {
      return this.getAllproducts.filter((product) => {
        return (
          product.category.category_name.toLowerCase() ==
          this.categories[3].text.toLowerCase()
        );
      });
    },
    getPants() {
      return this.getAllproducts.filter((product) => {
        return (
          product.category.category_name.toLowerCase() ==
          this.categories[4].text.toLowerCase()
        );
      });
    },
    getDresses() {
      return this.getAllproducts.filter((product) => {
        return (
          product.category.category_name.toLowerCase() ==
          this.categories[5].text.toLowerCase()
        );
      });
    },
    cssVar() {
      return {
        width: this.bgImages[this.cursorBgImage].textSpan.length + 1 + "ch",
        // width: 6 + "ch",
      };
    },
  },
  created() {
    this.getProductsToStore();
  },
  mounted() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", function() {
      if (window.location.pathname == "/") {
        let newArrivals = document.getElementById("arrivals");
        let news = document.querySelector(".new-info");
        let about = document.querySelector(".section-about");
        let info = document.querySelector(".info");
        let profileImg = document.querySelector(".profile-img");
        let testimonial = document.querySelector(".testimonial");
        if (window.pageYOffset > newArrivals.offsetTop / 2) {
          news.style.opacity = 1;
        } else if (window.pageYOffset <= newArrivals.offsetTop / 2) {
          news.style.opacity = 0;
        }
        if (window.pageYOffset >= about.offsetTop / 2) {
          info.style.opacity = 1;
          profileImg.style.opacity = "1";
        } else if (window.pageYOffset <= about.offsetTop / 2) {
          info.style.opacity = 0;
          profileImg.style.opacity = 0;
        }
        if (window.pageYOffset >= testimonial.offsetTop / 2) {
          testimonial.style.opacity = 1;
        } else {
          testimonial.style.opacity = 1;
        }
      }
    });
  },
};
</script>

<style scoped>
/*--------------------------- 
HEADER SECION
--------------------------- */
.home {
  margin-top: 0;
  max-width: 100%;
}
.section-header {
  margin: 0 0 9.6rem 0;
  max-width: 100%;
  height: 72rem;
  display: grid;
  grid-template-columns: 3fr 4fr;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.space {
  width: 80%;
  margin: 10rem 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  gap: 1.4rem;
}
.space .box-product {
  width: 24rem;
  height: 12rem;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  animation-name: appears-from-left;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}
.space .box-product:hover {
  transform: scale(1.025);
}
.space .box-product:hover .text-bg {
  display: flex;
}
.space .box-product:hover .img-box img {
  opacity: 0.7;
}
.space .box-product:hover .img-box {
  background: rgba(238, 156, 167, 0.5);
  background: -webkit-linear-gradient(
    to top,
    #ffdde1,
    rgba(238, 156, 167, 0.5)
  );
  background: linear-gradient(to top, #ffdde1, rgba(238, 156, 167, 0.5));
}
.box-product .box-details {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.box-product .box-details .text-bg {
  position: absolute;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 700;
  display: none;
}
.box-product .box-details .img-box {
  width: 100%;
  height: 12rem;
}
.box-product .box-details .img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery {
  display: grid;
  grid-template-columns: 90fr 10fr;
}
.gallery .show-img {
  margin-top: 3.6rem;
  align-self: center;
  text-align: end;
  height: 50rem;
  width: 100%;
  position: relative;
}
.gallery .show-img img {
  width: 80%;
  height: 100%;
  object-fit: cover;
  justify-self: center;
  animation-name: appears-from-bottom;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
.show-img {
  position: relative;
}
.slot-images {
  flex-direction: column;
  width: 100%;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-left: 1.2rem;
  position: relative;
}
.slot-images img {
  width: 4.8rem;
  height: 4.8rem;
  object-fit: cover;
  cursor: pointer;
}
.hero {
  width: 80%;
  justify-self: center;
  text-align: start;
  align-self: center;
}
.hero.big-circle {
  animation-duration: 1s;
  animation-delay: 0.5s;
}
.header-text {
  animation-name: appears-from-right;
  animation-duration: 1.2s;
  animation-iteration-count: 1;
}
.hero-header {
  width: 100%;
  text-transform: uppercase;
  color: #333;
}
.header {
  font-family: "Libre Baskerville", serif;
  font-weight: 700;
  font-size: 6.4rem;
  line-height: 1.2;
  letter-spacing: 0.2rem;
  margin-bottom: 2.4rem;
}
.hero-header span {
  color: #eb435f;
}
.wrapper {
  display: flex;
  align-items: center;
}
.typing-demo {
  animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
}
.hero-text {
  width: 80%;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 0.2rem;
  margin-bottom: 2.4rem;
}
.btn,
.btn:link,
.btn:visited {
  display: inline-block;
  text-decoration: none;
  font-size: 2rem;
  padding: 1.2rem 2.4rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  font-family: inherit;
}
.btn--full:link,
.btn--full:visited {
  margin-right: 2.4rem;
  background-color: #eb435f;
  color: white;
  transition: 0.3s all ease-in-out;
}
.btn--full:hover,
.btn--full:active {
  background-color: #bc364c;
}
.btn--ghost:link,
.btn--ghost:visited {
  box-shadow: inset 0 0 0 1px #eb435f;
  color: #eb435f;
  transition: 0.3s all ease-in-out;
}
.btn--ghost:hover,
.btn--ghost:active {
  background-color: #bc364c;
  color: #e7e3e0;
  box-shadow: none;
}
.gray-img {
  filter: grayscale(1);
}
.image-small {
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
  transition: 0.3s all ease-in-out;
}
.image-small img {
  transition: 0.3s all ease-in-out;
}
.image-small img:hover {
  transform: scale(1.25);
  filter: grayscale(0);
}

/*--------------------------- 
CO-OP BRANDS FEATURE SECION
--------------------------- */
.brand-logos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  margin-top: 4.8rem;
}
.brand-logos img {
  width: 7.2rem;
  height: auto;
  filter: grayscale(1);
  opacity: 0.75;
}

/*--------------------------- 
NEW SECION
--------------------------- */
.section-new {
  margin-top: 3.6rem;
}
.new-info {
  opacity: 0;
  transition: 1s all;
}
.new-header {
  position: relative;
  overflow: hidden;
}
.new-header img {
  overflow: hidden;
  width: 90%;
  margin: 2.4rem 5%;
  transition: 0.25s all ease-in-out;
}
.new-header img:hover {
  filter: saturate(125%);
}
.new-ads {
  position: absolute;
  width: 90%;
  margin: 0 5%;
  transform: translateY(-18rem);
}
.new-header-text {
  text-align: center;
  width: 100%;
  margin-bottom: 1.2rem;
  font-size: 3.6rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  word-spacing: 0.8rem;
}
.new {
  text-align: center;
  width: 100%;
  color: white;
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
}
.btn-new {
  text-align: center;
}
.cards {
  width: 80%;
  margin: 3.6rem 10%;
  height: 48rem;
}
.cards.grid--2-cols {
  grid-template-columns: 2fr 1fr;
}
.card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.card img {
  width: 100%;
  height: 48rem;
  object-fit: cover;
  transition: 0.3s all ease-in-out;
}
.card img:hover {
  transform: scale(1.05);
}
.categories {
  border-left: 0.5px solid rgba(85, 85, 85, 0.25);
  padding-left: 4.8rem;
  position: relative;
  overflow: hidden;
}
.categories .tertiary-header {
  text-align: left;
}
.categories ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 2.4rem;
}
.categories li a {
  text-decoration: none;
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  color: #555;
  padding: 0.4rem 0.8rem;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
}
.categories li a:hover {
  color: #333;
}
.selected-category {
  color: #e7e3e0 !important;
  background-color: #eb435f;
  transition: 0.2s all ease-in-out;
}
.selected-category:hover {
  background-color: #bc364c;
}
.categories .see-more a:link,
.categories .see-more a:visited {
  margin-top: 1.8rem;
  display: inline;
  font-size: 1.6rem;
  color: #333;
  text-decoration: none;
  padding-left: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(85, 85, 85, 0.25);
  bottom: 5%;
  letter-spacing: 0.2rem;
  transition: 0.2s all ease-in-out;
}
.categories .see-more a:hover,
.categories .see-more a:active {
  padding-bottom: 0.8rem;
  color: #eb435f;
  border-bottom: 1px solid rgba(235, 67, 95, 0.25);
}
.get-app {
  margin: 0 5%;
  width: 90%;
  background-color: #333;
  padding: 4.8rem 2.4rem;
}
.app-button {
  text-align: center;
  margin-top: 4.8rem;
}
.get-app .logo {
  display: inline;
}
.get-app .logo span {
  color: #eb435f;
}
.get-app .sub-heading {
  text-align: center;
  color: white;
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
}
.app-button a:first-child {
  margin-right: 4.8rem;
}
.app-button .btn--ghost:link,
.app-button .btn--ghost:visited {
  font-size: 1.4rem;
  width: 16rem;
  box-shadow: inset 0 0 0 1px #e7e3e0;
  color: #e7e3e0;
  transition: 0.3s all ease-in-out;
}
.app-button .btn--ghost:hover,
.app-button .btn--ghost:active {
  box-shadow: none;
  color: #e7e3e0;
  transition: 0.3s all ease-in-out;
}

/*--------------------------- 
TESTIMONIALS SECION
--------------------------- */
.section-testimonials {
  margin-top: 9.6rem;
  position: relative;
  margin-bottom: 4.8rem;
  padding: 3.6rem 0;
}
.testimonials {
  margin: 3.2rem 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 1.2rem 2.4rem;
  gap: 3.6rem;
}
.testimonials .col-left {
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
}
.testimonials .col-right {
  width: 100%;
  background-color: #f8f6f5;
  padding: 3.6rem 4.8rem;
}
.testimonial {
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 2.8rem;
  width: 100%;
  height: 12rem;
  background: #f8f6f5;
  padding: 1.8rem 2.4rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 3px 12px;
  transition: 0.2s all ease-in-out;
}
.testimonial:hover {
  transform: scale(1.025);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
}
.testimonial-text {
  font-size: 1.6rem;
  width: 100%;
  margin: 1.2rem 0;
  line-height: 2;
  font-weight: 300;
  text-indent: 3.2rem;
}
.testimonial-name {
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
}
.col-right .testimonial-name {
  text-align: right;
  width: 100%;
}
.testimonial-info {
  display: inline-block;
  font-size: 1.4rem;
  color: rgb(175, 175, 175);
  font-weight: 300;
  line-height: 1.6;
}
.testimonial-img {
  width: 5.4rem;
  height: 5.4rem;
  border-radius: 50%;
}
.testimonial-img img {
  width: 100%;
  object-fit: cover;
}
.testimonial-header-text {
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.2;
}
.ratings {
  flex-direction: row;
  display: flex;
  margin-top: 1.6rem;
  margin-bottom: 2rem;
  column-gap: 1rem;
}
.ratings .icon {
  width: 1.4rem;
  height: 1.4rem;
  color: #ffd700;
  cursor: auto;
}
.ratings .icon:hover {
  color: #ffd700;
}
.testimonials-slide {
  display: none;
  overflow: hidden;
}
.testimonials-slide .col-right {
  width: 100%;
  display: flex;
  flex-direction: row;
}

/*--------------------------- 
ABOUT SECION
--------------------------- */
.section-about {
  margin-top: 9.6rem;
  position: relative;
  margin-bottom: 4.8rem;
}

.section-about .container {
  position: relative;
}

.section-about .secondary-header {
  margin-bottom: 3.6rem;
}

.profile {
  width: 90% !important;
  margin: 2.4rem 5%;
  align-items: center;
  grid-template-columns: 2.5fr 4fr;
}

.profile-img {
  width: 100%;
  opacity: 0;
  transition: 2s all;
  transition-delay: 0.6s;
  overflow: hidden;
}

.profile-img img {
  width: 100%;
  height: 36rem;
  object-fit: cover;
  transition: 0.3s all ease-in-out;
}

.profile-img img:hover {
  transform: scale(1.05);
}

.info {
  opacity: 0;
  transition: 2s all;
  transition-delay: 0.5s;
}

.profile .info .name {
  display: inline-block;
  color: #333;
  font-size: 2.4rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.2;
  margin-bottom: 0.2rem;
}

.profile .info .position {
  color: #555;
  font-size: 1.4rem;
  font-weight: 300;
  text-transform: uppercase;
  display: inline;
}

.line-border {
  margin: 1.2rem 0;
  height: 6.4rem;
  border-left: 1px solid rgba(85, 85, 85, 0.5);
}

.text-info {
  line-height: 1.4;
  width: 60%;
  font-size: 1.6rem;
  font-weight: 300;
  margin-bottom: 2.4rem;
}

.social-links {
  list-style: none;
  display: flex;
  gap: 2.4rem;
}

.icon {
  width: 2.4rem;
  height: 2.4rem;
  color: #333;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

.icon:hover {
  color: #bc364c;
}

.section-about .fa-chevron-right {
  position: absolute;
  right: 15%;
  top: 50%;
  font-weight: 100;
  width: 2.4rem;
  height: 2.4rem;
}

/* below 968px */
@media (max-width: 61em) {
  .header {
    font-weight: 700;
    font-size: 5.2rem;
    line-height: 1.2;
    letter-spacing: 0.1rem;
    margin-bottom: 2.4rem;
  }
  .hero-text {
    width: 100%;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: 0.2rem;
    margin-bottom: 2.4rem;
  }
  .new-header-text {
    margin-bottom: 1.2rem;
    font-size: 2.4rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    word-spacing: 0.8rem;
  }
  .categories ul {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
  }
  .categories .see-more a {
    font-size: 1.4rem !important;
    position: relative;
  }
  .grid--2-cols {
    grid-template-columns: 1fr !important;
    gap: 0.6rem;
  }
  .categories {
    grid-column: span 2;
    border: none;
    padding-left: 0;
    grid-row: 1;
    margin-bottom: 3.6rem;
  }
  .lists {
    display: flex;
    flex-wrap: wrap;
    row-gap: 3.2rem !important;
  }
  .categories li a {
    font-size: 1.4rem;
    justify-items: center;
  }
  .cards {
    height: 100%;
  }
}

/* below 750px */
@media (max-width: 47em) {
  .testimonials {
    grid-template-columns: 1fr;
  }
  .testimonials .col-left {
    display: none;
  }
  .testimonials-slide {
    display: inline;
  }
  .col-right-com {
    display: none;
  }
  .section-about {
    margin-top: 4rem;
  }
  .button .btn--full {
    margin-bottom: 0.8rem;
  }
}
/* below 588px */
@media (max-width: 37em) {
  .space {
    display: none;
  }
  .section-header {
    grid-template-columns: 1fr;
  }
  .header {
    text-align: center;
  }
  .header-text .sub-heading {
    text-align: center;
  }
  .hero-text {
    text-align: center;
  }
  .wrapper {
    justify-content: center;
  }
  .button {
    text-align: center;
  }
  .brand-logos {
    margin-top: 3.6rem;
  }
  .brand-logos img {
    width: 5.2rem;
  }
  .new-header-text {
    font-size: 1.6rem;
  }
  .new.sub-heading {
    font-size: 1.2rem;
  }
  .new-ads {
    transform: translateY(-15rem);
  }
  .cards {
    margin: 1rem 10%;
  }
  .btn-new .btn,
  .btn-new .btn:link,
  .btn-new .btn:visited {
    font-size: 1.4rem;
  }
  .btn-new .btn--full:link,
  .btn-new .btn--full:visited {
    margin-right: 0rem;
  }
  .profile.grid {
    column-gap: 1rem;
  }
  .text-info {
    line-height: 1.4;
    width: 80%;
    font-size: 1.6rem;
    font-weight: 300;
    margin-bottom: 2.4rem;
  }
  .section-header {
    height: 54rem;
  }
  .section-header .btn,
  .section-header .btn:link,
  .section-header .btn:visited {
    font-size: 1.4rem;
  }
  .app-button {
    display: flex;
    column-gap: 1.2rem;
    justify-content: center;
  }
  .app-button a:first-child {
    margin-right: 0rem;
  }
}

/* below 464px */
@media (max-width: 29em) {
  .section-header {
    background-image: none !important;
    height: 48rem;
  }
  .header {
    font-weight: 700;
    font-size: 4.2rem;
    line-height: 1.2;
    letter-spacing: 0.1rem;
    margin-bottom: 2.4rem;
    color: #333 !important;
  }
  .header-text .sub-heading {
    color: #333 !important;
  }
  .hero-text {
    font-size: 1.2rem;
    color: #333 !important;
  }
  .section-features {
    margin-top: 1.2rem;
  }
  .section-header {
    margin-bottom: 4.8rem;
  }
  .new-header img {
    width: 100%;
    margin: 2.4rem 0;
    transition: 0.25s all ease-in-out;
  }
  .new-header-text {
    font-size: 1.2rem;
  }
  .new.sub-heading {
    font-size: 0.8rem;
  }
  .new-ads {
    transform: translateY(-13rem);
  }
  .cards {
    width: 100%;
    margin: 1rem 0;
  }
  .categories .see-more {
    display: none;
  }
  .lists {
    flex-wrap: nowrap;
    row-gap: 3.2rem !important;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 4.8rem;
  }
  .categories ul {
    justify-content: start;
    align-items: center;
  }
  .categories li a {
    padding: 0.8rem 0.8rem;
  }
  .profile {
    width: 90%;
    margin: 1rem 5%;
    align-items: center;
    grid-template-columns: 2.5fr 4fr;
  }
  .secondary-header {
    margin-bottom: 1.4rem !important;
  }
  .profile {
    grid-template-columns: 1fr;
  }
  .profile.grid {
    row-gap: 2rem;
  }
  .profile-img {
    text-align: center;
  }
  .profile-img img {
    width: 100%;
    height: 24rem;
  }
  .section-about .fa-chevron-right {
    top: 70%;
  }
  .profile .info .name {
    font-size: 1.8rem;
  }
  .profile .info .position {
    font-size: 1.2rem;
  }
  .text-info {
    font-size: 1.4rem;
  }
  .get-app {
    margin: 0;
    width: 100%;
    padding: 3.6rem 1.8rem;
  }
  .testimonial-img {
    display: none;
  }
  .testimonial {
    padding: 1.2rem 2rem;
  }
  .testimonial-text {
    font-size: 1.4rem;
    line-height: 1.6;
  }
  .testimonial-name {
    font-size: 1rem;
  }
}
/* below 370px */
@media (max-width: 23em) {
  .section-header {
    height: 64rem;
  }
}
</style>
