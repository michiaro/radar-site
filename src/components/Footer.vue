<template lang="pug">
  footer.page-footer(
    :class=" { 'page-footer--about' : isAbout } "
  )
    .content.page-footer__content
      .footer-abkr(v-show="!isAbout")
        a(target="_blank", href="http://russianbranding.ru/")
          svg.footer-abkr__img(xmlns="http://www.w3.org/2000/svg" width="133" height="43" fill="none")
            path.footer-abkr__logo(d="M92.5 32.85h5.64v-9.47l6.65 9.47h7.45l-9.27-11.7 9.07-10.87H105l-6.85 9.07v-9.07H92.5v22.57zM115.67 32.85h5.64v-7.66h3.23c3.22 0 5.24-1 6.45-2.62a7.87 7.87 0 0 0 0-9.67c-1.21-1.41-3.23-2.62-6.45-2.62h-8.87v22.57zm7.46-18.34c1.6 0 2.41.4 3.02 1 .8 1.01.8 3.03 0 4.04-.6.6-1.41 1.2-3.02 1.2h-1.82v-6.24h1.82zM71.14 10.28h15.51v4.83h-9.67v3.23h3.83c3.22 0 5.24 1 6.45 2.62a7.58 7.58 0 0 1 0 9.47c-1.21 1.4-3.23 2.62-6.45 2.62h-9.47V10.28h-.2zM79.2 28.4c1.6 0 2.41-.4 3.02-1 .8-1.01.8-2.83 0-3.83-.6-.6-1.41-1.21-3.02-1.21h-2.42v6.04h2.42zM66.1 10.28H50.58v4.83h9.67v3.23h-3.83c-3.22 0-5.23 1-6.44 2.62a7.58 7.58 0 0 0 0 9.47c1.2 1.4 3.22 2.62 6.44 2.62h9.48V10.28h.2zM58.04 28.4c-1.62 0-2.42-.4-3.03-1-.8-1.01-.8-2.83 0-3.83.6-.6 1.41-1.21 3.03-1.21h2.41v6.04h-2.41zM20.96 1.41a19.97 19.97 0 0 1 14.1 34.06 19.97 19.97 0 0 1-34.05-14.1c0-5.45 2.21-10.49 5.84-14.12a19.27 19.27 0 0 1 14.1-5.84zm6.85 8.67v23.37c-2.22.4-4.23.6-6.45.6-2.82 0-5.84-.6-7.66-2.82a7.6 7.6 0 0 1-1.6-4.63c0-2.02.6-4.03 2-5.44.4-.6 1.01-1 1.62-1.41a13.75 13.75 0 0 1 7.45-1.41V14.5H13.5v-4.43h14.3zm-4.64 19.74v-7.65h-1.6c-1.62 0-2.83.4-3.63 1-.81.6-1.21 1.62-1.21 3.03 0 1.2.4 2.21 1.2 2.82 1.21 1.2 3.63 1 5.24.8zM20.96 5.24c-4.44 0-8.47 1.81-11.49 4.84a16.16 16.16 0 0 0-4.83 11.48c0 4.44 1.8 8.47 4.83 11.49a16.16 16.16 0 0 0 11.49 4.83c4.43 0 8.46-1.8 11.48-4.83a16.16 16.16 0 0 0 4.84-11.49c0-4.43-1.81-8.46-4.84-11.48a16.16 16.16 0 0 0-11.48-4.84z")
        .footer-abkr__text Мы входим в состав Ассоциации Брендинговых Компаний России

      p.copyright © 2007 — 
        span#year
        |, Radar Advertising. Все права защищены.
      .sn
        a.footer-link(:href="'mailto:'+content.common.email") {{ content.common.email }}
        .sn-imgs
          a(
            v-if="content.common.vk"
            :href="content.common.vk",
            target="_blank"
          )
            img.sn-img.nm(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAeCAYAAADHJYVoAAABDUlEQVR4AbXVg4/DQRDF8bNtG8HZCM62grPt/z/pt0mN2f1hmnyi7ntbzTSjq6vz34U33GAHg8jNSPUIHfbqHaNyuXeLauUhHZrlJ7bl61gMWcIhvg2ZH2TZlNel+I7K8WbIFbsqD2WmDbkiL+U9QuYLmV7KR4TMUeiYq888Bxd+/BT7URfSjCHcCOe3tIZoA9ka5Zso1Nwtv1hBvub436NMpTzkCtnWP8Xg2w2pwCheDdkhV0MUuqwMn0L21KpcuGBD+nfyWj4v5b2WL6mUB38NeBKyz263Ygn2Ddk9U/kWFmOs4Ay/oeclvVpDdIlMjfJPVGmM/zPq/V5cf1hLWrsuiz5whwOMoyTVryoABtLQg09QovgAAAAASUVORK5CYII="
              )
          a(
            v-if="content.common.facebook"
            :href="content.common.facebook",
            target="_blank"
          )
            img.sn-img(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAqklEQVR4Ae3Tg24EURSH8dq23UZt194HmDiZYBmtrfv+yf7XGlsn+cXnmzta45qPj/ct+AcaqkDmNKEBeUgCBS6u2BOUgIhQZou9QReISDRTbB/qQCSIMwVjQCT6YQqWZQTPlmNnApay4INbOIFL+IAw0+m+eGLRNTGDhT+OWAc2xAZ9HMHGGsYCwfE/OJHhCHaB4nAxCRKFPDtBowZN8qc4QSfoBJ2gE+wDc0JU9gVcgFgAAAAASUVORK5CYII="
            )
          a(
            v-if="content.common.instagram"
            :href="content.common.instagram",
            target="_blank"
          )
            img.sn-img(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABAElEQVR42u2XvwrCMBCH4ySCAaFLQZeUiu3WF+jULg4FOwnqO8Tq+4O/wgmh1BB7Rov04FuSy30k5A8RUaQkOIL7NyCXFAwpSy48Fo/BvMP22e9NLHqilU/i/xGDuEccDxVrUII1WBAbatMuNYaIayDFi0DfEtTO4rGHObMEnMCVOIHEt7S0LF/pS5qSwEbqXtBeSBl5FwfxxchXnF0dUJEZuDmIb2BGYwKOOGSIQ454x1jqHUe8H7q52rEcsQbSKFZYcgsjTwLNvTKrnmN1Bg1xBmknp/rUXZ2/cTxzH4/EyiJcgZrxOllpwAFkQBEZtTWMZ5HHJB6l+GdfmJ992h7vvVL+F27YPwAAAABJRU5ErkJggg=="
            )
          a(
            v-if="content.common.vimeo"
            :href="content.common.vimeo",
            target="_blank"
          )
            img.sn-img(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAQAAACqy3WpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFF2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAyLTA1VDE1OjU2OjUwKzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMi0wNVQxNTo1Nzo1MiswNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMi0wNVQxNTo1Nzo1MiswNTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjEiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJEb3QgR2FpbiAyNSUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NGQ3NmY4ZTktZWNlOC0wNTQ4LWFiYjEtZDNhNTQxMDYyYTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRkNzZmOGU5LWVjZTgtMDU0OC1hYmIxLWQzYTU0MTA2MmEzNSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjRkNzZmOGU5LWVjZTgtMDU0OC1hYmIxLWQzYTU0MTA2MmEzNSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NGQ3NmY4ZTktZWNlOC0wNTQ4LWFiYjEtZDNhNTQxMDYyYTM1IiBzdEV2dDp3aGVuPSIyMDE5LTAyLTA1VDE1OjU2OjUwKzA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+RimZbAAAAZRJREFUOI2FlElLA0EQRmti3AKCYEREVHxR44KBXBSXgwHx4kFwIWpQiaDiiCuaoNFo5pd7mDHOVHdH6tbv+x4ZujqCqJmkxDqDxnk4w2xR5ZY7KhTwkCQe4JyAgIAmeaPcxx6tiIdziBcPQC0G3+lP1DPcJMrhLP4FNvhWcDVW9ziz1AMqv3jHBmOCorUe8CIIacpW2MCL6l08OwRfQh8XDhgwFAnmnImmUHXCgIVIMEuOLDM8GIlHYZoWPhMMJ+4gnJK6yHkjcRBeXxeCkDdwWQnGzN8Yxx63Ct8rwaK+A1LJwJoKfJNO8EPFN/UqD6pVDRiN0axatTcyWiD4SrAcYyc2pgXbKnTUJlOK+KRsgpyKNehGEPrVLraYCBtakOZTKYoIHsfqdOu3oQVivLoaOXbV2VW0OVbBurEsej7ab8QqGPmn3mIpnjcFHq8dBep9mAJhv0O93P6P6CAoOOuXarUdgjR1a90nY6ZtAqFkqV/b6i5BL0/Gt3dbkw6BME6jXa5TdKQ6CIQsJ9xxygo97jryAzp+WD3FSMC6AAAAAElFTkSuQmCC"
            )
</template>

<script>
import api from "../api/";

export default {
  name: "Footer",
  props: {
    // msg: String
  },
  data() {
    return {
      content: { common: "" }
    };
  },
  computed: {
    isAbout() {
      var currentPath = this.$route.path;
      if (currentPath == "/about") {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getSingletonsByKey("common").then(common => {
        this.content.common = common;
      });

      document.getElementById("year").innerHTML = new Date().getFullYear();
    });
  }
};
</script>

<style lang="scss">
.page-footer {
  background-color: #fff;

  &--about {
    background-color: #343434;

    @media screen and (min-width: 1200px) {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      right: 0;
      background: transparent;
    }

    img {
      filter: invert(100%);
    }
  }
}

.page-footer.about-footer {
  background-color: transparent;
  width: 100%;
}

.page-footer__content {
  padding: 30px 8px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}

.copyright,
.footer-link {
  color: #8e8e8d;
  font-size: 12px;
  display: inline-block;
  margin: 0;
}

.copyright {
  margin-top: 10px;
}
.footer-link,
.sn-imgs {
  display: inline-block;
  vertical-align: middle;
}

.sn {
  margin: 30px 0 20px;
}

.sn-imgs.op {
  opacity: 0.7;
}

.footer-link {
  margin-right: 100px;
}

.footer-link:hover {
  text-decoration: underline;
}

.sn-img {
  margin-left: 15px;
  max-height: 15px;

  &:hover {
    opacity: 0.8;
  }
}

.sn-img.nm {
  margin-left: 0;
}

@media screen and (min-width: 680px) {
  .sn {
    margin: 10px 8px 0 0;
  }
  .contacts {
    margin-left: 15px;
  }
  .page-footer__content {
    padding: 30px 15px;
    flex-wrap: row nowrap;
  }
  .page-footer.about-footer {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

// @media screen and (min-width: 922px) {
//   .page-footer__content {
//     flex-wrap: row nowrap;
//   }
// }
@media screen and (min-width: 1200px) {
  .page-footer__content {
    padding: 30px 0;
  }
  .sn {
    margin: 10px 0 0;
  }
  .page-footer.about-footer {
    margin-top: 0;
  }
}

.footer-abkr {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 922px) {
    width: auto;
  }
  &__img {
    margin-right: 15px;
  }
  &__logo {
    fill: #484d50;
  }
  &__text {
    font-size: 10px;
    color: #898989;
    width: 152px;
  }
}
</style>
