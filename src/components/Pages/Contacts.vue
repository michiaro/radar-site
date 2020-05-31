<template>
  <div class="contacts">
    <contacts-info @change-city="onChangeCity" />
    <google-map ref="map" :current-city="currentCity" />
  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue';
import ContactsInfo from '@/components/ContactsInfo.vue';

export default {
  name: 'Contacts',
  components: {
    GoogleMap,
    ContactsInfo,
  },
  data() {
    return {
      name: '',
      contact: '',
      message: '',
      currentCity: 'moscow',
    };
  },
  methods: {
    onChangeCity(city) {
      this.currentCity = city;
      this.$refs.map.updateMapCenter();
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.contacts {
  padding-top: $--page-padding-y-xs;

  @include from('lg') {
    padding-top: $--page-padding-y-lg;
  }
}
</style>
