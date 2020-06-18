const state = {
  content: [],
  pillars: [],
};

const mutations = {
  setServicesContent(state, { data }) {
    state.content = data;
  },
  setPillarsContent(state, { data }) {
    state.pillars = data;
  },
};

export default {
  state,
  mutations,
};
