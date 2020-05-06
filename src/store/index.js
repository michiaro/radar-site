import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import staticData from '@/store/modules/staticData.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexPersist = new VuexPersist({
  key: 'staticData',
  strictMode: debug,
  storage: window.localStorage,
  modules: ['staticData'],
});

const store = new Vuex.Store({
  modules: {
    staticData,
  },
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
