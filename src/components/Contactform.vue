<template lang="pug">
  .contacts-form__right
    .form-wrapper
      form.contacts-form#feedback(action="", v-if="!form.isSent", @submit.prevent="submit(form, form.url)")
        h2.form-title Оставить заявку
        p.contacts-form__left-text
          | Мы с радостью ответим на ваши вопросы. Заполнение формы займет всего пару минут.
        .contacts-inputs
          .small-input-block
            label(
              for="fullname"
            )
              p.input-label.star Ваше имя
            input.small-input(
              v-model="form.data[0].data",
              name="fullname",
              type="text",
              id="fullname",
              required
            )
          .small-input-block
            label(
              for="phone"
            )
              p.input-label Телефон
            input.small-input(
              v-model="form.data[1].data",
              id="phone",
              name="phone",
              type="text"
            )
          .small-input-block
            label(
              for="email"
            )
              p.input-label.star Электронная почта
            input.small-input(
              v-model="form.data[2].data",
              name="email",
              id="email",
              type="text",
              required
            )
        .contacts-textarea
          label(
            for="message"
          )
            p.input-label.star Сообщение
          textarea.contacts-textarea(
            v-model="form.data[3].data",
            name="message",
            id="message",
            rows="9",
            required
          )
        .contacts-submit
          span.contacts-submit__tip * — поля, обязательные для заполнения
          button.contacts-submit__button.submit_btn(
            type="submit",
            ) ОТПРАВИТЬ
      .form-result#result(v-if="form.isSent")
        h2.form-title Сообщение отправлено
        | Ваше сообщение отправлено. Спасибо!

</template>

<script>
export default {
  name: "Contactform",
  props: {
    // msg: String
  },
  data() {
    return {
      form: {
        subject: "Новая заявка с сайта radar-online.ru",
        isSent: false,
        url: "/process.php",
        data: [
          {
            label: "Имя",
            data: ""
          },
          {
            label: "Телефон",
            data: ""
          },
          {
            label: "Электронная почта",
            phone: ""
          },
          {
            label: "Сообщение",
            data: ""
          }
        ]
      }
    };
  },
  methods: {
    submit(form, url) {
      this.post(form, url, function(result) {
        if (result) {
          form.data.forEach(function(field) {
            field.data = "";
          })
          form.isSent = true;
          setTimeout(function() {
            form.isSent = false;
          }, 4000);
        }
      });
    },
    post(data, url, success) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, !0);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          success(xhr.responseText);
        }
      };
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/shared/globals';

.form-block {
  margin-top: 50px;
  display: flex;
  flex-flow: row wrap;
}

.contacts-form {
  margin-top: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-flow: row wrap;
}

.contacts-form__left {
  color: #292e35;
  vertical-align: top;
  display: flex;
  flex-flow: row wrap;
  padding: 8px;
}

.contacts-form__left-text {
  margin-bottom: 15px;
  @include from-breakpoint('lg') {
    padding-right: 40%;
  }
}

@include from-breakpoint('lg') {
  .contacts-form__left {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    max-width: 25%;
    margin-top: 20px;
  }
}

@include from-breakpoint('xl') {
  .contacts-block__content {
    padding: 70px 0 80px 0;
  }
}

.bb-text {
  margin-bottom: 25px;
}

.bb-sn__img {
  display: inline-block;
  margin-left: 15px;
}

.bb-sn__img.nm {
  margin-left: 0;
}

.contacts-form__right {
  width: 100%;
  margin: 30px 8px;
  display: flex;
  flex-flow: row wrap;
  vertical-align: top;
  box-sizing: border-box;
}

.form-title {
  font-size: 36px;
  font-weight: normal;
  font-family: "ProximaNova-Light";
  color: #292e35;
}

.small-input-block {
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  vertical-align: top;
}

.small-input-block.nm {
  margin-left: 0;
}

.small-input,
.cont-textarea {
  padding: 5px;
  border: 1px solid #999;
  width: 100%;
  border-radius: 0;
  box-sizing: border-box;
}

textarea {
  border: 1px solid #999;
}

.input-label {
  color: #292e35;
  margin-bottom: 10px;
}

.input-label.star {
  position: relative;
  display: inline-block;

  &:before {
    content: "*";
    color: #e30613;
    font-size: 22px;
    font-family: "ProximaNova-Bold";
    position: absolute;
    right: -12px;
    top: 0;
  }
}

.contacts-inputs {
  margin-bottom: 10px;
  width: 100%;
}

.contacts-textarea {
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.contacts-submit__tip {
  color: #999;
  font-size: 12px;
}

.contacts-submit__button {
  display: block;
  padding: 10px 20px;
  color: #292e35;
  font-size: 14px;
  border-radius: 30px;
  border: 1px solid #e30613;
  margin: 15px 0;
  transition: all 0.3s linear;
  letter-spacing: 2px;
  background: #fff;
  cursor: pointer;
}

.contacts-submit__button:hover {
  color: #fff;
  background-color: #e30613;
}

.grey {
  color: #959595;
}

.form-result {
  width: 100%;
  margin-top: 10px;
}

@include from-breakpoint('md') {
  .small-input-block {
    width: 30%;
    margin-right: 2.8%;
    display: inline-block;
  }
  .small-input-block:last-child {
    margin-right: 0;
  }
  .contacts-submit {
    display: flex;
    justify-content: space-between;
    width: 99%;
  }
  .contacts-textarea {
    width: 99%;
  }
}

@include from-breakpoint('lg') {
  .contacts-form__right {
    width: 73%;
  }
  .contacts-textarea {
    width: 98%;
  }
  .contacts-submit {
    width: 98%;
  }
}

@include from-breakpoint('xl') {
  .contacts-form__right {
    width: 75%;
    margin: 30px 0;
  }
  .form-title {
    margin-bottom: 45px;
  }
  .small-input-block {
    width: 32%;
    margin-right: 1%;
  }
  .contacts-textarea {
    width: 99%;
  }
  .contacts-submit {
    width: 99%;
  }
}

.home-form {
  &.contacts-form__right {
    margin-left: 8px;
    max-width: 100%;
    width: auto;
    box-sizing: border-box;
    @include from-breakpoint('md') {
      margin: 0 15px;
    }
    @include from-breakpoint('xl') {
      margin-left: 0;
    }
  }

  .form-title {
    margin-bottom: 15px;
  }

  .contacts-form__left-text {
    width: 100%;
  }
}
</style>
