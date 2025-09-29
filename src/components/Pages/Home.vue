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
                  <svg
                    class="social-link__icon"
                    width="25"
                    height="21"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.8184 0.0340574C23.9886 -0.0322005 24.1815 -0.000338972 24.3213 0.117065C24.4612 0.234434 24.526 0.41849 24.4903 0.597534L20.4991 19.5975C20.4675 19.7558 20.3619 19.8895 20.2149 19.9559C20.0679 20.0222 19.8974 20.0134 19.7579 19.9325L13.1749 16.1122L10.3965 20.8007C10.2671 20.9724 10.0419 21.0428 9.83795 20.9745C9.63417 20.9062 9.49712 20.7148 9.49713 20.4999L9.50006 13.4999C9.50012 13.3587 9.55947 13.2235 9.66412 13.1288L16.4766 6.96375L7.25494 12.4296C7.1182 12.5106 6.95106 12.5219 6.80474 12.4598L0.804743 9.91492C0.617517 9.83548 0.49703 9.6505 0.500056 9.44714C0.503097 9.24389 0.629074 9.06302 0.818415 8.98914L23.8184 0.0340574Z"
                      fill="#F9E198"
                    />
                  </svg>
                </span>
              </appear>
            </a>
            <a :href="common.behance" class="social-link" target="_blank">
              <appear :is-visible="animationCounter >= 3" :on-next="showNext">
                <span
                  class="appear appear--right appear--duration-500 appear--duration-1000"
                >
                  <svg
                    class="social-link__icon"
                    width="33"
                    height="20"
                    viewBox="0 0 33 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5983 0C10.5508 0 11.43 0.0706714 12.236 0.282686C13.042 0.424028 13.7014 0.706714 14.2875 1.06007C14.8737 1.41343 15.3133 1.90813 15.6064 2.54417C15.8995 3.18021 16.046 3.9576 16.046 4.80565C16.046 5.79505 15.8262 6.64311 15.3133 7.27915C14.8737 7.91519 14.141 8.48057 13.2618 8.90459C14.5074 9.25795 15.4599 9.89399 16.046 10.742C16.6322 11.5901 16.9985 12.6502 16.9985 13.8516C16.9985 14.841 16.7787 15.689 16.4124 16.3958C16.046 17.1025 15.4599 17.7385 14.8004 18.1625C14.141 18.5866 13.335 18.9399 12.4558 19.1519C11.5766 19.364 10.6973 19.5053 9.81811 19.5053H0V0H9.5983ZM9.01214 7.91519C9.81811 7.91519 10.4775 7.70318 10.9904 7.34982C11.5033 6.99647 11.7231 6.36042 11.7231 5.58304C11.7231 5.15901 11.6498 4.73498 11.5033 4.4523C11.3568 4.16961 11.137 3.9576 10.8439 3.74558C10.5508 3.60424 10.2577 3.4629 9.89138 3.39223C9.52503 3.32156 9.15868 3.32155 8.71906 3.32155H4.46944V7.91519H9.01214ZM9.23195 16.2544C9.67157 16.2544 10.1112 16.1837 10.4775 16.1131C10.8439 16.0424 11.2102 15.9011 11.5033 15.689C11.7964 15.477 12.0162 15.265 12.236 14.9117C12.3825 14.5583 12.5291 14.1343 12.5291 13.6396C12.5291 12.6502 12.236 11.9435 11.6498 11.4488C11.0637 11.0247 10.2577 10.8127 9.30522 10.8127H4.46944V16.2544H9.23195ZM23.373 16.1837C23.9591 16.7491 24.8383 17.0318 26.0107 17.0318C26.8166 17.0318 27.5493 16.8198 28.1355 16.4664C28.7216 16.0424 29.088 15.6184 29.2345 15.1943H32.8247C32.2386 16.8905 31.3593 18.0919 30.187 18.8693C29.0147 19.576 27.6226 20 25.9374 20C24.7651 20 23.7393 19.788 22.7868 19.4346C21.8343 19.0813 21.1016 18.5866 20.4422 17.8799C19.7828 17.2438 19.2699 16.4664 18.9768 15.5477C18.6104 14.629 18.4639 13.6396 18.4639 12.5088C18.4639 11.4488 18.6104 10.4594 18.9768 9.54064C19.3431 8.62191 19.856 7.84452 20.5154 7.13781C21.1749 6.50177 21.9808 5.9364 22.8601 5.58304C23.8126 5.22968 24.7651 5.01767 25.9374 5.01767C27.183 5.01767 28.282 5.22968 29.2345 5.72438C30.187 6.21908 30.9197 6.78445 31.5059 7.63251C32.092 8.40989 32.5316 9.32862 32.8247 10.318C32.9713 11.3074 33.0445 12.2968 32.9713 13.4276H22.3472C22.3472 14.5583 22.7868 15.6184 23.373 16.1837ZM27.9889 8.76325C27.476 8.26855 26.6701 7.98587 25.7176 7.98587C25.0582 7.98587 24.5453 8.12721 24.1057 8.33922C23.666 8.55124 23.373 8.83392 23.0799 9.11661C22.7868 9.39929 22.6403 9.75265 22.567 10.106C22.4937 10.4594 22.4205 10.742 22.4205 11.0247H29.0147C28.8682 9.96466 28.5018 9.25795 27.9889 8.76325ZM21.5412 1.34276H29.7474V3.25088H21.5412V1.34276Z"
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
                  <svg
                    class="social-link__icon"
                    width="28"
                    height="18"
                    viewBox="0 0 28 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2448 18C5.67832 18 0.223776 11.2554 0 0.0144119H4.81119C4.96503 8.25781 8.48951 11.7454 11.2867 12.466V0.0144119H15.8042V7.1193C18.5594 6.81665 21.4685 3.57406 22.4476 0H26.951C26.5838 1.8501 25.8503 3.6023 24.7963 5.14712C23.7423 6.69194 22.3904 7.99619 20.8252 8.97838C22.5719 9.87424 24.1145 11.1415 25.3513 12.6965C26.588 14.2516 27.4908 16.0592 28 18H23.035C21.972 14.5845 19.3147 11.9327 15.8042 11.5725V18H15.2587H15.2448Z"
                      fill="#F9E198"
                    />
                  </svg>
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
    // display: none;

    // @include from("md") {
    //   display: block;
    // }
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
  $block: &;

  font-size: 22px;
  color: $--color-text--contrast-muted;
  transition-property: color;
  transition-duration: $--duration-100;
  transition-timing-function: $--timing-in-out-cubic;
  display: inline-block;
  cursor: pointer;

  span {
    display: block;
  }

  & + & {
    margin-left: 16px;

    @include from("lg") {
      margin-left: 32px;
    }
  }

  &__icon {
    path {
      fill: $--color-text--contrast-muted;
    }
  }

  &:hover {
    color: $--color-text--contrast;

    #{$block}__icon {
      path {
        fill: $--color-text--contrast;
      }
    }
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
