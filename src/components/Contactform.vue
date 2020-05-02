<template>
  <div class="contact-form" :class="{ 'contact-form--contrast': contrast }">
    <div class="grid">
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
                    @click="changeCity('moscow')"
                  >
                    Москва
                  </button>
                  <button
                    class="contact-form__toggle"
                    :class="{
                      'contact-form__toggle--active': currentCity === 'chelly',
                    }"
                    @click="changeCity('chelly')"
                  >
                    Челябинск
                  </button>
                </div>
                <p class="contact-form__text" v-html="getContactInfoByKey('address')" />
                <p class="contact-form__text">
                  <a class="contact-form__link" :href="`tel:+${getContactInfoByKey('phone')}`">{{
                    formatPhone(getContactInfoByKey('phone'))
                  }}</a
                  ><br />
                  <a class="contact-form__link" :href="`mailto:${getContactInfoByKey('email')}`">{{
                    getContactInfoByKey('email')
                  }}</a>
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6">
              <div class="contact-form__section">
                <h2 class="contact-form__subtitle">Заказ</h2>
                <p class="contact-form__text">
                  <a class="contact-form__link" :href="`tel:+${getContactInfoByKey('contactPhone')}`">{{
                    formatPhone(getContactInfoByKey('contactPhone'))
                  }}</a
                  ><br />
                  <a class="contact-form__link" :href="`mailto:${getContactInfoByKey('contactEmail')}`">{{
                    getContactInfoByKey('contactEmail')
                  }}</a>
                </p>
                <p class="contact-form__text contact-form__person">
                  {{ getContactInfoByKey('name') }}
                  <br />
                  {{ getContactInfoByKey('position') }}
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-10 col-2xl-6">
              <div class="contact-form__section">
                <p class="contact-form__social">
                  <a href="https://www.facebook.com/RadarAdvertising" target="_blank" class="contact-form__social-link"
                    >INSTAGRAM</a
                  >
                  <a href="https://www.facebook.com/RadarAdvertising" target="_blank" class="contact-form__social-link"
                    >FACEBOOK</a
                  >
                  <a href="https://vk.com/radaradvertising" target="_blank" class="contact-form__social-link"
                    >VKONTAKTE</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <form class="form" @submit.prevent="onSubmit">
            <h2 class="contact-form__title form__title">
              Обсудить задачу
            </h2>
            <div class="row">
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field">
                  <input v-model="formData.name" type="text" class="form__input" placeholder="Ваше имя" />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field">
                  <input v-model="formData.contact" type="text" class="form__input" placeholder="E-mail или телефон" />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-4 col-lg-12">
                <div class="form__field">
                  <textarea
                    v-model="formData.message"
                    type="text"
                    class="form__input form__input--textarea"
                    placeholder="Сообщение"
                    rows="8"
                  />
                </div>
              </div>
            </div>
            <div class="row row-md-middle">
              <div class="col col-xs-2 col-sm-2 col-sm-last col-lg-6">
                <div class="form__field">
                  <button class="form__input form__input--button" type="submit">
                    Отправить
                  </button>
                </div>
              </div>
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field form__terms">
                  Заполняя форму, вы даете согласие на&nbsp;обработку
                  <router-link to="/policy" class="form__link">
                    персональных данных
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- .form-result#result(v-if="form.isSent")
        h2.form-title Сообщение отправлено
        | Ваше сообщение отправлено. Спасибо! -->
</template>

<script>
import { getSingletonByKey } from '@/api/index.js';

export default {
  name: 'ContactForm',
  props: {
    contrast: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isFormSent: false,
      formData: {
        name: '',
        contact: '',
        message: '',
      },
      currentCity: 'moscow',
      contactInfo: {},
    };
  },
  created() {
    this.getContactInfo();
  },
  methods: {
    onSubmit() {
      console.log('submit');
    },
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
    // при успешной отправке формы отправляем событие в метрику,
    //     if (yaCounter1653081) {
    //       yaCounter1653081.reachGoal('order-submit');
    //       return true;
    //     }
    //   });
    // },
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
    transition: 0.2s ease-in-out;
    padding-top: 14px;
    margin-top: -14px;

    background: linear-gradient(90.86343deg, $--color-brand 50%, $--color-brand 50%) top left/0% 2px no-repeat;

    $active-background: linear-gradient(90.86343deg, $--color-brand 50%, $--color-brand 50%) top left/100% 2px no-repeat;

    &:hover {
      background: $active-background;
    }

    &--active {
      background: $active-background;
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

    @include from('xl') {
      margin-top: 0;
    }
  }

  &__social-link {
    display: block;
    font-size: 18px;
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
  .form {
    margin-top: 72px;
    @include from('lg') {
      margin-top: 106px;
    }
    @include from('xl') {
      margin-top: 0;
    }
    &__title {
      max-width: 60%;
      margin-bottom: 34px;
      @include from('md') {
        max-width: 100%;
        margin-bottom: 70px;
      }
      @include from('xl') {
        margin-bottom: 100px;
      }
    }
    &__field {
      margin-bottom: $--gutter-xs;
      @include from('lg') {
        margin-bottom: $--gutter-lg;
      }
    }

    &__input {
      box-sizing: border-box;
      width: 100%;
      font-size: $--font-size-100;
      line-height: 1;
      border: 2px solid $--color-text;
      padding: 14px 14px 16px;
      height: 52px;
      border-radius: 0;
      box-shadow: none;

      @include from('lg') {
        padding: 20px 20px 24px;
        height: 74px;
        font-size: $--font-size-120;
      }

      &--textarea {
        resize: vertical;
        height: auto;
      }

      &--button {
        background-color: $--color-brand;
        border-color: $--color-brand;
        color: $--color-text--contrast;
        cursor: pointer;
        letter-spacing: $--letter-spacing;
        text-transform: uppercase;
        padding: 12px;
      }
    }

    &__terms {
      font-size: $--font-size-80;
      color: $--color-text--muted;

      a {
        text-decoration: underline;
      }
    }

    &__link {
      transition: all 0.2s ease-in-out;

      &:hover {
        text-decoration: none;
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

    .form__input {
      background-color: $--color-background--contrast;
      border: 2px solid $--color-text--contrast;
      color: $--color-text--muted;

      &--button {
        color: $--color-text--contrast;
      }
    }

    // #{$block}
  }
}
</style>
