<template>
  <div class="contact-form" :class="{ 'contact-form--contrast': contrast }">
    <div class="container">
      <div class="row">
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <h1 class="contact-form__title">Контакты</h1>
          <div class="row">
            <div class="col col-xs-2 col-sm-2 col-lg-6">
              <div class="contact-form__section">
                <div class="contact-form__subtitle">
                  <button
                    class="contact-form__toggle"
                    :class="{
                      'contact-form__toggle--active': currentCity === 'moscow',
                    }"
                    @click="handleCityToggle('moscow')"
                  >
                    Москва
                  </button>
                  <button
                    class="contact-form__toggle"
                    :class="{
                      'contact-form__toggle--active': currentCity === 'chelly',
                    }"
                    @click="handleCityToggle('chelly')"
                  >
                    Челябинск
                  </button>
                </div>
                <p
                  class="contact-form__text contact-form__content"
                  :class="{
                    'contact-form__content--animated': isContactContentAnimated,
                  }"
                  v-html="getContactInfoByKey('address')"
                />
                <p
                  class="contact-form__text contact-form__content"
                  :class="{
                    'contact-form__content--animated': isContactContentAnimated,
                  }"
                >
                  <a
                    class="contact-form__link"
                    :href="`tel:+${getContactInfoByKey('phone')}`"
                  >
                    {{ formatPhone(getContactInfoByKey('phone')) }}
                  </a>
                  <br />
                  <a
                    class="contact-form__link"
                    :href="`mailto:${getContactInfoByKey('email')}`"
                  >
                    {{ getContactInfoByKey('email') }}
                  </a>
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6">
              <div class="contact-form__section">
                <h2 class="contact-form__subtitle">Заказ</h2>
                <p class="contact-form__text">
                  <a
                    class="contact-form__link"
                    :href="`tel:+${getContactInfoByKey('contactPhone')}`"
                  >
                    {{ formatPhone(getContactInfoByKey('contactPhone')) }}
                  </a>
                  <br />
                  <a
                    class="contact-form__link"
                    :href="`mailto:${getContactInfoByKey('contactEmail')}`"
                  >
                    {{ getContactInfoByKey('contactEmail') }}
                  </a>
                </p>
                <p class="contact-form__text contact-form__person">
                  {{ getContactInfoByKey('name') }}
                  <br />
                  {{ getContactInfoByKey('position') }}
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-12 col-2xl-6">
              <div class="contact-form__section">
                <p class="contact-form__social">
                  <a
                    :href="common.instagram"
                    target="_blank"
                    class="contact-form__social-link"
                    >INSTAGRAM</a
                  >
                  <a
                    :href="common.facebook"
                    target="_blank"
                    class="contact-form__social-link"
                    >FACEBOOK</a
                  >
                  <a
                    :href="common.vk"
                    target="_blank"
                    class="contact-form__social-link"
                    >VKONTAKTE</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <contact-form :contrast="contrast" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingletonByKey } from '@/api/index.js';
import ContactForm from '@/components/ContactForm.vue';

export default {
  name: 'ContactsInfo',
  components: {
    ContactForm,
  },
  props: {
    contrast: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      currentCity: 'moscow',
      contactInfo: {},
      isContactContentAnimated: false,
    };
  },
  computed: {
    common() {
      const commonData = this.$store.state.staticData.singletones.common;
      return commonData ? commonData : {};
    },
  },
  created() {
    this.getContactInfo();
  },
  methods: {
    changeCity(city) {
      this.currentCity = city;
      this.$emit('change-city', city);
    },
    async getContactInfo() {
      this.contactInfo = await getSingletonByKey('locations');
    },
    getContactInfoByKey(key) {
      const { contactInfo, currentCity } = this;
      const keyByCity = currentCity + '_' + key;
      return contactInfo[keyByCity];
    },
    formatPhone(phone) {
      if (phone) {
        const match = phone.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
          return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }
        return null;
      }
    },
    animateContactContent() {
      this.isContactContentAnimated = true;

      setTimeout(() => {
        this.isContactContentAnimated = false;
      }, 350);
    },
    handleCityToggle(city) {
      const { animateContactContent, currentCity } = this;

      if (currentCity !== city) {
        animateContactContent();

        setTimeout(() => {
          this.currentCity = city;
          this.$emit('change-city', city);
        }, 240); // меняем город во время анимации
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.contact-form {
  $block: &;
  padding-bottom: 56px;

  &__title {
    margin: 0;
    font-size: $--font-size-180;
    line-height: 1;
    font-weight: normal;

    margin-bottom: 34px;
    @include from('md') {
      max-width: 100%;
      margin-bottom: 70px;
    }
    @include from('lg') {
      font-size: $--font-size-200;
    }
    @include from('xl') {
      margin-bottom: 100px;
    }
  }

  &__section {
    margin: 30px 0;
    line-height: 1.2;

    font-size: 22px;
    @include from('md') {
      font-size: 26px;
    }
  }

  a {
    color: inherit;
  }

  &__toggle {
    background: none;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: inherit;
    line-height: inherit;
    cursor: pointer;
    text-transform: uppercase;
    color: inherit;
    position: relative;
    transition-property: color;
    transition-duration: $--duration-100;
    transition-timing-function: $--timing-in-out-cubic;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 8px);
      height: 2px;
      background: $--color-brand;
      transition-timing-function: $--timing-in-out-cubic;
      transition-duration: $--duration-1000;
      transition-property: transform;
      transform-origin: left center;
      transform: scaleX(0);
    }
    &:hover {
      color: $--color-brand;
    }

    &--active {
      cursor: default;
      &:hover {
        color: inherit;
      }
      &:after {
        transform: scaleX(1);
      }
    }

    & + & {
      margin-left: 40px;
    }
  }

  &__subtitle {
    margin: 0;
    margin-bottom: 20px;
    @include from('lg') {
      margin-bottom: 66px;
    }
    font-size: $--font-size-100;
    font-weight: normal;
    text-transform: uppercase;
    white-space: nowrap;
    line-height: 1;
    display: block;
    color: inherit;
  }

  &__social {
    display: flex;
    justify-content: space-between;
    margin: 0;
    margin-top: 40px;
    flex-wrap: wrap;

    @include from('sm') {
      flex-wrap: nowrap;
    }
    @include from('xl') {
      margin-top: 0;
    }
  }

  &__social-link {
    display: block;
    font-size: 18px;
    transition-property: color;
    transition-duration: $--duration-100;
    transition-timing-function: $--timing-in-out-cubic;
    margin-right: 16px;
    margin-bottom: 16px;

    & + & {
      @include from('sm') {
        margin-left: 16px;
        margin-bottom: 0;
      }
    }

    @include from('md') {
      font-size: 22px;
    }

    &:hover {
      color: $--color-brand;
    }
  }

  &__text {
    margin: 0;
    margin-bottom: 22px;
  }
  &__link {
    transition: all 0.2s ease-in-out;
    &:hover {
      color: $--color-brand;
    }
  }

  &__content {
    &--animated {
      animation: contactContentAnimation $--duration-1000 $--timing-in-out-cubic;

      @keyframes contactContentAnimation {
        0% {
          transform: translateY(0);
          opacity: 1;
        }
        50% {
          transform: translateY(10px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }

  &--contrast {
    padding-top: 85px;
    background-color: $--color-background--contrast;
    color: $--color-text--contrast;

    #{$block}__person {
      color: $--color-text--muted;
    }
  }
}
</style>
