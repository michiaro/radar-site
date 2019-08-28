<template lang="pug">
  nav.main-menu(:class="{'mobile' : isMobile}")
    ul.main-menu__list
      li.main-menu__item
        router-link.main-menu__link(
          to="/all-works",
        )
          | РАБОТЫ
      li.main-menu__item
        router-link.main-menu__link(
          to="/about",
        )
          | О НАС
      li.main-menu__item(v-if="content.common.isServiecesPublished")
        router-link.main-menu__link(
          to="/services",
        )
          | УСЛУГИ
      //- li.main-menu__item
      //-   router-link.main-menu__link(
      //-     to="/team",
      //-   )
      //-     | КОМАНДА
      li.main-menu__item
        router-link.main-menu__link(
          to="/clients",
        )
          | КЛИЕНТЫ
      li.main-menu__item
        router-link.main-menu__link(
          to="/contacts",
        )
          | КОНТАКТЫ
</template>

<script>
import api from "../api/";

export default {
  name: "Navigation",
  props: {
    isMobile: {
      type: Boolean
    }
  },
  data() {
    return {
      content: {
        common: ""
      }
      // isReady: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      api.getSingletonsByKey("common").then(common => {
        this.content.common = common;
      });
    });
  }
};
</script>

<style lang="scss">
</style>
