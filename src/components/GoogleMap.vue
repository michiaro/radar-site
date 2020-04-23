<template>
  <div class="map" />
</template>

<script>
import loadGoogleMapsApi from 'load-google-maps-api';
import { GOOGLE_MAP_API_KEY } from '@/settings.js';
import pinIcon from '@/images/pin-icon.png';

export default {
  name: 'GoogleMap',
  props: {
    currentCity: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      GOOGLE_MAP_API_KEY,
      markers: [
        {
          lat: 55.164515,
          lng: 61.401197,
        },
        {
          lat: 55.758929,
          lng: 37.664464,
        },
      ],
      mapTypeId: 'roadmap',
      mapOptions: {
        sensor: 'true',
        disableDefaultUI: 'true',
        styles: [
          { stylers: [{ saturation: -100 }, { gamma: 1 }] },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.business',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.business',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.place_of_worship',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.place_of_worship',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }],
          },
          {
            featureType: 'water',
            stylers: [
              { visibility: 'on' },
              { saturation: 50 },
              { gamma: 0 },
              { hue: '#50a5d1' },
            ],
          },
          {
            featureType: 'administrative.neighborhood',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#333333' }],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text',
            stylers: [{ weight: 0.5 }, { color: '#333333' }],
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.icon',
            stylers: [{ gamma: 1 }, { saturation: 50 }],
          },
        ],
      },
      mapZoom: 17,
      map: null,
      googleMaps: null,
    };
  },
  computed: {
    currentCenter() {
      const { currentCity, markers } = this;
      if (currentCity === 'moscow') {
        return markers[0];
      } else {
        return markers[1];
      }
    },
  },
  created() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      const {
        mapOptions,
        currentCenter,
        mapZoom,
        mapTypeId,
        markers,
      } = this;

      loadGoogleMapsApi({
        key: GOOGLE_MAP_API_KEY,
      })
        .then((googleMaps) => {
          this.googleMaps = googleMaps;

          const map = new googleMaps.Map(document.querySelector('.map'), {
            options: mapOptions,
            center: currentCenter,
            zoom: mapZoom,
            mapTypeId: mapTypeId,
          });

          this.map = map;

          markers.forEach((marker) => {
            new googleMaps.Marker({
              position: marker,
              map: map,
              icon: pinIcon,
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateMapCenter() {
      const { map, currentCenter } = this;
      map.panTo(currentCenter);
    },
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
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.map {
  position: relative;
  height: 100vh;
  width: 100%;
  margin-top: 56px;
  @include from('xl') {
    margin-top: 72px;
  }
}
</style>
