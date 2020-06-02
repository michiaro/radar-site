import Vue from 'vue';
import Vuex from 'vuex';
import staticData from '@/store/modules/staticData.js';
import works from '@/store/modules/works.js';
import services from '@/store/modules/services.js';
import page from '@/store/modules/page.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    staticData,
    works,
    services,
    page,
  },
  strict: debug,
});

export default store;
