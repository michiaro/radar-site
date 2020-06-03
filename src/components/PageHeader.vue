<template>
  <header class="header" :class="{ 'header--contrast': isMainPage }">
    <div v-if="isMenuOpen && isMobile" class="mobile-menu">
      <div class="mobile-menu__navigation">
        <navigation @close-menu="closeMenu" />
      </div>
      <div class="mobile-menu__bottom">
        <div class="mobile-menu__bottom-title">Обсудить задачу</div>
        <div class="mobile-menu__bottom-content">
          <div class="mobile-menu__contacts">
            <a class="mobile-menu__link" href="tel:+79227000100"
              >+7 (922) 700-01-00</a
            >
            <a class="mobile-menu__link" href="mailto:mlopatina@radar-online.ru"
              >mlopatina@radar-online.ru</a
            >
          </div>
          <div class="mobile-menu__contact-person">
            <div class="mobile-menu__name">Мария Лопатина</div>
            <div class="mobile-menu__position">Account Director</div>
          </div>
        </div>
      </div>
    </div>
    <logo @click.native="closeMenu" />
    <button
      v-if="isMobile"
      class="header__burger hamburger hamburger--slider"
      :class="{ 'is-active': isMenuOpen }"
      type="button"
      @click="toggleMenu"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
    <navigation v-if="!isMobile" />
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'PageHeader',
  components: {
    Logo,
    Navigation,
  },
  computed: {
    isMainPage() {
      return this.$route.path === '/';
    },
    isMobile() {
      return this.$store.state.page.isMobile;
    },
    isMenuOpen() {
      return this.$store.state.page.isMenuOpen;
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit('setMenuOpen', { isMenuOpen: !this.isMenuOpen });
    },
    closeMenu() {
      this.$store.commit('setMenuOpen', { isMenuOpen: false });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.header {
  z-index: 2; // перекрываем свайпер
  padding: 18px $--page-padding-x;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: $--color-background;

  &__burger {
    padding: 0;
  }

  &--contrast {
    background: none;
  }
}

</style>
