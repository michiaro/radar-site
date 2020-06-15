<template>
  <div ref="popup" class="services-popup">
    <div class="services-popup__content">
      <div
        v-for="service in services"
        ref="service"
        :key="service.serviceId"
        class="services-popup__section"
        @click="$emit('setService', service.serviceId)"
      >
        <service-popup-direction
          ref="directions"
          :service="service"
          :state="getState(service.serviceId)"
          @close="$emit('setService', null)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  disableDocumentScroll,
  enableDocumentScroll,
} from '@/utils/documentScroll.js';
import animate from '@/utils/animate.js';
import { easeInOutCubic, linear } from '@/utils/easings.js';
import ServicePopupDirection from '@/components/ServicePopupDirection.vue';
import progressFromTo from '@/utils/progressFromTo.js';
import SERVICE_STATE from '@/components/servicePopupDirectionState.js';

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
      return this.$store.state.page.isMobile;
    },
  },
  watch: {
    activeServiceId(nextServiceId, prevServiceId) {
      this.animatePopup(nextServiceId, prevServiceId);
    },
  },
  created() {
    const { activeServiceId } = this;

    if (activeServiceId) {
      this.animatePopup(activeServiceId, null);
    }
  },
  methods: {
    getState(serviceId) {
      if (this.activeServiceId === null) {
        return SERVICE_STATE.IDLE;
      } else {
        if (this.activeServiceId === serviceId) {
          return SERVICE_STATE.OPEN;
        }
        return SERVICE_STATE.CLOSED;
      }
    },
    animatePopup(nextServiceId, prevServiceId) {
      const isClosing = nextServiceId === null;
      const isOpening = prevServiceId === null;

      // basis потому, что на мобилке это вертикальный флек, а на десктопе горизонтальый
      const gutter = 1.5;
      const pagePaddingX = 2;
      const serviceCount = this.services.length;
      const headerBasis = 9;
      const fullBasis = this.isMobile
        ? 100 - headerBasis - gutter * (serviceCount - 1)
        : 100 - pagePaddingX * 2 - gutter * (serviceCount - 1);
      const closedBasis = 6.5;
      const openedBasis = fullBasis - closedBasis * (serviceCount - 1);

      const startBasisArray = this.services.map(({ serviceId }) => {
        if (isOpening) {
          return fullBasis / serviceCount;
        }
        return prevServiceId === serviceId ? openedBasis : closedBasis;
      });

      const deltaBasisArray = this.services.map(({ serviceId }, index) => {
        const endWidth =
          nextServiceId === serviceId ? openedBasis : closedBasis;
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
            const slideDuration = 0.8;

            // анимируем прозрачность и класс
            if (isOpening || isClosing) {
              const opacityProgressFrom = isOpening ? 0 : 1 - fadeDuration;
              const opacityProgressTo = isOpening ? fadeDuration : 1;
              const opacityProgress = progressFromTo(
                progress,
                opacityProgressFrom,
                opacityProgressTo,
              );
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

            const slideProgress = easeInOutCubic(
              progressFromTo(progress, slideProgressFrom, slideProgressTo),
            );
            this.services.forEach((service, index) => {
              const start = startBasisArray[index];
              const delta = deltaBasisArray[index];
              const nextWidth = start + delta * slideProgress;
              this.$refs.service[index].style.flexBasis = `${nextWidth}vmax`;
            });
          },
          onComplete: () => {
            this.animation = null;

            // запускаем анимацию появления контента
            if (this.activeServiceId) {
              this.services.forEach(({ serviceId }) => {
                if (this.activeServiceId === serviceId) {
                  this.$store.commit('animateNext', { counterKey: serviceId });
                  // this.$refs.directions[index].startNext(1);
                } else {
                  this.$store.commit('resetAnimations', { counterKey: serviceId });
                  // this.$refs.directions[index].startNext(0);
                }
              });
            }

            // запрещаем скролл документа
            if (this.activeServiceId !== null) {
              disableDocumentScroll();
            } else {
              enableDocumentScroll();
            }
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
  margin: $--gutter * -0.5;
  z-index: 1;
  &__content {
    display: flex;
    flex-direction: column;
    @include from('xl') {
      flex-direction: row;
    }
    height: 100%;
  }
  &__section {
    flex-grow: 1;
    margin: $--gutter * 0.5;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}
</style>
