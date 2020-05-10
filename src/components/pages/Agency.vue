<template>
  <div class="agency">
    <div class="grid">
      <div class="row">
        <div class="col col-xs-2 col-lg-4 col-xl-8">
          <h1 class="agency__title">
            {{ aboutUs.title }}
          </h1>
        </div>
        <div class="col col-xs-2 col-sm-3 col-xl-6">
          <div class="agency__description">
            {{ aboutUs.description }}
          </div>
        </div>
        <div class="col col-xs-2 col-lg-3 col-xl-3 col-xl-offset-3">
          <div class="agency__logos">
            <a class="agency__logo" href="http://russianbranding.ru/" target="_blank">
              <img :src="abkr" alt="АБКР" />
            </a>
            <a class="agency__logo" href="http://www.akarussia.ru/" target="_blank">
              <img :src="akar" alt="АКАР" />
            </a>
            <div class="agency__logo-description">
              {{ aboutUs.logoDescription }}
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <template v-if="isLoading">
          <div v-for="i in 12" :key="i" class="col col-xs-2 col-sm-2 col-lg-1 col-xl-3">
            <div class="teammate teammate--dummy loading" />
          </div>
        </template>
        <template v-else-if="team.length !== 0">
          <div v-for="teammate in team" :key="teammate.slug" class="col col-xs-2 col-sm-2 col-lg-1 col-xl-3">
            <div class="teammate">
              <img :src="teammate.photo.path" :alt="teammate.name" class="teammate__photo" />
              <div class="teammate__overlay" />
              <div class="teammate__summary">
                <div class="teammate__name">
                  {{ teammate.name }}
                </div>
                <div class="teammate__position">
                  {{ teammate.position }}
                </div>
              </div>
            </div>
          </div>
          <div class="col col-xs-2 col-sm-2 col-lg-1 col-xl-3">
            <a class="agency__join-us join-us" href="https://chelyabinsk.hh.ru/employer/1156087" target="_blank">
              <h2 class="join-us__title">
                вакансии
              </h2>
              <div class="join-us__description">
                Стать частью <br />
                нашей команды&nbsp;→
              </div>
            </a>
          </div>
        </template>
        <div v-else class="col col-xs-2">
          Нет данных!
        </div>
      </div>
    </div>

    <div class="agency__clients">
      <page-footer />
    </div>
  </div>
</template>

<script>
import abkr from '@/images/ABKR-logo.png';
import akar from '@/images/AKAR-logo.png';
import { getCollectionByKey } from '@/api/index.js';

import PageFooter from '@/components/PageFooter.vue';

export default {
  name: 'Agency',
  components: {
    PageFooter,
  },
  data() {
    return {
      abkr,
      akar,
      isLoading: true,
      team: [],
    };
  },
  computed: {
    aboutUs() {
      return this.$store.state.staticData.singletones.aboutUs;
    },
  },
  created() {
    this.fetchTeam();
  },
  methods: {
    async fetchTeam() {
      this.isLoading = true;
      this.team = await getCollectionByKey({
        key: 'team',
        filter: { inTeam: true },
      });
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.agency {
  &__title {
    margin: 0 0 30px;
    font-size: 23px;
    font-weight: normal;

    @include from('md') {
      font-size: 44px;
    }
    @include from('lg') {
      margin: 0 200px 40px 0;
    }
    @include from('xl') {
      margin: 0 80px 86px 0;
    }
  }
  &__description {
    margin-bottom: 44px;
    font-size: 18px;
    @include from('md') {
      font-size: 26px;
      margin-right: 50px;
    }
    @include from('lg') {
      margin-bottom: 50px;
    }
    @include from('xl') {
      margin-bottom: 102px;
    }
  }
  &__logos {
    margin-bottom: 52px;
  }
  &__logo {
    & + & {
      margin-left: 26px;
    }
  }
  &__logo-description {
    margin-top: 16px;
    font-size: 18px;
  }
  &__join-us {
  }
  &__clients {
  }
}

.join-us {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  display: block;
  min-height: 380px;

  padding: 24px 16px 16px;

  border: 4px solid $--color-text;
  border-radius: 12px;
  letter-spacing: $--letter-spacing;
  color: $--color-text;
  transition: all 0.5s ease-in-out;
  max-height: 100%;
  height: calc(100% - 30px);
  font-size: 22px;
  @include from('xl') {
    font-size: 30px;
  }

  &:hover {
    border-color: $--color-brand;
    background-color: $--color-brand;
    color: $--color-text--contrast;
  }

  &__title {
    margin: 0;
    margin-bottom: 86px;
    font-weight: normal;
    font-size: 22px;
    @include from('xl') {
      font-size: 30px;
    }
  }
  &__description {
  }
}

.teammate {
  $teammate: &;

  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-bottom: $--gutter;

  &--dummy {
    background: $--color-text--muted;
    &:after {
      content: '';
      display: block;
      padding-bottom: 114.54%;
    }
  }

  &__photo {
    width: 100%;
    display: block;
  }

  $overlay-height: 100px;

  &__overlay {
    @include from('xl') {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: $overlay-height;
      background-color: $--color-background;
      transition-timing-function: $--timing-in-out-cubic;
      transition-duration: $--duration-700;
      transition-property: transform;
      transform: translateY(100%);
    }
  }

  &__summary {
    @include from('xl') {
      position: absolute;
      left: 0;
      bottom: 0;
      height: $overlay-height;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      transition-timing-function: $--timing-in-out-cubic, $--timing-in-out-cubic;
      transition-duration: $--duration-700, $--duration-700;
      transition-property: transform, opacity;
      transform: translateY(100%);
      opacity: 0;
    }
  }

  &__name {
    margin-top: 8px;
    font-size: $--font-size-90;
    color: $--color-text;
    @include from('xl') {
      margin-top: 0;
      font-size: $--font-size-140;
    }
  }

  &__position {
    margin: 3px 0;
    font-size: $--font-size-80;
    color: $--color-text--muted;
    @include from('xl') {
      margin-top: 8px;
      color: $--color-text;
    }
  }

  @include from('xl') {
    &:hover {
      #{$teammate}__overlay {
        transform: translateY(0);
      }
      #{$teammate}__summary {
        transition-delay: $--delay, $--delay;
        transition-duration: $--duration-1000, $--duration-1000;
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
