<template>
  <div class="thankyou-page">
    <div class="thankyou-page__inner">
      <appear :is-visible="animationCounter >= 0" :on-next="showNext">
        <div class="appear appear--up">
          <h1 class="thankyou-page__title">
            {{ formSuccessMessage }}
          </h1>
        </div>
      </appear>
      <appear :is-visible="animationCounter >= 1" :on-next="showNext">
        <div class="appear appear--up">
          <router-link class="thankyou-page__link" :to="{ name: 'Home' }">
            Вернуться на главную
          </router-link>
        </div>
      </appear>
    </div>
  </div>
</template>

<script>
import Appear from "@/components/Appear.vue";

export default {
  name: "Thankyou",
  components: {
    Appear,
  },
  data() {
    return {
      animationCounter: -1,
    };
  },
  computed: {
    formSuccessMessage() {
      const common = this.$store.state.staticData.singletones.common;
      return common
        ? common.formSuccessMessage
        : "Ваше сообщение успешно отправлено";
    },
  },
  mounted() {
    this.showNext();
  },
  methods: {
    showNext() {
      this.animationCounter++;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/shared/_globals.scss";

.thankyou-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 75px);
  margin: 5.5vh 1.5vmax;

  @include from("md") {
    margin-top: 10.5vh;
  }

  @include from("xl") {
    margin-top: 18.5vh;
  }

  &__image {
    max-width: 100%;
  }
  &__inner {
    margin-bottom: $--header-height;
  }
  &__title {
    font-weight: normal;
    max-width: 60%;
    margin-bottom: 2vh;

    @include from("md") {
      max-width: 100%;
    }
  }
  &__link {
    font-weight: 500;
    color: $--color-brand;
    display: inline-block;
    position: relative;
    font-size: $--font-size-100;
    @include from("lg") {
      font-size: $--font-size-140;
      margin-left: 0;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      height: 1px;
      background: $--color-brand;
      transition-timing-function: $--timing-in-out-cubic;
      transition-duration: $--duration-1000;
      transition-property: transform;
      transform-origin: left center;
      transform: scaleX(0);
    }

    @at-root ._ready &:after {
      transform: scaleX(1);
      transition-delay: $--delay-1000;
    }

    &:hover:after {
      transform: scaleX(0);
    }
  }
}
</style>
