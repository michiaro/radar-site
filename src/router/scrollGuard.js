import router from '@/router/index.js';
import store from '@/store/index.js';
import { enableDocumentScroll } from '@/utils/documentScroll.js';

export default router.beforeEach((to, from, next) => {
  enableDocumentScroll();
  store.commit('setPopupFormOpen', { isFormPopupOpen: false });

  next();
});
