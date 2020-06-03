import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)

import Mint from 'mint-ui';
Vue.use(Mint);

import { Search } from 'mint-ui';

Vue.component(Search.name, Search);

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'

import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)
Vue.use(VueAwesomeSwiper, /* { default global options } */ )
Vue.use(ElementUI);
import axios from 'axios'

Vue.prototype.$http = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || '/web/api'
    baseURL: ' http://localhost:3000/web/api'

})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')