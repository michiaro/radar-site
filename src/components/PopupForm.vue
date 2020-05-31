<template>
  <div class="popup-form">
    <div class="container">
      <div class="row">
        <div class="col col-xs-2 col-sm-4 col-xl-6 col-xl-offset-3">
          <div class="popup-form__inner">
            <button
              class="close-button close-button--cross"
              @click.stop="onClose"
            >
              <div class="close-button__cross" />
            </button>
            <contact-form contour />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue';

export default {
  name: 'PopupForm',
  components: {
    ContactForm,
  },
  methods: {
    onClose() {
      this.$store.commit('setPopupFormOpen', { isFormPopupOpen: false });
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.popup-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $--color-background;
  padding-top: 8.5vmax;

  &__inner {
    position: relative;
  }

  .close-button {
    padding: 1.5vmax;
    top: 0;
    right: 0;
  }
}
</style>
