import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '../public/general.css'
import store from './store'
import * as LottiePlayer from "@lottiefiles/lottie-player";
createApp(App).use(store).use(router).use(LottiePlayer).mount('#app')
