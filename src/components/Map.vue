<template lang="pug">
  .map  
    GmapMap#map( 
      :options="mapOptions",
      :center="currentCenter",
      :zoom="changingZoom",
      mapTypeId="roadmap",
      ref="mapRef",
    )
      GmapMarker(
        :key="index",
        v-for="(m, index) in markers",
        :position="m.center",
        :icon="image",
      )
</template>

<script>
// import api from "../api/";

export default {
  name: "Map",
  props: {
    isChelly: {
      type: Boolean
    },
    isMoscow: {
      type: Boolean
    },
  },
  data() {
    return {
      content: {
        // common: ""
      },
      markers: [
        {
          latitude: "55.164515",
          longitude: "61.401197",
          center: {
            lat: 55.164515,
            lng: 61.401197
          }
        },
        {
          latitude: "55.758929",
          longitude: "37.664464",
          center: {
            lat: 55.758929,
            lng: 37.664464
          }
        }
      ],
      mapOptions: {
        mapTypeId: "roadmap",
        sensor: "true",
        disableDefaultUI: "true",
        styles: [
          { stylers: [{ saturation: -100 }, { gamma: 1 }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.business",
            elementType: "labels.text",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.business",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.place_of_worship",
            elementType: "labels.text",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "poi.place_of_worship",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "water",
            stylers: [
              { visibility: "on" },
              { saturation: 50 },
              { gamma: 0 },
              { hue: "#50a5d1" }
            ]
          },
          {
            featureType: "administrative.neighborhood",
            elementType: "labels.text.fill",
            stylers: [{ color: "#333333" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [{ weight: 0.5 }, { color: "#333333" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.icon",
            stylers: [{ gamma: 1 }, { saturation: 50 }]
          }
        ]
      },
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAABIklEQVR42s2YMQ5EQBSGuYQS5SaqvYWbUOjdglNoNNtvI+7gKAqVt79kslGInd8ynuRr8CYfM/Ob4THH+/EMQQFaMIARiGE051pzT2jTJiuQgg7MQCyZTU16hkACeiB/0oPkqEQGJiAnMYGMEfBBBeQiKuDbiPASPJVNd4gjsr2BOTkUmTYH8Hd2uKXfygm5iXQt0t0o0q1jewZCMoIGlIZmHflkAkeLSHGg+AWCjXEWmGtCUizF7QEJfzcQeZl2KRzI7ggsQjEgu2nwyIKG+FQ0zAN65CssCZGSaVuNiJquUTNY1UxfVYEWKYj4WMVHT80yQMXCSO9S0cjkDkXyX2FUO5CobTdY9ZUSwGd2fPkFW85cxyZc/28JXigmftTETNsfEZvcY6CPfusAAAAASUVORK5CYII=",
      changingZoom: 17,
    };
  },
  computed: {
    currentCenter() {
      if (this.isChelly == true) {
        return this.markers[0].center;
      } else {
        return this.markers[1].center;
      }
    }
  },
  mounted() {
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   map.panTo({ lat: 1.38, lng: 103.8 });
    // });
  },
  methods: {
    zoomOut() {
      this.changingZoom = this.changingZoom - 1;

      // map.setZoom(map.getZoom() - 1);
    },
    zoomIn() {
      this.changingZoom = this.changingZoom + 1;
      // map.setZoom(map.getZoom() + 1);
    }
  }
};
</script>

<style lang="scss">
.map {
  position: relative;
  height: 525px;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}
</style>
