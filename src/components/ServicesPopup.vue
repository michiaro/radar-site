<template>
  <div ref="popup" class="services-popup">
    <div class="services-popup__content">
      <div
        v-for="service in services"
        :ref="service.serviceId"
        :key="service.serviceId"
        class="services-popup__section"
        @click="$emit('setService', service.serviceId)"
      >
        <service-popup-direction
          :service="service"
          :is-contrast="isContrast(service.serviceId)"
          @close="$emit('setService', null)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import animate from '@/utils/animate.js';
import { easeInOutCubic, linear } from '@/utils/easings.js';
import ServicePopupDirection from '@/components/ServicePopupDirection.vue';
import progressFromTo from '@/utils/progressFromTo.js';

export default {
  name: 'ServicesPopup',
  components: {
    ServicePopupDirection,
  },
  props: {
    services: {
      type: Array,
      required: true,
    },
    activeServiceId: {
      validator: (prop) => typeof prop === 'string' || prop === null,
      required: true,
    },
  },
  data() {
    return {
      animation: null,
    };
  },
  computed: {
    isMobile() {
      return false;
    },
  },
  watch: {
    activeServiceId(nextServiceId, prevServiceId) {
      this.animatePopup(nextServiceId, prevServiceId);
    },
  },

  methods: {
    isContrast(serviceId) {
      return this.activeServiceId !== null && serviceId !== this.activeServiceId;
    },
    animatePopup(nextServiceId, prevServiceId) {
      const isClosing = nextServiceId === null;
      const isOpening = prevServiceId === null;

      // basis потому, что на мобилке это вертикальный флек, а на десктопе горизонтальый
      const gutter = 1.5;
      const pagePaddingX = 2;
      const serviceCount = this.services.length;
      const fullBasis = 100 - pagePaddingX * 2 - gutter * (serviceCount - 1);
      const closedBasis = this.isMobile ? 0 : 6.5;
      const openedBasis = this.isMobile ? 0 : fullBasis - closedBasis * (serviceCount - 1);

      const startBasisArray = this.services.map(({ serviceId }) => {
        if (isOpening) {
          return fullBasis / serviceCount;
        }
        return prevServiceId === serviceId ? openedBasis : closedBasis;
      });

      const deltaBasisArray = this.services.map(({ serviceId }, index) => {
        const endWidth = nextServiceId === serviceId ? openedBasis : closedBasis;
        return endWidth - startBasisArray[index];
      });

      const startOpacity = isOpening ? 0 : 1;
      const endOpacity = isClosing ? 0 : 1;
      const detlaOpacity = endOpacity - startOpacity;

      if (!this.animation) {
        this.animation = animate({
          duration: 750,
          easing: linear,
          draw: (progress) => {
            // часть от общего прогресса
            const fadeDuration = 0.38;
            const slideDuration = 0.80;

            // анимируем попап
            if (isOpening || isClosing) {
              const opacityProgressFrom = isOpening ? 0 : 1 - fadeDuration;
              const opacityProgressTo = isOpening ? fadeDuration : 1;
              const opacityProgress = progressFromTo(progress, opacityProgressFrom, opacityProgressTo);
              const opacity = startOpacity + detlaOpacity * opacityProgress;
              this.$refs.popup.style.opacity = opacity;

              const activeClassName = 'services-popup--active';
              if (opacity > 0) {
                this.$refs.popup.classList.add(activeClassName);
              } else {
                this.$refs.popup.classList.remove(activeClassName);
              }
            }

            // анимируем скольжение
            let slideProgressFrom = 0;
            let slideProgressTo = 1;
            if (isOpening || isClosing) {
              slideProgressFrom = isOpening ? 1 - slideDuration : 0;
              slideProgressTo = isOpening ? 1 : slideDuration;
            }
            const slideProgress = easeInOutCubic(progressFromTo(progress, slideProgressFrom, slideProgressTo));
            this.services.forEach(({ serviceId }, index) => {
              const start = startBasisArray[index];
              const delta = deltaBasisArray[index];
              const nextWidth = start + delta * slideProgress;
              this.$refs[serviceId][0].style.flexBasis = `${nextWidth}vw`;
            });

            // анимируем контент
          },
          onComplete: () => {
            this.animation = null;
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.services-popup {
  $services-popup: &;
  display: none;
  &--active {
    display: block;
  }
  position: fixed;
  top: $--header-height;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: $--color-background;
  padding: $--page-padding-x;
  margin: 0 $--gutter * -0.5;
  &__content {
    display: flex;
    height: 100%;
  }
  &__section {
    flex-grow: 1;
    margin: 0 $--gutter * 0.5;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
</style>
