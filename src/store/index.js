import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import staicData from '@/store/modules/staticData.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexPersist = new VuexPersist({
  key: 'staticData',
  strictMode: debug,
  storage: window.localStorage,
  modules: ['staicData'],
});

const store = new Vuex.Store({
  modules: {
    staicData,
  },
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
