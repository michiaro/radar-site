<template>
  <div class="services-popup">
    <div ref="container" class="services-popup__content">
      <div
        v-for="service in services"
        :ref="service.serviceId"
        :key="service.serviceId"
        class="services-popup__section"
        @click="openService(service.serviceId)"
      >
        <div class="service-direction" data-service-direction>
          <div class="service-direction__main">
            <h2 class="service-direction__title">
              {{ service.title }}
            </h2>
            <div class="service-direction__description">
              {{ service.description }}
            </div>
          </div>
          <div class="service-direction__label-rotor">
            <div class="service-direction__label">
              {{ service.title }}
            </div>
          </div>
          <div class="service-direction__plus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animate from '../utils/animate.js';
import { easeInOutCubic } from '../utils/easings.js';

export default {
  name: 'ServicesPopup',
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      animation: null,
      closedBasis: 0,
      openedVerticalBasis: 0,
      openedHorizontalBasis: 0,
      activeServiceId: null,
    };
  },
  computed: {
    isMobile() {
      return false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.setSizes();
    },
    pixelsToViewporMax(px) {
      const max = Math.max(window.outerWidth, window.outerHeight);
      return (px / max) * 100;
    },
    setSizes() {
      const gutter = 1;
      const pagePaddingX = 1.5;
      this.closedBasis = this.isMobile ? 56 : 6.5;
      this.openedVerticalBasis =
        this.services.reduce(
          (total, { serviceId }) => total + this.pixelsToViewporMax(this.$refs[serviceId][0].offsetHeight),
          0,
        ) -
        this.closedBasis * (this.services.length - 1);

      this.openedHorizontalBasis = 100 - pagePaddingX * 2 - (this.closedBasis + gutter) * (this.services.length - 1);

      this.services.forEach(({ serviceId }) => {
        const serviceDirectionNode = this.$refs[serviceId][0].querySelector('[data-service-direction]');
        const serviceDirectionNodeWidth = this.isMobile ? '100%' : `${this.openedHorizontalBasis}vw`;
        serviceDirectionNode.style.width = serviceDirectionNodeWidth;
      });
    },
    openService(targetServiceId) {
      if (this.activeServiceId === targetServiceId) {
        return;
      }
      // basis потому, что на мобилке это вертикальный флек, а на десктопе горизонтальый

      const openedBasis = this.isMobile ? this.openedVerticalBasis : this.openedHorizontalBasis;

      const startWidthArray = this.services.map(({ serviceId }) =>
        this.activeServiceId === serviceId ? openedBasis : this.closedBasis,
      );
      const deltaWidthArray = this.services.map(({ serviceId }, index) => {
        const endWidth = targetServiceId === serviceId ? openedBasis : this.closedBasis;
        return endWidth - startWidthArray[index];
      });
      console.log(startWidthArray);

      if (!this.animation) {
        this.animation = animate({
          duration: 350,
          easing: easeInOutCubic,
          draw: (progress) => {
            this.services.forEach(({ serviceId }, index) => {
              // анимируем базис
              const start = startWidthArray[index];
              const delta = deltaWidthArray[index];
              const nextWidth = start + delta * progress;
              this.$refs[serviceId][0].style.flexBasis = `${nextWidth}vw`;

              // ставим классы))))
              const serviceDirectionNode = this.$refs[serviceId][0].querySelector('[data-service-direction]');
              const closedClassName = 'service-direction--contrast';
              if (serviceId === targetServiceId) {
                serviceDirectionNode.classList.remove(closedClassName);
              } else {
                serviceDirectionNode.classList.add(closedClassName);
              }
            });
          },
          onComplete: () => {
            this.animation = null;
            this.activeServiceId = targetServiceId;
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
  position: fixed;
  top: $--header-height;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: $--color-background;
  padding: $--gutter $--page-padding-x;
  margin: $--gutter * -0.5;
  &__content {
    display: flex;
    height: 100%;
  }
  &__section {
    flex-grow: 1;
    margin: $--gutter * 0.5;
    overflow-x: hidden;
    overflow-y: hidden;
  }
}

.service-direction {
  $service-direction: &;

  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  padding: 1.5vw $--gutter;
  background: $--color-gray-200;
  transition-duration: $--duration-700, $--duration-700;
  transition-timing-function: $--timing-out-circ, $--timing-out-circ;
  transition-property: color, background-color;

  &__main {
  }

  &__label-rotor,
  &__plus {
    transition-duration: $--duration-200, $--duration-200;
    transition-timing-function: $--timing-in-circ, $--timing-out-circ;
    transition-property: opacity, transform;
  }

  &__label-rotor {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    top: $--page-padding-x;
    left: 3.25vw;
    transform: translate(0, -2vmax) rotate(-90deg);
    transform-origin: left bottom;
  }

  &__label {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(0, -58%);
    white-space: nowrap;
    font-size: 1.5625vw;
  }

  &__plus {
    $size: 1.5vmax;
    opacity: 0;
    transform: translate(-50%, 2vmax);
    position: absolute;
    width: 0;
    height: 0;
    bottom: $--page-padding-x + $size;
    left: 3.25vmax;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      left: -$size;
      right: -$size;
      background: $--color-gray-50;
    }
    &:after {
      transition-duration: 382ms;
      transition-timing-function: $--timing-in-out-cubic;
      transition-property: transform;
      transform: rotate(-90deg);
    }
  }

  &--contrast {
    background-color: $--color-gray-900;
    color: $--color-gray-50;

    #{$service-direction}__main {
      opacity: 0;
    }

    #{$service-direction}__label-rotor {
      opacity: 1;
      transform: translate(0, 0) rotate(-90deg);
    }

    #{$service-direction}__plus {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
}
</style>
