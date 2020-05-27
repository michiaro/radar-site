const state = {
  isMobile: false,
  isTablet: false,
  isMenuOpen: false,
};

const mutations = {
  setIsMobile(state, { isMobile }) {
    state.isMobile = isMobile;
  },
  setIsTablet(state, { isTablet }) {
    state.isTablet = isTablet;
  },
  setMenuOpen(state, { isMenuOpen }) {
    state.isMenuOpen = isMenuOpen;
  },
};

export default {
  state,
  mutations,
};
