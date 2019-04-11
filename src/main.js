import 'normalize.css';
import 'swiper/dist/css/swiper.css';
import './styles/main.scss';
import '../static/fonts/proximanova.css';

import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'
 
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDOqBvzLNS1rtiSoAdiUyRkZIRx_FUjjjA',
    libraries: 'places',
  },
 
  autobindAllEvents: false,
  installComponents: true,
})

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

new Vue({
  render: h => h(App),
}).$mount('#app')
