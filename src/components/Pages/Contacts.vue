<template lang="pug">
  .wrapper
    .block
      .content.page-wrapper
        .big-map__head
          h2.common-title Контакты
          ul.tabs
            li.tabs__item.switcher(
              @click="showMoscow",
              :class="{ 'tabs__item_active' : isMoscow }"
              ) Москва
            li.tabs__item.switcher(
              @click="showChelly",
              :class="{ 'tabs__item_active' : isChelly }"
              ) Челябинск
          .big-map__descr
            p.adress(
              v-html="content.locations.chelly_address",
              :class="{ 'contact-active' : isChelly }"
              )
            p.adress(
              v-html="content.locations.moscow_address",
              :class="{ 'contact-active' : isMoscow }"
              )
            .contacts(
              :class="{ 'contact-active' : isChelly }"
            )
              a.chelly_phone(:href="content.locations.chelly_phonelink") {{ content.locations.chelly_phone }}
              br
              a(:href="'mailto:'+content.locations.chelly_email") {{ content.locations.chelly_email }}
            .contacts(
              :class="{ 'contact-active' : isMoscow }"
            )
              a.moscow_phone(:href="content.locations.moscow_phonelink") {{ content.locations.moscow_phone }}
              br
              a(:href="'mailto:'+content.locations.moscow_email") {{ content.locations.moscow_email }}
          ul.zoom
            li.zoom__item(@click="changeZoomOut")
              span.zoom__minus
            li.zoom__item(@click="changeZoomIn")
              span.zoom__plus
        .big-map__persons
          .person.person--chelly(
            :class="{ 'person-active' : isChelly }"
          )
            .person__descr
              .person__position {{ content.locations.chelly_position }}
              .person__name {{ content.locations.chelly_name }}
            .person__email
              a(
                :href="'tel:' +content.locations.chelly_contactPhonelink"
              ) {{ content.locations.chelly_contactPhone }}
              a(
                :href="'mailto:' +content.locations.chelly_contactEmail"
              ) {{ content.locations.chelly_contactEmail }}
          .person(
            :class="{ 'person-active' : isMoscow }"
          )
            .person__descr
              .person__position {{ content.locations.moscow_position }}
              .person__name {{ content.locations.moscow_name }}
            .person__email
              a(
                :href="'tel:' +content.locations.moscow_contactPhonelink"
              ) {{ content.locations.moscow_contactPhone }}
              a(
                :href="'mailto:' +content.locations.moscow_contactEmail"
              ) {{ content.locations.moscow_contactEmail }}
        Map(
        :isChelly="isChelly",
        :isMoscow="isMoscow",
        ref="mapZoom"
        )
      
      .content
        .form-block
          .contacts-form__left
            p.contacts-form__left-text Мы с радостью ответим на ваши вопросы. Заполнение формы займет всего пару минут.
            .contacts-form__left-text
              p.bb-text Подписывайтесь и&nbsp;добавляйте нас в&nbsp;друзья (:
              .bb-sn
                a(
                  v-if="content.common.vk",
                  :href="content.common.vk",
                  target="_blank"
                )
                  img.bb-sn__img(
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAeCAYAAADHJYVoAAABDUlEQVR4AbXVg4/DQRDF8bNtG8HZCM62grPt/z/pt0mN2f1hmnyi7ntbzTSjq6vz34U33GAHg8jNSPUIHfbqHaNyuXeLauUhHZrlJ7bl61gMWcIhvg2ZH2TZlNel+I7K8WbIFbsqD2WmDbkiL+U9QuYLmV7KR4TMUeiYq888Bxd+/BT7URfSjCHcCOe3tIZoA9ka5Zso1Nwtv1hBvub436NMpTzkCtnWP8Xg2w2pwCheDdkhV0MUuqwMn0L21KpcuGBD+nfyWj4v5b2WL6mUB38NeBKyz263Ygn2Ddk9U/kWFmOs4Ay/oeclvVpDdIlMjfJPVGmM/zPq/V5cf1hLWrsuiz5whwOMoyTVryoABtLQg09QovgAAAAASUVORK5CYII="
                    )
                a(
                  v-if="content.common.facebook",
                  :href="content.common.facebook",
                  target="_blank"
                )
                  img.bb-sn__img(
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAqklEQVR4Ae3Tg24EURSH8dq23UZt194HmDiZYBmtrfv+yf7XGlsn+cXnmzta45qPj/ct+AcaqkDmNKEBeUgCBS6u2BOUgIhQZou9QReISDRTbB/qQCSIMwVjQCT6YQqWZQTPlmNnApay4INbOIFL+IAw0+m+eGLRNTGDhT+OWAc2xAZ9HMHGGsYCwfE/OJHhCHaB4nAxCRKFPDtBowZN8qc4QSfoBJ2gE+wDc0JU9gVcgFgAAAAASUVORK5CYII="
                  )
                a(
                  v-if="content.common.instagram",
                  :href="content.common.instagram",
                  target="_blank"
                )
                  img.bb-sn__img(
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABAElEQVR42u2XvwrCMBCH4ySCAaFLQZeUiu3WF+jULg4FOwnqO8Tq+4O/wgmh1BB7Rov04FuSy30k5A8RUaQkOIL7NyCXFAwpSy48Fo/BvMP22e9NLHqilU/i/xGDuEccDxVrUII1WBAbatMuNYaIayDFi0DfEtTO4rGHObMEnMCVOIHEt7S0LF/pS5qSwEbqXtBeSBl5FwfxxchXnF0dUJEZuDmIb2BGYwKOOGSIQ454x1jqHUe8H7q52rEcsQbSKFZYcgsjTwLNvTKrnmN1Bg1xBmknp/rUXZ2/cTxzH4/EyiJcgZrxOllpwAFkQBEZtTWMZ5HHJB6l+GdfmJ992h7vvVL+F27YPwAAAABJRU5ErkJggg=="
                  )
                a(
                  v-if="content.common.vimeo",
                  :href="content.common.vimeo",
                  target="_blank"
                )
                  img.bb-sn__img(
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAQAAACqy3WpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFF2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAyLTA1VDE1OjU2OjUwKzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMi0wNVQxNTo1Nzo1MiswNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMi0wNVQxNTo1Nzo1MiswNTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjEiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJEb3QgR2FpbiAyNSUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NGQ3NmY4ZTktZWNlOC0wNTQ4LWFiYjEtZDNhNTQxMDYyYTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRkNzZmOGU5LWVjZTgtMDU0OC1hYmIxLWQzYTU0MTA2MmEzNSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjRkNzZmOGU5LWVjZTgtMDU0OC1hYmIxLWQzYTU0MTA2MmEzNSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NGQ3NmY4ZTktZWNlOC0wNTQ4LWFiYjEtZDNhNTQxMDYyYTM1IiBzdEV2dDp3aGVuPSIyMDE5LTAyLTA1VDE1OjU2OjUwKzA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+RimZbAAAAZRJREFUOI2FlElLA0EQRmti3AKCYEREVHxR44KBXBSXgwHx4kFwIWpQiaDiiCuaoNFo5pd7mDHOVHdH6tbv+x4ZujqCqJmkxDqDxnk4w2xR5ZY7KhTwkCQe4JyAgIAmeaPcxx6tiIdziBcPQC0G3+lP1DPcJMrhLP4FNvhWcDVW9ziz1AMqv3jHBmOCorUe8CIIacpW2MCL6l08OwRfQh8XDhgwFAnmnImmUHXCgIVIMEuOLDM8GIlHYZoWPhMMJ+4gnJK6yHkjcRBeXxeCkDdwWQnGzN8Yxx63Ct8rwaK+A1LJwJoKfJNO8EPFN/UqD6pVDRiN0axatTcyWiD4SrAcYyc2pgXbKnTUJlOK+KRsgpyKNehGEPrVLraYCBtakOZTKYoIHsfqdOu3oQVivLoaOXbV2VW0OVbBurEsej7ab8QqGPmn3mIpnjcFHq8dBep9mAJhv0O93P6P6CAoOOuXarUdgjR1a90nY6ZtAqFkqV/b6i5BL0/Gt3dbkw6BME6jXa5TdKQ6CIQsJ9xxygo97jryAzp+WD3FSMC6AAAAAElFTkSuQmCC"
                  )
          Contactform
</template>

<script>
import api from "../../api/";
import Contactform from "../Contactform.vue";
import Map from "../Map.vue";

export default {
  name: "Contacts",
  props: {
    // msg: String
  },
  components: {
    Contactform,
    Map
  },
  data() {
    return {
      content: {
        locations: "",
        common: ""
      },
      isMoscow: false,
      isChelly: true
    };
  },
  methods: {
    showMoscow() {
      this.isMoscow = true;
      this.isChelly = false;
    },
    showChelly() {
      this.isChelly = true;
      this.isMoscow = false;
    },
    changeZoomIn() {
      this.$refs.mapZoom.zoomIn();
    },
    changeZoomOut() {
      this.$refs.mapZoom.zoomOut();
    },
    defineCity() {
      var self = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;

          if (lat >= 37 && lat <= 38 && lng >= 55 && lng <= 56) {
            // MSK
            self.showMoscow();
          }
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getSingletonsByKey("locations").then(locations => {
        this.content.locations = locations;
      });

      api.getSingletonsByKey("common").then(common => {
        this.content.common = common;
      });

      this.defineCity();
    });
  }
};
</script>

<style lang="scss">
.big-map__head {
  @media screen and (min-width: 1200px) {
    padding-bottom: 20px;
  }
}

.big-map__persons {
  padding-bottom: 20px;
}

.person {
  font-size: 18px;
  padding: 0 0 30px 5px;
  flex-flow: row nowrap;
  display: none;
  margin-top: 30px;

  &-active {
    display: flex;
  }

  @media screen and (min-width: 680px) {
    padding: 0 0 10px 15px;
    margin-top: 0;
  }

  @media screen and (min-width: 1200px) {
    width: 60%;
    margin: 0 0 0 14%;
    padding: 0 0 10px 0;

    &--chelly {
      margin-left: 16%;

      .person__email {
        margin-left: 115px;
      }
    }
  }

  &__descr {
    width: 200px;

    @media screen and (min-width: 1200px) {
      width: 200px;
    }
  }

  &__position {
    font-size: 14px;
    padding-bottom: 5px;
  }

  &__name {
    margin-bottom: 10px;
  }

  &__email {
    display: flex;
    flex-flow: column wrap;

    @media screen and (min-width: 450px) {
      margin: 0 0 10px 30px;
    }

    @media screen and (min-width: 1200px) {
      margin: 0 0 10px 96px;
    }

    & a {
      color: #292e35;
    }
  }
}

.form-block {
  margin-top: 50px;
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
}

.contacts-form {
  margin-top: 50px;
  display: flex;
  flex-flow: row wrap;
}

.contacts-form__left {
  color: #292e35;
  vertical-align: top;
  display: flex;
  flex-flow: row wrap;
  padding: 8px;
  box-sizing: border-box;

  @media screen and (min-width: 922px) {
    justify-content: space-between;
    max-width: 25%;
    margin-top: 20px;
  }
}

.contacts-form__left-text {
  margin-bottom: 15px;
  @media screen and (min-width: 922px) {
    padding-right: 0;
  }
}

@media screen and (min-width: 1200px) {
  .contacts-block__content {
    padding: 70px 0 80px 0;
  }
}

.bb-text {
  margin-bottom: 25px;
}

.bb-sn__img {
  display: inline-block;
  margin-right: 15px;

  &:hover {
    opacity: 0.8;
  }
}
</style>
