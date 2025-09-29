<template>
  <div>
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
            <div
              class="main__services appear appear--left appear--duration-1500"
            >
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
            </div>
            <!-- <div class="main__buttons">
              <a
                class="transparent-button"
                type="button"
                :href="presentationLink"
                download="Radar Online"
                target="_blank"
              >
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

                <span class="transparent-button__text">
                  Скачать презентацию
                </span>
              </a>

              <button
                class="transparent-button"
                type="button"
                @click="toggleShowreel"
              >
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
            </div> -->
          </appear>

          <div class="main__social-media">
            <a :href="common.telegram" class="social-link" target="_blank">
              <appear :is-visible="animationCounter >= 2" :on-next="showNext">
                <span
                  class="appear appear--right appear--duration-500 appear--duration-1000"
                >
                  TELEGRAM
                </span>
              </appear>
            </a>
            <a :href="common.behance" class="social-link" target="_blank">
              <appear :is-visible="animationCounter >= 3" :on-next="showNext">
                <span
                  class="appear appear--right appear--duration-500 appear--duration-1000"
                >
                  <svg
                    width="26"
                    height="16"
                    viewBox="0 0 26 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5623 0C8.31275 0 9.00548 0.0565371 9.64048 0.226148C10.2755 0.339223 10.795 0.565371 11.2569 0.848057C11.7187 1.13074 12.065 1.5265 12.2959 2.03534C12.5269 2.54417 12.6423 3.16608 12.6423 3.84452C12.6423 4.63604 12.4691 5.31449 12.065 5.82332C11.7187 6.33216 11.1414 6.78445 10.4487 7.12368C11.43 7.40636 12.1805 7.91519 12.6423 8.59364C13.1041 9.27208 13.3928 10.1201 13.3928 11.0813C13.3928 11.8728 13.2196 12.5512 12.9309 13.1166C12.6423 13.682 12.1805 14.1908 11.6609 14.53C11.1414 14.8693 10.5064 15.1519 9.81367 15.3216C9.12094 15.4912 8.42821 15.6042 7.73548 15.6042H0V0H7.5623ZM7.10048 6.33216C7.73548 6.33216 8.25503 6.16254 8.65912 5.87986C9.06321 5.59717 9.23639 5.08834 9.23639 4.46643C9.23639 4.12721 9.17866 3.78799 9.06321 3.56184C8.94775 3.33569 8.77457 3.16608 8.54366 2.99647C8.31275 2.88339 8.08184 2.77032 7.79321 2.71378C7.50457 2.65724 7.21593 2.65724 6.86957 2.65724H3.52137V6.33216H7.10048ZM7.27366 13.0035C7.62002 13.0035 7.96639 12.947 8.25503 12.8905C8.54366 12.8339 8.8323 12.7208 9.06321 12.5512C9.29412 12.3816 9.4673 12.212 9.64048 11.9293C9.75594 11.6466 9.87139 11.3074 9.87139 10.9117C9.87139 10.1201 9.64048 9.55477 9.17866 9.15901C8.71684 8.81979 8.08184 8.65018 7.33139 8.65018H3.52137V13.0035H7.27366ZM18.4151 12.947C18.8769 13.3993 19.5696 13.6254 20.4932 13.6254C21.1282 13.6254 21.7055 13.4558 22.1673 13.1731C22.6292 12.8339 22.9178 12.4947 23.0333 12.1555H25.8619C25.4001 13.5124 24.7073 14.4735 23.7837 15.0954C22.8601 15.6608 21.7632 16 20.4355 16C19.5119 16 18.7037 15.8304 17.9532 15.5477C17.2028 15.265 16.6255 14.8693 16.106 14.3039C15.5864 13.7951 15.1823 13.1731 14.9514 12.4382C14.6628 11.7032 14.5473 10.9117 14.5473 10.0071C14.5473 9.15901 14.6628 8.36749 14.9514 7.63251C15.24 6.89753 15.6441 6.27562 16.1637 5.71025C16.6832 5.20141 17.3182 4.74912 18.011 4.46643C18.7614 4.18375 19.5119 4.01413 20.4355 4.01413C21.4169 4.01413 22.2828 4.18375 23.0333 4.57951C23.7837 4.97527 24.361 5.42756 24.8228 6.10601C25.2846 6.72792 25.631 7.4629 25.8619 8.25442C25.9774 9.04594 26.0351 9.83746 25.9774 10.7421H17.6069C17.6069 11.6466 17.9532 12.4947 18.4151 12.947ZM22.0519 7.0106C21.6478 6.61484 21.0128 6.38869 20.2623 6.38869C19.7428 6.38869 19.3387 6.50177 18.9923 6.67138C18.646 6.84099 18.4151 7.06714 18.1841 7.29329C17.9532 7.51943 17.8378 7.80212 17.7801 8.08481C17.7223 8.36749 17.6646 8.59364 17.6646 8.81979H22.8601C22.7446 7.97173 22.456 7.40636 22.0519 7.0106ZM16.9719 1.0742H23.4373V2.60071H16.9719V1.0742Z"
                      fill="#F9E198"
                    />
                  </svg>
                </span>
              </appear>
            </a>
            <a :href="common.vk" class="social-link" target="_blank">
              <appear :is-visible="animationCounter >= 4" :on-next="showNext">
                <span
                  class="appear appear--right appear--duration-500 appear--duration-1000"
                >
                  VK
                </span>
              </appear>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShowreelVisible" class="showreel">
      <button
        type="button"
        class="showreel__close-button close-button close-button--cross close-button--contrast"
        @click.stop="toggleShowreel"
      >
        <div class="close-button__cross" />
      </button>
      <video
        class="showreel__video"
        autoplay="autoplay"
        loop="loop"
        playsinline
        preload="auto"
        controls
      >
        <!-- muted="muted" -->
        <source :src="showreelVideoLink" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import video from "@/video/main-video.mp4";
import videoMobile from "@/video/main-video-mobile.mp4";
import backgroundImage from "@/images/main-back.jpg";
import backgroundImageMobile from "@/images/main-back-mobile.jpg";

import { baseURL, getSingletonByKey } from "@/api/index.js";
import Appear from "@/components/Appear.vue";

export default {
  name: "Home",
  components: {
    Appear,
  },
  data() {
    return {
      text: "",
      presentationSource: "",
      showreelSource: "",
      animationCounter: -1,
      isShowreelVisible: false,
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
    presentationLink() {
      return `${baseURL}/${this.presentationSource}`;
    },
    showreelVideoLink() {
      return `${baseURL}/${this.showreelSource}`;
    },
  },
  created() {
    this.getHomeData();
  },
  mounted() {
    this.$nextTick(() => {
      this.showNext();
    });
  },
  methods: {
    async getHomeData() {
      const { content, presentation, showreel } = await getSingletonByKey(
        "welcomeText"
      );
      this.text = content;
      this.presentationSource = presentation;
      this.showreelSource = showreel;
    },
    showNext() {
      this.animationCounter++;
    },
    toggleShowreel() {
      this.isShowreelVisible = !this.isShowreelVisible;
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
  box-sizing: border-box;
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

.showreel {
  $this: &;

  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  background: $--color-background--contrast;

  &__close-button {
    z-index: 1;
    transform: scale(0.8);

    @include from("xl") {
      visibility: hidden;
      transition: visibility $--duration-600 $--timing-in-out-cubic;
    }
  }
  .close-button {
    top: 0;
    right: 0;
  }

  &__video {
    width: 100%;
    height: 100%;
  }

  @include from("xl") {
    &:hover {
      #{$this}__close-button {
        visibility: visible;
      }
    }
  }
}
</style>
