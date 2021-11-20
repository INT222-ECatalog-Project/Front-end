<template>
  <footer class="footer">
    <div class="container grid grid--footer">
      <div class="logo-col">
        <a href="#" class="footer-logo">
          <div class="logo">NERDY<span>STYLE</span></div>
          <!-- <img class="logo" src="./img/omnifood-logo.png" alt="Omnifood logo"> -->
        </a>
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
        <p class="copyright">
          Compyright ©
          <span class="year">{{ new Date().getFullYear() }} </span> by
          NERDYSTYLE All rights reserved.
        </p>
      </div>
      <div class="address-col">
        <p class="footer-heading">Contact us</p>
        <address class="contacts">
          <p class="address">
            126 Pracha Uthit Rd, Khwaeng Bang Mot, Khet Thung Khru, Krung Thep
            Maha Nakhon 10140
          </p>
          <p>
            <a class="footer-link" href="tel:063-598-9163">063-598-9163</a
            ><br />
            <a class="footer-link" href="mailto:nerdy_style@gmail.com"
              >nerdy_style@gmail.com</a
            >
          </p>
        </address>
      </div>
      <nav class="nav-col">
        <p class="footer-heading">Account</p>
        <ul class="footer-nav">
          <li><router-link class="footer-link" to="/sign-up">Create account</router-link></li>
          <li><router-link class="footer-link" to="/sign-up">Sign in</router-link></li>
          <li><a class="footer-link" href="#">iOS app</a></li>
          <li><a class="footer-link" href="#">Android app</a></li>
        </ul>
      </nav>
      <nav class="nav-col">
        <p class="footer-heading">Company</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="#">About NERDYSTYLE</a></li>
          <li><a class="footer-link" href="#">For Business</a></li>
          <li><a class="footer-link" href="#">Cloth partners</a></li>
          <li><a class="footer-link" href="#">Careers</a></li>
        </ul>
      </nav>
      <nav class="nav-col">
        <p class="footer-heading">Resources</p>
        <ul class="footer-nav">
          <li><a class="footer-link" href="#">Recipe directory</a></li>
          <li><a class="footer-link" href="#">Help center</a></li>
          <li><a class="footer-link" href="#">Privacy &amp; terms</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  padding: 12.8rem 0;
  border-top: 0.5px solid rgba(85, 85, 85, 0.25);
}

.grid--footer {
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
}

.logo {
  font-weight: 900;
  font-size: 2.4rem;
  color: #333;
}

.logo span {
  color: #eb435f;
}

.logo-col {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  text-decoration: none;
  display: block;
  margin-bottom: 3.2rem;
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

.copyright {
  font-size: 1.4rem;
  color: #555;
  line-height: 1.6;
  bottom: 0;
  margin-top: auto;
}

.footer-heading {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 4rem;
}

.contacts {
  font-style: normal;
  font-size: 1.6rem;
  line-height: 1.6;
}

.address {
  margin-bottom: 2.4rem;
}

.footer-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.footer-link:link,
.footer-link:visited {
  text-decoration: none;
  font-size: 1.6rem;
  color: #555;
  transition: 0.3s all ease-in-out;
}

.footer-link:hover,
.footer-link:active {
  color: #333;
}

@media (max-width: 51em) {
  .grid--footer {
    grid-template-columns: repeat(6, 1fr);
  }
  .nav-col {
    /* be the first row */
    grid-row: 1;
    grid-column: span 2;
  }

  .address-col,
  .logo-col {
    grid-column: span 3;
    margin-bottom: 3.2rem;
  }
}

/* below 588px */
@media (max-width: 37em) {
  .footer {
    padding: 9.6rem 0;
  }
  .grid--footer {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-heading {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  .contacts {
    font-size: 1.4rem;
  }

  .address {
    font-size: 1.2rem;
  }
  .footer-link:link,
  .footer-link:visited {
    font-size: 1.2rem;
  }
  .copyright {
    font-size: 1.2rem;
  }
  .logo {
    font-size: 1.8rem;
  }
}
</style>
