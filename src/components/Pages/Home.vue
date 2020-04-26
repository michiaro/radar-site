<template>
  <div class="main">
    <img class="main__image" :src="backgroundImage" alt="Radar advertising" />
    <video
      class="main__video"
      autoplay="autoplay"
      loop="loop"
      muted="muted"
      playsinline
      preload="auto"
    >
      <source :src="videoMP4" type="video/mp4" />
    </video>
    <div class="main__content">
      <h1 class="main__title">
        За&nbsp;каждым проектом мы&nbsp;видим&nbsp;цели и&nbsp;мечты, ценим
        человеческие отношения
      </h1>
      <div class="main__bottom">
        <div class="main__services">
          Мы занимаемся
          <router-link class="main__link link" to="Services">
            брендингом </router-link
          >, <br />
          <router-link class="main__link link" to="Services">
            дизайном
          </router-link>
          и
          <router-link class="main__link link" to="Services">
            рекламой
          </router-link>
        </div>
        <div class="main__social-media">
          <a
            href="https://www.instagram.com/radaradvertising/"
            class="social-link"
            target="_blank"
            >INSTAGRAM</a
          >
          <a
            href="https://www.facebook.com/RadarAdvertising"
            class="social-link"
            target="_blank"
            >FACEBOOK</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videoMP4 from '@/video/main-video.mp4';
import backgroundImage from '@/images/main-back.jpg';

export default {
  name: 'Home',
  data() {
    return {
      videoMP4,
      backgroundImage,
    };
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

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
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    top: 0;
    z-index: -1;

    @include from('lg') {
      min-width: 100%;
      height: auto;
      min-height: 100%;
    }
  }

  &__content {
    height: 100%;
    box-sizing: border-box;
    padding: 124px 20px 20px;
    @include from('xl') {
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
    @include from('sm') {
      font-size: 70px;
      width: 80%;
      margin-right: 10vw;
    }
    @include from('xl') {
      font-size: 90px;
      margin-right: 40vw;
      max-width: 1130px;
    }
  }
  &__bottom {
    @include from('xl') {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  &__services {
    font-size: 22px;
    line-height: 1.3;
    margin-bottom: 115px;
    @include from('xl') {
      margin-bottom: 0;
    }
  }
  &__link {
    color: $--color-text;
    // border-bottom: 2px solid $--color-text;
    transition: all 0.2s ease-in-out;

    // &:hover {
    //   border-bottom: none;
    // }

    background: linear-gradient(
        50deg,
        $--color-text 50%,
        $--color-text 50%
      )
      bottom left/100% 2px no-repeat;

    $active-background: linear-gradient(
        50deg,
        $--color-text 50%,
        $--color-text 50%
      )
      bottom left/0% 1px no-repeat;

    &:hover {
      background: $active-background;
    }
  }
  &__social-media {
  }
}
.social-link {
  font-size: 22px;
  color: $--color-text--contrast-muted;
  transition: all 0.2s ease-in-out;

  & + & {
    margin-left: 54px;
  }

  &:hover {
    color: $--color-text--contrast;
  }
}
</style>
