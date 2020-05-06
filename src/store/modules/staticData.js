const state = {
  lastUpdated: 0,
  singletones: {},
};

const mutations = {
  setStaticData(state, { lastUpdated, singletones }) {
    state.lastUpdated = lastUpdated;
    state.singletones = singletones;
  },
};

export default {
  state,
  mutations,
};
