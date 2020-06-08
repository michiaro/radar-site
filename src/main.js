import Vue from 'vue';
import VueRouter from 'vue-router';
import VueObserveVisibility from 'vue-observe-visibility';
import router from '@/router/index.js';
import store from '@/store/index.js';
import metaGuard from '@/router/metaGuard.js';
import scrollGuard from '@/router/scrollGuard.js';

import 'normalize.css';

import '@/styles/main.scss';
import '@/fonts/gerbera.css';

import App from './App.vue';
// import LazyLoadDirective from './directives/LazyLoadDirective';

Vue.use(VueObserveVisibility);
Vue.use(VueRouter);

// Vue.directive('lazyload', LazyLoadDirective);

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
  metaGuard,
  scrollGuard,
});
