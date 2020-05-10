const state = {
  lastUpdated: 0,
  singletones: {},
  collections: {},
};

const mutations = {
  setStaticData(state, { lastUpdated, singletones }) {
    state.lastUpdated = lastUpdated;
    state.singletones = singletones;
  },
  setStaticCollectionData(state, { title, collection }) {
    state.collections = {
      ...state.collections,
      [title]: collection,
    };
  },
};

export default {
  state,
  mutations,
};
