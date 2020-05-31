const state = {
  isMobile: false,
  isTablet: false,
  isMenuOpen: false,
  isFormPopupOpen: false,
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
  setPopupFormOpen(state, { isFormPopupOpen }) {
    state.isFormPopupOpen = isFormPopupOpen;
  },
};

export default {
  state,
  mutations,
};
