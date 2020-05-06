import Vue from 'vue';
import VueRouter from 'vue-router';
import router from '@/router/index.js';
import store from '@/store/index.js';
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

// Vue.directive('lazyload', LazyLoadDirective);

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
  metaGuard,
});
