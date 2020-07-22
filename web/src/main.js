import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './router'
// import style
// import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false

// import 'swiper/swiper.scss'
// import './style.scss';
import './assets/scss/style.scss'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'

import axios from 'axios'
import './assets/iconfont/iconfont.css'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api'
})
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.component('m-card', Card);
Vue.component('m-list-card', ListCard);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
