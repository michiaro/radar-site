<template>
  <div class="agency">
    <div class="container">
      <div class="row">
        <div class="col col-xs-2 col-lg-4 col-xl-8">
          <appear :is-visible="animationCounter >= 0" :on-next="showNext">
            <h1 class="agency__title appear appear--duration-1000 appear--up">
              {{ aboutUsData.title }}
            </h1>
          </appear>
        </div>
        <div class="col col-xs-2 col-sm-3 col-xl-6">
          <appear :is-visible="animationCounter >= 1" :on-next="showNext">
            <div class="agency__description appear appear--duration-1000 appear--up">
              {{ aboutUsData.description }}
            </div>
          </appear>
        </div>
        <div class="col col-xs-2 col-lg-3 col-xl-3 col-xl-offset-3">
          <appear :is-visible="animationCounter >= 2" :on-next="showNext">
            <div class="agency__logos">
              <a
                class="agency__logo appear appear--duration-1000 appear--left"
                :href="aboutUsData.abkrLink"
                target="_blank"
              >
                <img :src="baseURL + aboutUsData.abkrLogo.path" alt="АБКР" />
              </a>
              <a
                class="agency__logo appear appear--duration-1000 appear--left appear--delay-400"
                :href="aboutUsData.akarLink"
                target="_blank"
              >
                <img :src="baseURL + aboutUsData.akarLogo.path" alt="АКАР" />
              </a>
              <div
                class="agency__logo-description appear appear--duration-1000 appear--up appear--delay-600"
              >
                {{ aboutUsData.logoDescription }}
              </div>
            </div>
          </appear>
        </div>
      </div>

      <div v-if="team.length > 0" class="row">
        <div
          v-for="(teammate, index) in team"
          :key="teammate.slug"
          class="col col-xs-2 col-sm-2 col-lg-1 col-xl-3"
        >
          <appear :on-next="showNext" :is-visible="getVisibility(index)">
            <div
              v-observe-visibility="trackVisibility(index)"
              class="teammate appear appear--duration-1000 appear--up appear--delay-200"
            >
              <img
                :src="baseURL + teammate.photo.path"
                :alt="teammate.name"
                class="teammate__photo"
              />
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
          </appear>
        </div>
        <div class="col col-xs-2 col-sm-2 col-lg-1 col-xl-3">
          <appear
            :on-next="showNext"
            :is-visible="animationCounter > team.length + 2"
          >
            <a
              class="agency__join-us join-us appear appear--up"
              href="https://chelyabinsk.hh.ru/employer/1156087"
              target="_blank"
            >
              <h2 class="join-us__title">
                вакансии
              </h2>
              <div class="join-us__description">
                Стать частью <br />
                нашей команды&nbsp;→
              </div>
            </a>
          </appear>
        </div>
      </div>
    </div>

    <div class="agency__clients">
      <page-footer is-clients />
    </div>
  </div>
</template>

<script>
import { baseURL, getCollectionByKey } from '@/api/index.js';
import PageFooter from '@/components/PageFooter.vue';
import Appear from '@/components/Appear.vue';

export default {
  name: 'Agency',
  components: {
    PageFooter,
    Appear,
  },
  data() {
    return {
      team: [],
      baseURL,
      animationCounter: -1,
      visibleTeam: {},
      isStaticDataReady: false,
    };
  },
  computed: {
    aboutUs() {
      return this.$store.state.staticData.singletones.aboutUs;
    },
    aboutUsData() {
      const dummyData = {
        title: '',
        description: '',
        abkrLink: '',
        abkrLogo: { path: '' },
        akarLink: '',
        akarLogo: { path: '' },
        logoDescription: '',
      };
      return this.aboutUs || dummyData;
    },
  },
  created() {
    this.fetchTeam();
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.aboutUs) {
        const unwatchAboutUs = this.$watch('aboutUs', function(next) {
          if (next) {
            this.showNext();
            unwatchAboutUs();
          }
        });
      } else {
        this.showNext();
      }
    });
  },
  methods: {
    async fetchTeam() {
      const { data } = await getCollectionByKey({
        key: 'team',
        filter: { inTeam: true },
        options: {
          sort: { _o: 1 },
        },
      });
      this.team = data;
    },
    showNext() {
      this.animationCounter++;
    },
    trackVisibility(index) {
      return (value) => {
        if (value) {
          // shallow copy для триггера реактивности
          this.visibleTeam = {
            ...this.visibleTeam,
            [index]: true,
          };
        }
      };
    },
    getVisibility(index) {
      return (
        this.visibleTeam[index] === true && this.animationCounter >= index + 3
      );
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.agency {
  padding-top: $--page-padding-y-xs;

  @include from('lg') {
    padding-top: $--page-padding-y-lg;
  }

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
    display: inline-block;

    & + & {
      margin-left: 26px;
    }
  }
  &__logo-description {
    margin-top: 16px;
    font-size: 18px;
  }
  &__clients {
    @include from('md') {
      margin-top: 48px;
    }
    @include from('xl') {
      margin-top: 78px;
    }
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
  height: calc(100% - 20px);
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
