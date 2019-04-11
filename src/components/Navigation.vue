<template lang="pug">
  nav.main-menu(:class="{'mobile' : isMobile}")
    ul.main-menu__list
      li.main-menu__item
        router-link.main-menu__link(
          to="/all-works"
        )
          | РАБОТЫ
      li.main-menu__item
        router-link.main-menu__link(
          to="/about"
        )
          | О НАС
      li.main-menu__item
        router-link.main-menu__link(
          to="/team"
        )
          | КОМАНДА
      li.main-menu__item
        router-link.main-menu__link(
          to="/clients"
        )
          | КЛИЕНТЫ
      li.main-menu__item
        router-link.main-menu__link(
          to="/contacts"
        )
          | КОНТАКТЫ
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    isMobile: {
      type: Boolean,
    }
  },
}
</script>

<style lang="scss">

</style>
