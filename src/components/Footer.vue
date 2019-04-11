<template lang="pug">
  footer.page-footer
    .content.page-footer__content
      p.copyright © 2007 — 
        span#year
        |, Radar Advertising. Все права защищены.
      .sn
        a.footer-link(:href="'mailto:'+content.common.email") {{ content.common.email }}
        .sn-imgs
          a(
            :href="content.common.vk",
            target="_blank"
          )
            img.sn-img.nm(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAeCAYAAADHJYVoAAABDUlEQVR4AbXVg4/DQRDF8bNtG8HZCM62grPt/z/pt0mN2f1hmnyi7ntbzTSjq6vz34U33GAHg8jNSPUIHfbqHaNyuXeLauUhHZrlJ7bl61gMWcIhvg2ZH2TZlNel+I7K8WbIFbsqD2WmDbkiL+U9QuYLmV7KR4TMUeiYq888Bxd+/BT7URfSjCHcCOe3tIZoA9ka5Zso1Nwtv1hBvub436NMpTzkCtnWP8Xg2w2pwCheDdkhV0MUuqwMn0L21KpcuGBD+nfyWj4v5b2WL6mUB38NeBKyz263Ygn2Ddk9U/kWFmOs4Ay/oeclvVpDdIlMjfJPVGmM/zPq/V5cf1hLWrsuiz5whwOMoyTVryoABtLQg09QovgAAAAASUVORK5CYII="
              )
          a(
            :href="content.common.facebook",
            target="_blank"
          )
            img.sn-img(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAlCAYAAABCr8kFAAAAqklEQVR4Ae3Tg24EURSH8dq23UZt194HmDiZYBmtrfv+yf7XGlsn+cXnmzta45qPj/ct+AcaqkDmNKEBeUgCBS6u2BOUgIhQZou9QReISDRTbB/qQCSIMwVjQCT6YQqWZQTPlmNnApay4INbOIFL+IAw0+m+eGLRNTGDhT+OWAc2xAZ9HMHGGsYCwfE/OJHhCHaB4nAxCRKFPDtBowZN8qc4QSfoBJ2gE+wDc0JU9gVcgFgAAAAASUVORK5CYII="
            )
          a(
            :href="content.common.instagram",
            target="_blank"
          )
            img.sn-img(
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABAElEQVR42u2XvwrCMBCH4ySCAaFLQZeUiu3WF+jULg4FOwnqO8Tq+4O/wgmh1BB7Rov04FuSy30k5A8RUaQkOIL7NyCXFAwpSy48Fo/BvMP22e9NLHqilU/i/xGDuEccDxVrUII1WBAbatMuNYaIayDFi0DfEtTO4rGHObMEnMCVOIHEt7S0LF/pS5qSwEbqXtBeSBl5FwfxxchXnF0dUJEZuDmIb2BGYwKOOGSIQ454x1jqHUe8H7q52rEcsQbSKFZYcgsjTwLNvTKrnmN1Bg1xBmknp/rUXZ2/cTxzH4/EyiJcgZrxOllpwAFkQBEZtTWMZ5HHJB6l+GdfmJ992h7vvVL+F27YPwAAAABJRU5ErkJggg=="
            )
          a(
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
      content: {
        common: ""
      }
    };
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
  background-color: #fff
}

.page-footer.about-footer {
  background-color: transparent;
  width: 100%;
}

.page-footer__content {
  padding: 30px 8px;
}

.copyright, .footer-link {
  color: #8e8e8d;
  font-size: 12px;
  display: inline-block;
}

.footer-link, .sn-imgs {
  display: inline-block;
  vertical-align: middle;
}

.sn {
  margin: 20px 0;
}

.sn-imgs.op {
  opacity: 0.7
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
}

.sn-img.nm {
  margin-left: 0;
}

@media screen and (min-width: 680px) {
  .sn {
    float: right;
    margin: 0 8px 0 0;
  }
  .contacts {
    margin-left: 15px;
  }
  .page-footer__content {
    padding: 30px 15px;
  }
  .page-footer.about-footer {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

@media screen and (min-width: 1200px) {
  .page-footer__content {
    padding: 30px 0;
  }
  .sn {
    float: right;
    margin: 0;
  }
  .page-footer.about-footer {
    margin-top: 0;
  }
}
</style>
