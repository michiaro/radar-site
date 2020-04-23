<template>
  <div class="contacts">
    <h1>Контакты</h1>
    <div class="grid">
      <div class="row">
        <div class="col col-xs-2 col-sm-2 col-lg-6">1</div>
        <div class="col col-xs-2 col-sm-2 col-lg-6">2</div>
      </div>
    </div>
  </div>
</template>

<script>
// import api from "../../api/";

export default {
  name: 'Contacts',
  data() {
    return {
      // content: {
      //   locations: "",
      //   common: ""
      // },
      // isMoscow: false,
      // isChelly: true
    };
  },
  // methods: {
  //   showMoscow() {
  //     this.isMoscow = true;
  //     this.isChelly = false;
  //   },
  //   showChelly() {
  //     this.isChelly = true;
  //     this.isMoscow = false;
  //   },
  //   changeZoomIn() {
  //     this.$refs.mapZoom.zoomIn();
  //   },
  //   changeZoomOut() {
  //     this.$refs.mapZoom.zoomOut();
  //   },
  //   defineCity() {
  //     var self = this;
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         var lat = position.coords.latitude;
  //         var lng = position.coords.longitude;

  //         if (lat >= 37 && lat <= 38 && lng >= 55 && lng <= 56) {
  //           // MSK
  //           self.showMoscow();
  //         }
  //       });
  //     }
  //   }
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     api.getSingletonsByKey("locations").then(locations => {
  //       this.content.locations = locations;
  //     });

  //     api.getSingletonsByKey("common").then(common => {
  //       this.content.common = common;
  //     });

  //     setTimeout(() => {
  //       // eslint-disable-next-line
  //       callibriInit();
  //     }, 500);

  //     this.defineCity();
  //   });
  // }
};
</script>

<style lang="scss"></style>
