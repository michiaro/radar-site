<template>
  <div :class="['form', { 'form--error': displayError }]">
    <form
      v-if="!isFormSent"
      class="form__form"
      :class="{ 'form--contrast': contrast }"
      @submit.prevent="validate"
    >
      <h2 class="contact-form__title form__title">Связаться с&nbsp;нами</h2>
      <div class="row">
        <div
          v-for="(field, key) in formData"
          :key="key"
          :class="[
            'col col-xs-2 ',
            { 'col-sm-2 col-lg-6': key !== 'message' },
            { 'col-sm-4 col-lg-12': key === 'message' },
          ]"
        >
          <div class="form__field">
            <input
              v-if="key !== 'message'"
              v-model="formData[key].value"
              type="text"
              class="form__input"
              :placeholder="field.label"
              :required="field.required"
              @input="resetError"
            />
            <div v-if="field.required" class="form__input-error">
              обязательное поле
            </div>

            <textarea
              v-if="key === 'message'"
              v-model="formData[key].value"
              type="text"
              class="form__input form__input--textarea"
              placeholder="Чем мы можем быть вам полезны?"
              rows="8"
            />
          </div>
        </div>
      </div>
      <div class="row row-md-middle">
        <div class="col col-xs-2 col-sm-2 col-lg-6">
          <div class="form__field form__terms">
            Заполняя форму, вы даете согласие на&nbsp;обработку
            <router-link to="/policy" class="form__link">
              персональных данных
            </router-link>
          </div>
        </div>
        <div class="col col-xs-2 col-sm-2 col-sm-last col-lg-6">
          <div class="form__field">
            <button
              class="button"
              :class="{ 'button--contrast': contrast }"
              type="submit"
              @click="validate"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </form>
    <h2 v-else class="form__result contact-form__title form__title">
      {{ result }}
    </h2>
  </div>
</template>

<script>
import { sendForm } from "@/api/index";

const emptyFormData = {
  name: {
    value: "",
    label: "Имя*",
    required: true,
  },
  phone: {
    value: "",
    label: "Контактный телефон*",
    required: true,
  },
  companyName: {
    value: "",
    label: "Компания",
    required: false,
  },
  jobTitle: {
    value: "",
    label: "Должность",
    required: false,
  },
  email: {
    value: "",
    label: "Электронная почта",
    required: false,
  },
  city: {
    value: "",
    label: "Город",
    required: false,
  },
  message: {
    value: "",
    label: "Сообщение",
    required: false,
  },
};

export default {
  name: "ContactForm",
  props: {
    contrast: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isFormSent: false,
      isSuccess: false,
      formData: emptyFormData,
      displayError: false,
    };
  },
  computed: {
    formErrorMessage() {
      const common = this.$store.state.staticData.singletones.common;
      return common ? common.formErrorMessage : "";
    },
    formSuccessMessage() {
      const common = this.$store.state.staticData.singletones.common;
      return common ? common.formSuccessMessage : "";
    },
    result() {
      const { isFormSent, isSuccess, formErrorMessage, formSuccessMessage } =
        this;

      if (isFormSent) {
        return isSuccess ? formSuccessMessage : formErrorMessage;
      }
      return "";
    },
  },
  methods: {
    async onSubmit() {
      const { formData } = this;
      const result = await sendForm(formData);
      this.isFormSent = true;

      if (result === 1) {
        document.dispatchEvent(new Event("form-submit-success"));
        this.isSuccess = true;
        this.formData = emptyFormData;

        if (yaCounter1653081) {
          yaCounter1653081.reachGoal("order-submit");
          return true;
        }
      }

      setTimeout(() => {
        this.isFormSent = false;
        this.isSuccess = false;
      }, 4000);
    },
    validate() {
      let isError = false;
      for (const key in this.formData) {
        if (Object.hasOwnProperty.call(this.formData, key)) {
          const field = this.formData[key];
          if (field.required && field.value.length === 0) {
            isError = true;
          }
        }
      }

      this.displayError = isError;

      if (!this.displayError) {
        this.onSubmit();
      }
    },
    resetError() {
      this.displayError = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/shared/_globals.scss";

.form {
  $form: &;

  margin-top: 72px;
  @include from("lg") {
    margin-top: 106px;
  }
  @include from("xl") {
    margin-top: 0;
  }
  &__title {
    max-width: 60%;
    margin-bottom: 34px;
    @include from("md") {
      max-width: 100%;
      margin-bottom: 70px;
    }
    @include from("xl") {
      margin-bottom: 100px;
    }
  }
  &__field {
    margin-bottom: 1vmax;
  }

  &__input-error {
    display: none;
    color: $--color-brand;
    padding-top: 3px;
  }

  &__input {
    box-sizing: border-box;
    width: 100%;
    font-size: $--font-size-90;
    line-height: 1;
    border: 2px solid $--color-text;
    padding: 14px 14px 16px;
    height: 40px;
    border-radius: 0;
    box-shadow: none;
    transition: all $--duration-200 $--timing-in-out-cubic;

    &:hover {
      border-color: $--color-gray-800;
    }

    @include from("lg") {
      padding: 20px 20px 24px;
    }

    &--textarea {
      resize: vertical;
      height: auto;
    }
  }

  a {
    color: inherit;
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

  &--contrast {
    #{$form}__input {
      background-color: $--color-background--contrast;
      border: 2px solid $--color-text--contrast;
      color: $--color-text--muted;

      &:hover {
        border-color: $--color-gray-300;
      }

      .button {
        color: $--color-text--contrast;
      }
    }
  }

  &--error {
    input:invalid {
      border-color: $--color-brand;
      position: relative;
    }

    #{$form}__input-error {
      display: block;
    }
  }
}
</style>
