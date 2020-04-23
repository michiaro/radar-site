<template>
  <div class="contacts">
    <contact-form @change-city="onChangeCity" />
    <google-map ref="map" :current-city="currentCity" />
  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue';
import ContactForm from '@/components/ContactForm.vue';

export default {
  name: 'Contacts',
  components: {
    GoogleMap,
    ContactForm,
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
</style>
