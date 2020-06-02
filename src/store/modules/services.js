const state = {
  content: [],
};

const mutations = {
  setServicesContent(state, { data }) {
    state.content = data;
  },
};

export default {
  state,
  mutations,
};
