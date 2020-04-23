<template>
  <div class="agency">
    <div class="agency__info info">
      <h1 class="info__title">
        Российское независимое агентство, стратегические и&nbsp;креативные
        разработки для&nbsp;брендов в&nbsp;сфере FMCG, девелопмента
        и&nbsp;ритейла.
      </h1>
      <div class="info__about">
        <div class="info__description">
          Системный подход на&nbsp;этапе стратегии и планирования, перфекционизм
          на&nbsp;этапе воплощения, партнерство с&nbsp;командами клиента.
          За&nbsp;каждым проектом мы&nbsp;видим цели и&nbsp;мечты, ценим
          человеческие отношения, поэтому всегда выполняем обещания.
        </div>
        <div class="info__logos">
          <img class="info__logo" :src="abkr" alt="АБКР" />
          <img class="info__logo" :src="akar" alt="АКАР" />
          <div class="info__logo-description">
            Наше агентство входит в&nbsp;состав Ассоциации Брендинговых Компаний
            России и&nbsp;Ассоциации Коммуникационных Агентств России.
          </div>
        </div>
      </div>
    </div>

    <div class="agency__team team">
      <div class="team__list">
        <div class="teammate">
          <img :src="teammate" alt="Имя сотрудника" class="teammate__photo" />
          <div class="teammate__info">
            <div class="teammate__name">
              Имя Фамилия
            </div>
            <div class="teammate__position">
              Должность
            </div>
          </div>
        </div>
        <div class="teammate">
          <img :src="teammate" alt="Имя сотрудника" class="teammate__photo" />
          <div class="teammate__info">
            <div class="teammate__name">
              Имя Фамилия
            </div>
            <div class="teammate__position">
              Должность
            </div>
          </div>
        </div>
        <div class="teammate">
          <img :src="teammate" alt="Имя сотрудника" class="teammate__photo" />
          <div class="teammate__info">
            <div class="teammate__name">
              Имя Фамилия
            </div>
            <div class="teammate__position">
              Должность
            </div>
          </div>
        </div>
        <!-- <div class="teammate">
          <img :src="teammate" alt="Имя сотрудника" class="teammate__photo" />
          <div class="teammate__info">
            <div class="teammate__name">
              Имя Фамилия
            </div>
            <div class="teammate__position">
              Должность
            </div>
          </div>
        </div> -->
        <a
          class="agency__join-us join-us"
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
import teammate from '@/images/teammate.jpg';

import { BASE_URL } from '@/settings.js';
import { getCollectionByKey, getSingletonByKey } from '@/api/index.js';

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
      teammate,
      BASE_URL,
      aboutUs: '',
      team: [],
    };
  },
  created() {
    this.getAgencyInfo();
    this.getTeam();
  },
  methods: {
    async getAgencyInfo() {
      this.aboutUs = await getSingletonByKey('aboutUs');
    },
    async getTeam() {
      this.team = await getCollectionByKey({
        key: 'team',
        filterOptions: { inTeam: true },
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.agency {
  &__join-us {
  }
  &__clients {
  }
}

.info {
  box-sizing: border-box;
  letter-spacing: $--letter-spacing;
  padding: 120px 34px 52px 20px;
  @include from('lg') {
    padding: 162px 32px 156px;
  }

  &__title {
    font-size: 23px;
    margin-bottom: 30px;
  }
  &__about {
  }
  &__description {
    margin-bottom: 44px;
    font-size: 18px;
  }
  &__logos {
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
}

.team {
  margin: 0 20px;
  @include from('lg') {
    margin: 0 32px;
  }

  &__list {
    display: flex;
    flex-flow: column nowrap;
    @include from('sm') {
      flex-flow: row wrap;
      margin: 0 -10px;
    }
    @include from('lg') {
      margin: 0 -14px;
    }
  }
}

.join-us {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  width: 100%;
  flex-basis: 100%;

  @include from('sm') {
    width: calc(50% - 10px * 2);
    flex-basis: calc(50% - 10px * 2);
    margin: 0 10px;
  }

  @include from('md') {
    // width: 25%;
    // flex-basis: 25%;
    width: calc(25% - 10px * 2);
    flex-basis: calc(25% - 10px * 2);
    min-height: 263px;
  }

  @include from('lg') {
    width: calc(25% - 14px * 2);
    flex-basis: calc(25% - 14px * 2);
    margin: 0 14px;
    min-height: 365px;
  }

  @include from('xl') {
    min-height: 365px;
  }

  display: block;
  min-height: 380px;

  padding: 24px 16px 16px;

  border: 4px solid $color-text;
  border-radius: 12px;
  font-size: 30px;
  letter-spacing: $--letter-spacing;
  color: $color-text;
  transition: all 0.5s ease-in-out;

  &:hover {
    border-color: $color-primary;
    background-color: $color-primary;
    color: $color-text--contrast;
  }

  &__title {
    font-size: 30px;
    margin: 0;
    margin-bottom: 86px;
    font-weight: normal;
  }
  &__description {
  }
}

.teammate {
  $teammate: &;

  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  width: 100%;
  flex-basis: 100%;
  @include from('sm') {
    width: 50%;
    flex-basis: 50%;
    padding: 0 10px;
  }
  @include from('md') {
    width: 25%;
    flex-basis: 25%;
  }
  @include from('lg') {
    padding: 0 14px;
  }

  margin-bottom: 28px;

  &__photo {
    width: 100%;
  }
  &__info {
    @include from('lg') {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 82px;
      padding: 22px 14px 13px;
      box-sizing: border-box;
      width: 100%;
      background-color: $color-background;
      transform: translateY(100%);
      transition: all 0.5s ease-in-out;
    }
  }
  &__name {
    font-size: 20px;
    color: $color-text;
    margin-top: 8px;
    @include from('lg') {
      font-size: 25px;

      transition: all 0.5s 0.2s ease-in-out;
      opacity: 0;
      transform: translateY(100%);
    }
  }
  &__position {
    margin-top: 3px;
    font-size: 17px;
    color: $color-text--muted;
    @include from('lg') {
      font-size: 18px;
      color: $color-text;

      transition: all 0.5s 0.3s ease-in-out;
      opacity: 0;
      transform: translateY(100%);
    }
  }
  @include from('lg') {
    &:hover {
      #{$teammate}__info {
        transform: translateY(0);
      }
      #{$teammate}__name {
        transform: translateY(0);
        opacity: 1;
      }
      #{$teammate}__position {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
