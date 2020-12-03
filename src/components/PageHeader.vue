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
            <a class="mobile-menu__link" href="tel:+79227000100">
              +7 (922) 700-01-00
            </a>
            <a
              class="mobile-menu__link"
              href="mailto:mlopatina@radar-online.ru"
            >
              mlopatina@radar-online.ru
            </a>
          </div>
          <div class="mobile-menu__contact-person">
            <div class="mobile-menu__name">Мария Лопатина</div>
            <div class="mobile-menu__position">Account Director</div>
          </div>
        </div>
      </div>
    </div>
    <appear :is-visible="animationCounter >= 0">
      <div class="appear appear--duration-500">
        <logo @click.native="closeMenu" />
      </div>
    </appear>
    <appear :is-visible="animationCounter >= 0">
      <div class="appear appear--duration-500">
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
      </div>
    </appear>
    <navigation v-if="!isMobile" />
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Navigation from '@/components/Navigation.vue';
import Appear from '@/components/Appear.vue';

export default {
  name: 'PageHeader',
  components: {
    Logo,
    Navigation,
    Appear,
  },
  data() {
    return {
      animationCounter: -1,
    };
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
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.showNext();
      }, 500);
    });
  },
  methods: {
    toggleMenu() {
      this.$store.commit('setMenuOpen', { isMenuOpen: !this.isMenuOpen });
    },
    closeMenu() {
      this.$store.commit('setMenuOpen', { isMenuOpen: false });
    },
    showNext() {
      this.animationCounter++;
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
    @include from('xl') {
      display: none;
    }
  }

  &--contrast {
    background: none;
  }
}
</style>
