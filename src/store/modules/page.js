const state = {
  isMobile: true,
  isTablet: true,
  isMenuOpen: false,
  isFormPopupOpen: false,
  animationCounter: {
    page: 0,
    campaign: 0,
    digital: 0,
    branding: 0,
  },
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
  animateNext(state, { counterKey }) {
    state.animationCounter[counterKey]++;
  },
  resetAnimations(state, { counterKey }) {
    state.animationCounter[counterKey] = 0;
  },
};

export default {
  state,
  mutations,
};
