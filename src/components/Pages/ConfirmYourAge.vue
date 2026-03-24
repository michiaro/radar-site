<template>
  <div class="confirm-age-page">
    <div class="confirm-age-page__inner">
      <div class="confirm-age-page__title">
        <svg
          viewBox="0 0 137 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 13.1346L15.5669 1.16751H23.7395V71.024H14.594V13.0373L0 23.5449V13.1346Z"
          />
          <path
            d="M75.1232 34.4418C78.2366 36.3228 80.5392 38.82 82.031 41.9333C83.5877 45.0467 84.3661 48.2898 84.3661 51.6626C84.3661 54.5814 83.7823 57.3056 82.6148 59.8353C81.5121 62.3 79.9554 64.4729 77.9447 66.3539C75.9988 68.17 73.6638 69.597 70.9396 70.6348C68.2803 71.6726 65.3615 72.1915 62.1832 72.1915C59.005 72.1915 56.0538 71.6726 53.3296 70.6348C50.6702 69.597 48.3352 68.17 46.3244 66.3539C44.3786 64.4729 42.8219 62.3 41.6544 59.8353C40.5517 57.3056 40.0004 54.5814 40.0004 51.6626C40.0004 48.2898 40.7463 45.0467 42.2381 41.9333C43.7948 38.82 46.1299 36.3228 49.2432 34.4418C47.1677 33.2094 45.4164 31.2959 43.9894 28.7015C42.5624 26.0421 41.849 22.9936 41.849 19.5559C41.849 16.8966 42.3354 14.3994 43.3084 12.0643C44.3462 9.66445 45.7407 7.58886 47.492 5.83759C49.3081 4.02145 51.4486 2.59448 53.9133 1.55669C56.4429 0.518896 59.1996 0 62.1832 0C65.1669 0 67.8911 0.518896 70.3559 1.55669C72.8855 2.59448 75.0259 4.02145 76.7772 5.83759C78.5933 7.58886 79.9879 9.66445 80.9608 12.0643C81.9986 14.3994 82.5175 16.8966 82.5175 19.5559C82.5175 22.9936 81.804 26.0421 80.377 28.7015C78.9501 31.2959 77.1988 33.2094 75.1232 34.4418ZM66.8533 10.7995C65.4912 10.2158 63.9345 9.9239 62.1832 9.9239C60.4319 9.9239 58.8428 10.2158 57.4159 10.7995C56.0538 11.3833 54.8862 12.1616 53.9133 13.1346C53.0052 14.1075 52.2918 15.2102 51.7729 16.4425C51.3188 17.6101 51.0918 18.81 51.0918 20.0424C51.0918 21.3396 51.3188 22.572 51.7729 23.7395C52.2918 24.907 53.0052 25.9773 53.9133 26.9502C54.8862 27.8583 56.0538 28.6042 57.4159 29.1879C58.8428 29.7068 60.4319 29.9663 62.1832 29.9663C63.9345 29.9663 65.4912 29.7068 66.8533 29.1879C68.2803 28.6042 69.4478 27.8583 70.3559 26.9502C71.3288 25.9773 72.0423 24.907 72.4963 23.7395C73.0152 22.572 73.2746 21.3396 73.2746 20.0424C73.2746 18.81 73.0152 17.6101 72.4963 16.4425C72.0423 15.2102 71.3288 14.1075 70.3559 13.1346C69.4478 12.1616 68.2803 11.3833 66.8533 10.7995ZM56.9294 61.392C58.5509 61.9757 60.3022 62.2676 62.1832 62.2676C64.0642 62.2676 65.7831 61.9757 67.3398 61.392C68.9613 60.8082 70.3234 59.9974 71.4261 58.9596C72.5936 57.9218 73.5017 56.7219 74.1503 55.3598C74.7989 53.9328 75.1232 52.441 75.1232 50.8843C75.1232 49.2627 74.7989 47.7709 74.1503 46.4088C73.5017 44.9818 72.5936 43.7495 71.4261 42.7117C70.3234 41.6739 68.9613 40.8631 67.3398 40.2794C65.7831 39.6956 64.0642 39.4037 62.1832 39.4037C60.3022 39.4037 58.5509 39.6956 56.9294 40.2794C55.3727 40.8631 54.0106 41.6739 52.8431 42.7117C51.7404 43.7495 50.8648 44.9818 50.2162 46.4088C49.5676 47.7709 49.2432 49.2627 49.2432 50.8843C49.2432 52.441 49.5676 53.9328 50.2162 55.3598C50.8648 56.7219 51.7404 57.9218 52.8431 58.9596C54.0106 59.9974 55.3727 60.8082 56.9294 61.392Z"
          />
          <path
            d="M112.306 37.847V21.9882H120.576V37.847H136.824V46.8953H120.576V62.5595H112.306V46.8953H96.058V37.847H112.306Z"
          />
        </svg>
      </div>
      <h1 class="confirm-age-page__subtitle">
        Чтобы продолжить, <br />
        подтвердите свой возраст
      </h1>

      <div class="confirm-age-page__buttons">
        <button type="button" class="button button--confirm" @click="confirm">
          Да, мне есть 18 лет
        </button>
        <button type="button" class="button button--deny" @click="deny">
          Нет, я младше 18 лет
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Appear from "@/components/Appear.vue";

export default {
  name: "ConfirmYourAge",
  components: {
    Appear,
  },
  computed: {
    requestedWorkSlug() {
      return this.$route.query.page;
    },
  },
  methods: {
    confirm() {
      this.$store.commit("setIsAdult", { isAdult: true });

      this.$router.push({
        path: `/all-works/${this.requestedWorkSlug}`,
      });
    },
    deny() {
      this.$router.push({
        path: "/all-works",
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/shared/_globals.scss";

.confirm-age-page {
  min-height: 100vh;
  padding: 150px 42px 0;
  box-sizing: border-box;
  background-color: #d9d9d9;

  &__inner {
    background-color: $--color-background;
    max-width: 400px;
    margin: 0 auto;
    padding: 60px 25px 42px;
    box-sizing: border-box;
    border-radius: 30px;
    text-align: center;

    @include from("sm") {
      max-width: 400px;
    }
    @include from("md") {
      max-width: 415px;
      padding: 80px 34px;
    }
  }
  &__title {
    width: 137px;
    margin: auto;
    margin-bottom: 15px;

    @include from("md") {
      width: 185px;
      margin-bottom: 20px;
    }

    svg {
      path {
        fill: $--color-error;
      }
    }
  }
  &__subtitle {
    font-weight: 400;
    font-size: 18px;
    line-height: 1.2;
    color: $--color-text;

    @include from("md") {
      font-size: 22px;
    }
  }
  &__buttons {
    margin-top: 62px;

    @include from("md") {
      margin-top: 85px;
    }

    .button {
      background-color: $--color-background;
      border-radius: 30px;
      font-weight: 400;
      font-size: 16px;
      text-transform: none;
      max-width: 206px;
      height: 46px;

      @include from("md") {
        height: 60px;
        max-width: 247px;
        font-size: 20px;
      }

      &--confirm {
        color: $--color-text;
        border: 1px solid $--color-text;

        &:hover {
          background-color: $--color-text;
          color: $--color-text--contrast;
          border-color: $--color-text;
        }
      }
      &--deny {
        margin-top: 12px;
        color: $--color-error;
        border: 1px solid $--color-error;

        &:hover {
          background-color: $--color-error;
          color: $--color-text--contrast;
        }
      }
    }
  }
}
</style>
