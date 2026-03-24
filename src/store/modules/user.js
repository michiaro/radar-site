const state = {
  isAdult: localStorage.getItem('isUserAdult') || false,
};

const mutations = {
  setIsAdult(state, { isAdult }) {
    state.isAdult = isAdult;
    localStorage.setItem('isUserAdult', isAdult);
  },
};

export default {
  state,
  mutations,
};
