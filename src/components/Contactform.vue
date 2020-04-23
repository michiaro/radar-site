<template>
  <div class="contact-form">
    <div class="grid">
      <div class="row">
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <h1 class="contacts__title">Контакты</h1>
          <div class="row">
            <div class="col col-xs-2 col-sm-2 col-lg-6">
              <div class="contacts__section">
                <div class="contacts__subtitle">
                  <button
                    class="contacts__toggle"
                    :class="{
                      'contacts__toggle--active': currentCity === 'moscow',
                    }"
                    @click="changeCity('moscow')"
                  >
                    Москва
                  </button>
                  <button
                    class="contacts__toggle"
                    :class="{
                      'contacts__toggle--active': currentCity === 'chelly',
                    }"
                    @click="changeCity('chelly')"
                  >
                    Челябинск
                  </button>
                </div>
                <p class="contacts__text">
                  АКЦ&nbsp;«Челябинск&nbsp;Сити» <br />
                  офис&nbsp;1209, ул.&nbsp;Кирова,&nbsp;159 <br />
                  Челябинск
                </p>
                <p class="contacts__text">
                  <a class="contacts__link" href="tel:+73512111150"
                    >+7 (351) 211-11-50</a
                  ><br />
                  <a class="contacts__link" href="mailto:info@radar-online.ru"
                    >info@radar-online.ru</a
                  >
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6">
              <div class="contacts__section">
                <h2 class="contacts__subtitle">Заказ</h2>
                <p class="contacts__text">
                  <a class="contacts__link" href="tel:+79227000100"
                    >+7 (922) 700-01-00</a
                  ><br />
                  <a
                    class="contacts__link"
                    href="mailto:mlopatina@radar-online.ru"
                    >mlopatina@radar-online.ru</a
                  >
                </p>
                <p class="contacts__text">
                  Мария Лопатина<br />
                  Account Director
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6 col-xl-bottom">
              <div class="contacts__section">
                <p class="contacts__social">
                  <a href="#" class="contacts__social-link">INSTAGRAM</a>
                  <a href="#" class="contacts__social-link">FACEBOOK</a>
                  <a href="#" class="contacts__social-link">VKONTAKTE</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <form class="form" @submit.prevent="onSubmit">
            <h2 class="contacts__title form__title">
              Обсудить задачу
            </h2>
            <div class="row">
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field">
                  <input
                    v-model="name"
                    type="text"
                    class="form__input"
                    placeholder="Ваше имя"
                  />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field">
                  <input
                    v-model="contact"
                    type="text"
                    class="form__input"
                    placeholder="E-mail или телефон"
                  />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-4 col-lg-12">
                <div class="form__field">
                  <textarea
                    v-model="message"
                    type="text"
                    class="form__input form__input--textarea"
                    placeholder="Сообщение"
                    rows="8"
                  />
                </div>
              </div>
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
                  <router-link to="/policy">
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
export default {
  name: 'ContactForm',
  data() {
    return {
      isFormSent: false,
      name: '',
      contact: '',
      message: '',
      currentCity: 'moscow',
    };
  },
  methods: {
    onSubmit() {
      console.log('submit');
    },
    changeCity(city) {
      this.currentCity = city;
      this.$emit('change-city', city);
    },
    // при успешной отправке формы отправляем событие в метрику
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

.contacts {
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

    & + & {
      margin-left: 40px;
    }

    &--active {
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
    padding: 0.38em 1em 0.62em;

    @include from('lg') {
      font-size: $--font-size-120;
    }

    &--textarea {
      resize: vertical;
    }

    &--button {
      background-color: $--color-brand;
      border-color: $--color-brand;
      color: $--color-text--contrast;
      cursor: pointer;
    }
  }

  &__terms {
    font-size: $--font-size-80;
    color: $--color-text--muted;

    a {
      text-decoration: underline;
    }
  }
}
</style>
