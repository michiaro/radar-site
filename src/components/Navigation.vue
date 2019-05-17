<template lang="pug">
  nav.navigation
    router-link.navigation__link(v-for="link in menu" :to="link.to") {{ link.label }}
</template>

<script>
export default {
  name: "Navigation",
  props: {
    isMobile: {
      type: Boolean,
    },
  },
  data() {
    return {
      menu: [
        {
          label: "РАБОТЫ",
          to: "/all-works"
        },
        {
          label: "О НАС",
          to: "/about"
        },
        {
          label: "КОМАНДА",
          to: "/team"
        },
        {
          label: "КЛИЕНТЫ",
          to: "/clients"
        },
        {
          label: "КОНТАКТЫ",
          to: "/contacts"
        },
      ],
    };
  },
}
</script>

<style lang="scss">
@import '~@/styles/shared/globals';

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  padding: 66px 0;
  background: #e30613;

  @include from-breakpoint('xl') {
    position: static;
    z-index: 0;
    padding: 0;
    display: flex;
    background: none;
  }

  &__link {
    display: block;
    color: #fff;
    border-bottom: 1px solid white;
    font-size: 18px;
    padding: 1em;

    &:hover {
      opacity: 0.8;
      @include from-breakpoint('xl') {
        color: #e10811;
      }
    }

    @include from-breakpoint('xl') {
      font-size: 14px;
      border-bottom: 0;

      .router-link-active {
        color: #e10811;
      }
    }
  }
}

</style>
