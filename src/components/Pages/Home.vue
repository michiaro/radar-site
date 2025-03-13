<template>
  <div class="main">
    <appear :is-visible="animationCounter >= 0" is-silent :on-next="showNext">
      <img
        class="main__image appear appear--duration-1500"
        :src="backgroundImage"
        alt="Radar"
      />
      <video
        class="main__video main__video--desktop appear appear--duration-1500"
        autoplay="autoplay"
        loop="loop"
        muted="muted"
        playsinline
        preload="auto"
      >
        <source :src="backgroundVideo" type="video/mp4" />
      </video>
    </appear>
    <div class="main__content">
      <appear :is-visible="isTitleVisible" :on-next="showNext" :delay="400">
        <h1 class="main__title appear appear--up appear--duration-1000">
          {{ text }}
        </h1>
      </appear>
      <div class="main__bottom">
        <appear :is-visible="animationCounter >= 1" :on-next="showNext">
          <!-- <div class="main__services appear appear--left appear--duration-1500">
            Мы занимаемся
            <router-link
              class="main__link link"
              :to="{ path: '/services', query: { direction: 'branding' } }"
            >
              брендингом </router-link
            >,
            <br />
            <router-link
              class="main__link link"
              :to="{ path: '/services', query: { direction: 'branding' } }"
            >
              дизайном
            </router-link>
            и
            <router-link
              class="main__link link"
              :to="{ path: '/services', query: { direction: 'campaign' } }"
            >
              рекламой
            </router-link>
          </div> -->

          <div class="main__buttons">
            <button class="transparent-button">
              <svg
                class="transparent-button__icon"
                width="36"
                height="32"
                viewBox="0 0 36 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3333 24.3333L17.9999 31M17.9999 31L24.6666 24.3333M17.9999 31V16M31.3333 23.9047C33.3691 22.2234 34.6666 19.6799 34.6666 16.8333C34.6666 11.7707 30.5625 7.66667 25.4999 7.66667C25.1357 7.66667 24.795 7.47666 24.6101 7.1629C22.4367 3.47473 18.424 1 13.8333 1C6.92969 1 1.33325 6.59644 1.33325 13.5C1.33325 16.9435 2.72566 20.0618 4.97817 22.3226"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="transparent-button__text">Скачать презентацию</span>
            </button>

            <button class="transparent-button">
              <svg
                class="transparent-button__icon"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9999 34.6666C27.2047 34.6666 34.6666 27.2047 34.6666 18C34.6666 8.79523 27.2047 1.33331 17.9999 1.33331C8.79517 1.33331 1.33325 8.79523 1.33325 18C1.33325 27.2047 8.79517 34.6666 17.9999 34.6666Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.8333 12.9422C13.8333 12.1467 13.8333 11.749 13.9995 11.5269C14.1444 11.3334 14.3661 11.2124 14.6072 11.1952C14.8839 11.1754 15.2185 11.3905 15.8876 11.8206L23.7553 16.8784C24.3359 17.2517 24.6262 17.4383 24.7265 17.6756C24.8141 17.883 24.8141 18.117 24.7265 18.3243C24.6262 18.5616 24.3359 18.7483 23.7553 19.1216L15.8876 24.1793C15.2185 24.6095 14.8839 24.8246 14.6072 24.8048C14.3661 24.7876 14.1444 24.6665 13.9995 24.473C13.8333 24.251 13.8333 23.8532 13.8333 23.0578V12.9422Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="transparent-button__text">Смотреть шоурил</span>
            </button>
          </div>
        </appear>

        <div class="main__social-media">
          <a :href="common.vk" class="social-link" target="_blank">
            <appear :is-visible="animationCounter >= 2" :on-next="showNext">
              <span
                class="appear appear--right appear--duration-500 appear--duration-1000"
              >
                VK
              </span>
            </appear>
          </a>
          <a :href="common.telegram" class="social-link" target="_blank">
            <appear :is-visible="animationCounter >= 3" :on-next="showNext">
              <span
                class="appear appear--right appear--duration-500 appear--duration-1000"
              >
                TELEGRAM
              </span>
            </appear>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import video from "@/video/main-video.mp4";
import videoMobile from "@/video/main-video-mobile.mp4";
import backgroundImage from "@/images/main-back.jpg";
import backgroundImageMobile from "@/images/main-back-mobile.jpg";

import { getSingletonByKey } from "@/api/index.js";
import Appear from "@/components/Appear.vue";

export default {
  name: "Home",
  components: {
    Appear,
  },
  data() {
    return {
      text: "",
      animationCounter: -1,
    };
  },
  computed: {
    common() {
      const commonData = this.$store.state.staticData.singletones.common;
      return commonData ? commonData : {};
    },
    backgroundVideo() {
      const { isTablet } = this;
      return isTablet ? videoMobile : video;
    },
    backgroundImage() {
      const { isTablet } = this;
      return isTablet ? backgroundImageMobile : backgroundImage;
    },
    isTablet() {
      return this.$store.state.page.isTablet;
    },
    isTitleVisible() {
      const { text, animationCounter } = this;
      if (text.length > 0) {
        return animationCounter >= 0;
      }
      return false;
    },
  },
  created() {
    this.getWelcomeText();
  },
  mounted() {
    this.$nextTick(() => {
      this.showNext();
    });
  },
  methods: {
    async getWelcomeText() {
      const { content } = await getSingletonByKey("welcomeText");
      this.text = content;
    },
    showNext() {
      this.animationCounter++;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/shared/_globals.scss";

.main {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  height: 100vh;
  z-index: -1;
  background-color: $--color-brand;

  &__video,
  &__image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__content {
    height: 100%;
    box-sizing: border-box;
    padding: 124px 20px 20px;
    @include from("xl") {
      padding: 16vh 34px 34px;
    }

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  &__title {
    margin: 0;
    font-weight: normal;
    font-size: 30px;
    @include from("sm") {
      font-size: 70px;
      width: 80%;
      margin-right: 10vw;
    }
    @include from("xl") {
      font-size: 90px;
      margin-right: 40vw;
      max-width: 1130px;
    }
  }
  &__bottom {
    @include from("md") {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    @include from("xl") {
      align-items: flex-end;
    }
  }
  &__social-media {
    display: none;

    @include from("md") {
      display: block;
    }
    // margin-right: 104px; // for callibri widget - hidden now
  }
  &__services {
    font-size: 22px;
    line-height: 1.3;
    margin-bottom: 115px;
    @include from("xl") {
      margin-bottom: 0;
    }
  }
  &__link {
    color: $--color-text;
    display: inline-block;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      height: 2px;
      background: $--color-text;
      transition-timing-function: $--timing-in-out-cubic;
      transition-duration: $--duration-1000;
      transition-property: transform;
      transform-origin: left center;
    }
    &:hover:after {
      transform: scaleX(0);
    }
  }

  &__buttons {
    @include from("md") {
      display: flex;
    }
  }
}

.social-link {
  font-size: 22px;
  color: $--color-text--contrast-muted;
  transition-property: color;
  transition-duration: $--duration-100;
  transition-timing-function: $--timing-in-out-cubic;
  display: inline-block;

  span {
    display: block;
  }

  & + & {
    margin-left: 20px;

    @include from("lg") {
      margin-left: 54px;
    }
  }

  &:hover {
    color: $--color-text--contrast;
  }
}

.transparent-button {
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;

  height: 50px;
  width: 100%;

  background: transparent;
  color: $--color-gray-50;
  font-size: $--font-size-80;
  border: 1px solid $--color-gray-50;
  transition: all $--duration-400 $--timing-in-out-cubic;

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  @include from("md") {
    width: 252px;
    border-width: 2px;
  }
  @include from("lg") {
    width: 284px;
  }

  &__icon {
    margin-right: 8px;
  }

  &__text {
  }

  & + & {
    margin-top: 10px;

    @include from("md") {
      margin-top: 0;
      margin-left: 10px;
    }
    @include from("lg") {
      margin-left: 30px;
    }
  }

  &:hover {
    background: $--color-background--contrast;
    border-radius: 90px;
    border: none;
  }
}
</style>
