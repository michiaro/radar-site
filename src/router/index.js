import Router from 'vue-router';
import routes from './routes.js';

export default new Router({
  mode: 'history',
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 100 },
      };
    }

    // TODO проверить, как работает с фильтрацией через query
    window.scrollTo(0, 0);
    return {
      offset: { x: 0, y: 0 },
    };
  },
  routes,
});
