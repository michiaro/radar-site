<template>
  <div class="contacts">
    <div class="grid">
      <div class="row">
        <div class="col col-xs-2 col-sm-4 col-lg-6">
          <h1 class="contacts__title">Контакты</h1>
          <div class="row">
            <div class="col col-xs-2 col-sm-2 col-lg-6">
              <div class="contacts__section">
                <h2 class="contacts__subtitle">
                  <button class="contacts__toggle">Москва</button>
                  <button class="contacts__toggle">Челябинск</button>
                </h2>
                <p>
                  АКЦ&nbsp;«Челябинск&nbsp;Сити» офис&nbsp;1209, ул.&nbsp;Кирова,&nbsp;159 Челябинск
                </p>
                <p>
                  <a href="tel:+73512111150">+7 (351) 211-11-50</a><br />
                  <a href="mailto:info@radar-online.ru">info@radar-online.ru</a>
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6">
              <div class="contacts__section">
                <h2 class="contacts__subtitle">Заказ</h2>
                <p>
                  <a href="tel:+79227000100">+7 (922) 700-01-00</a><br />
                  <a href="mailto:mlopatina@radar-online.ru">mlopatina@radar-online.ru</a>
                </p>
                <p>
                  Мария Лопатина<br />
                  Account Director
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6">
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
          <h1 class="contacts__title">Обсудить задачу</h1>
          <form class="form" @submit.prevent="onSubmit">
            <div class="row">
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field">
                  <input v-model="name" type="text" class="form__input" placeholder="Ваше имя" />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field">
                  <input v-model="contact" type="text" class="form__input" placeholder="E-mail или телефон" />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-4 col-lg-12">
                <div class="form__field">
                  <textarea
                    v-model="message"
                    type="text"
                    class="form__input form__input--textarea"
                    placeholder="Сообщение"
                    rows="5"
                  />
                </div>
              </div>
              <div class="col col-xs-2 col-sm-2 col-sm-last col-lg-6">
                <div class="form__field">
                  <button class="form__input form__input--button" type="submit">Отправить</button>
                </div>
              </div>
              <div class="col col-xs-2 col-sm-2 col-lg-6">
                <div class="form__field form__terms">
                  Заполняя форму, вы даете согласие на обработку <a href="#">персональных данных</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  data() {
    return {
      name: '',
      contact: '',
      message: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('submit');
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.contacts {
  &__title {
    // margin: 1.5em 0 1em;
    font-size: $--font-size-180;
    line-height: 1;
    font-weight: normal;
    @include from('lg') {
      margin: 2.5em 0 2em;
      font-size: $--font-size-200;
    }
  }

  &__section {
    margin: 30px 0;
  }

  a {
    color: inherit;
  }

  &__subtitle {
    margin: 0 0 1em;
    @include from('lg') {
      margin-bottom: 2.5em;
    }
    font-size: $--font-size-100;
    font-weight: normal;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__toggle {
    background: none;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: inherit;
    line-height: inherit;
    cursor: pointer;
    text-transform: inherit;

    & + & {
      margin-left: 1em;
    }
  }

  &__social {
    display: flex;
    justify-content: space-between;
  }

  &__social-link {
    display: block;
  }
}
</style>
