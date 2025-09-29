<template>
  <div class="contact-form" :class="{ 'contact-form--contrast': contrast }">
    <div class="container">
      <div class="row">
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <h1 class="contact-form__title">Контакты</h1>

          <div class="row">
            <div class="col col-xs-2">
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
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-xs-2 col-sm-2 col-lg-6">
              <div class="contact-form__section contact-form__section--top">
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
                    {{ formatPhone(getContactInfoByKey("phone")) }}
                  </a>
                  <br />
                  <a
                    class="contact-form__link"
                    :href="`mailto:${getContactInfoByKey('email')}`"
                  >
                    {{ getContactInfoByKey("email") }}
                  </a>
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-6">
              <div class="contact-form__section contact-form__section--top">
                <p class="contact-form__text">
                  <a
                    class="contact-form__link"
                    :href="`tel:+${getContactInfoByKey('contactPhone')}`"
                  >
                    {{ formatPhone(getContactInfoByKey("contactPhone")) }}
                  </a>
                  <br />
                  <a
                    class="contact-form__link"
                    :href="`mailto:${getContactInfoByKey('contactEmail')}`"
                  >
                    {{ getContactInfoByKey("contactEmail") }}
                  </a>
                </p>
                <p class="contact-form__text contact-form__person">
                  {{ getContactInfoByKey("name") }}
                  <br />
                  {{ getContactInfoByKey("position") }}
                </p>
              </div>
            </div>
            <div class="col col-xs-2 col-sm-2 col-xl-12 col-2xl-6">
              <div class="contact-form__section">
                <p class="contact-form__social">
                  <a
                    :href="common.telegram"
                    class="social-link"
                    target="_blank"
                  >
                    <svg
                      class="social-link__icon"
                      width="25"
                      height="21"
                      viewBox="0 0 25 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.8184 0.0340574C23.9886 -0.0322005 24.1815 -0.000338972 24.3213 0.117065C24.4612 0.234434 24.526 0.41849 24.4903 0.597534L20.4991 19.5975C20.4675 19.7558 20.3619 19.8895 20.2149 19.9559C20.0679 20.0222 19.8974 20.0134 19.7579 19.9325L13.1749 16.1122L10.3965 20.8007C10.2671 20.9724 10.0419 21.0428 9.83795 20.9745C9.63417 20.9062 9.49712 20.7148 9.49713 20.4999L9.50006 13.4999C9.50012 13.3587 9.55947 13.2235 9.66412 13.1288L16.4766 6.96375L7.25494 12.4296C7.1182 12.5106 6.95106 12.5219 6.80474 12.4598L0.804743 9.91492C0.617517 9.83548 0.49703 9.6505 0.500056 9.44714C0.503097 9.24389 0.629074 9.06302 0.818415 8.98914L23.8184 0.0340574Z"
                        fill="#F9E198"
                      />
                    </svg>
                  </a>
                  <a :href="common.behance" class="social-link" target="_blank">
                    <svg
                      class="social-link__icon"
                      width="33"
                      height="20"
                      viewBox="0 0 33 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5983 0C10.5508 0 11.43 0.0706714 12.236 0.282686C13.042 0.424028 13.7014 0.706714 14.2875 1.06007C14.8737 1.41343 15.3133 1.90813 15.6064 2.54417C15.8995 3.18021 16.046 3.9576 16.046 4.80565C16.046 5.79505 15.8262 6.64311 15.3133 7.27915C14.8737 7.91519 14.141 8.48057 13.2618 8.90459C14.5074 9.25795 15.4599 9.89399 16.046 10.742C16.6322 11.5901 16.9985 12.6502 16.9985 13.8516C16.9985 14.841 16.7787 15.689 16.4124 16.3958C16.046 17.1025 15.4599 17.7385 14.8004 18.1625C14.141 18.5866 13.335 18.9399 12.4558 19.1519C11.5766 19.364 10.6973 19.5053 9.81811 19.5053H0V0H9.5983ZM9.01214 7.91519C9.81811 7.91519 10.4775 7.70318 10.9904 7.34982C11.5033 6.99647 11.7231 6.36042 11.7231 5.58304C11.7231 5.15901 11.6498 4.73498 11.5033 4.4523C11.3568 4.16961 11.137 3.9576 10.8439 3.74558C10.5508 3.60424 10.2577 3.4629 9.89138 3.39223C9.52503 3.32156 9.15868 3.32155 8.71906 3.32155H4.46944V7.91519H9.01214ZM9.23195 16.2544C9.67157 16.2544 10.1112 16.1837 10.4775 16.1131C10.8439 16.0424 11.2102 15.9011 11.5033 15.689C11.7964 15.477 12.0162 15.265 12.236 14.9117C12.3825 14.5583 12.5291 14.1343 12.5291 13.6396C12.5291 12.6502 12.236 11.9435 11.6498 11.4488C11.0637 11.0247 10.2577 10.8127 9.30522 10.8127H4.46944V16.2544H9.23195ZM23.373 16.1837C23.9591 16.7491 24.8383 17.0318 26.0107 17.0318C26.8166 17.0318 27.5493 16.8198 28.1355 16.4664C28.7216 16.0424 29.088 15.6184 29.2345 15.1943H32.8247C32.2386 16.8905 31.3593 18.0919 30.187 18.8693C29.0147 19.576 27.6226 20 25.9374 20C24.7651 20 23.7393 19.788 22.7868 19.4346C21.8343 19.0813 21.1016 18.5866 20.4422 17.8799C19.7828 17.2438 19.2699 16.4664 18.9768 15.5477C18.6104 14.629 18.4639 13.6396 18.4639 12.5088C18.4639 11.4488 18.6104 10.4594 18.9768 9.54064C19.3431 8.62191 19.856 7.84452 20.5154 7.13781C21.1749 6.50177 21.9808 5.9364 22.8601 5.58304C23.8126 5.22968 24.7651 5.01767 25.9374 5.01767C27.183 5.01767 28.282 5.22968 29.2345 5.72438C30.187 6.21908 30.9197 6.78445 31.5059 7.63251C32.092 8.40989 32.5316 9.32862 32.8247 10.318C32.9713 11.3074 33.0445 12.2968 32.9713 13.4276H22.3472C22.3472 14.5583 22.7868 15.6184 23.373 16.1837ZM27.9889 8.76325C27.476 8.26855 26.6701 7.98587 25.7176 7.98587C25.0582 7.98587 24.5453 8.12721 24.1057 8.33922C23.666 8.55124 23.373 8.83392 23.0799 9.11661C22.7868 9.39929 22.6403 9.75265 22.567 10.106C22.4937 10.4594 22.4205 10.742 22.4205 11.0247H29.0147C28.8682 9.96466 28.5018 9.25795 27.9889 8.76325ZM21.5412 1.34276H29.7474V3.25088H21.5412V1.34276Z"
                        fill="#F9E198"
                      />
                    </svg>
                  </a>
                  <a :href="common.vk" class="social-link" target="_blank">
                    <svg
                      class="social-link__icon"
                      width="28"
                      height="18"
                      viewBox="0 0 28 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.2448 18C5.67832 18 0.223776 11.2554 0 0.0144119H4.81119C4.96503 8.25781 8.48951 11.7454 11.2867 12.466V0.0144119H15.8042V7.1193C18.5594 6.81665 21.4685 3.57406 22.4476 0H26.951C26.5838 1.8501 25.8503 3.6023 24.7963 5.14712C23.7423 6.69194 22.3904 7.99619 20.8252 8.97838C22.5719 9.87424 24.1145 11.1415 25.3513 12.6965C26.588 14.2516 27.4908 16.0592 28 18H23.035C21.972 14.5845 19.3147 11.9327 15.8042 11.5725V18H15.2587H15.2448Z"
                        fill="#F9E198"
                      />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-xs-2 col-sm-4 col-xl-6">
          <contact-form :contrast="contrast" :indented="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingletonByKey } from "@/api/index.js";
import ContactForm from "@/components/ContactForm.vue";

export default {
  name: "ContactsInfo",
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
      currentCity: "moscow",
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
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        // eslint-disable-next-line
        window.callibriInit();
      }, 500);
    });
  },
  methods: {
    changeCity(city) {
      this.currentCity = city;
      this.$emit("change-city", city);
    },
    async getContactInfo() {
      this.contactInfo = await getSingletonByKey("locations");
    },
    getContactInfoByKey(key) {
      const { contactInfo, currentCity } = this;
      const keyByCity = currentCity + "_" + key;
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
          this.$emit("change-city", city);
        }, 240); // меняем город во время анимации
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/shared/_globals.scss";

.contact-form {
  $block: &;
  padding-bottom: 56px;

  &__title {
    margin: 0;
    font-size: $--font-size-180;
    line-height: 1;
    font-weight: normal;

    margin-bottom: 34px;
    @include from("md") {
      max-width: 100%;
      margin-bottom: 70px;
    }
    @include from("lg") {
      font-size: $--font-size-200;
    }
    @include from("xl") {
      margin-bottom: 100px;
    }
  }

  &__section {
    margin: 30px 0;
    line-height: 1.2;

    &--top {
      margin-top: 0;
    }

    font-size: 22px;
    @include from("md") {
      font-size: 26px;
    }

    p {
      margin-top: 0;
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
      content: "";
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
    @include from("lg") {
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
    justify-content: start;
    margin: 0;
    margin-top: 40px;
    flex-wrap: wrap;

    @include from("sm") {
      flex-wrap: nowrap;
    }
    @include from("xl") {
      margin-top: 0;
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

.social-link {
  $block: &;

  font-size: 22px;
  color: $--color-text;
  display: inline-block;
  cursor: pointer;

  span {
    display: block;
  }

  & + & {
    margin-left: 16px;

    @include from("lg") {
      margin-left: 32px;
    }
  }

  &__icon {
    path {
      fill: $--color-text;
    }
  }

  &:hover {
    color: $--color-brand;

    #{$block}__icon {
      path {
        fill: $--color-brand;
      }
    }
  }
}
</style>
