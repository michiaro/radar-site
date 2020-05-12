const state = {
  content: [],
  filter: null,
  total: null,
};

const mutations = {
  setWorksFilter(state, { filter }) {
    state.filter = filter;
  },
  setWorksTotal(state, { total }) {
    state.total = total;
  },
  setWorksContent(state, { data, reset }) {
    let newContent = data;
    if (!reset) {
      newContent = [...state.content, ...newContent];
    }

    state.content = newContent;
  },
};

export default {
  state,
  mutations,
};
