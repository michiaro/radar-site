import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import router from '@/router/index.js';
import metaGuard from '@/router/metaGuard.js';

import 'normalize.css';
import 'swiper/css/swiper.css';

import '@/styles/hamburger-settings.scss';
import 'hamburgers/dist/hamburgers.css';

import '@/styles/main.scss';
import '@/fonts/gerbera.css';

import App from './App.vue';
// import LazyLoadDirective from './directives/LazyLoadDirective';

Vue.use(VueRouter);

// google map API key
// 'AIzaSyDOqBvzLNS1rtiSoAdiUyRkZIRx_FUjjjA'

Vue.use(VueAwesomeSwiper);

// Vue.directive('lazyload', LazyLoadDirective);

new Vue({
  render: h => h(App),
  router,
  metaGuard,
}).$mount('#app');
