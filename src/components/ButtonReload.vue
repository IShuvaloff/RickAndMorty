<template>
  <button
    :data-id="dataId"
    class="btn-reload inactive"
    :class="{ 'loading-success': !error, 'loading-error': error, 'loading-process': isLoading }"
    :disabled="disabled"
    type="button"
  >
    <SvgIcon class="icon btn-reload__icon" :class="{ stopped: !isLoading }" name="iconReload" />
    <p class="btn-reload__value">{{ progress + '%' }}</p>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'ButtonReload',
  components: { SvgIcon },
  props: {
    dataId: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
  },
  computed: {
    isLoading() {
      return ![0, 100].includes(this.progress);
    },
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.btn-reload
  position: relative
  display: flex
  justify-content: center
  align-items: center
  background-color: transparent
  border: none
  width: 65px
  height: 65px
  &__icon
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    width: 100%
    height: 100%
    animation: rotating 3s linear 0s normal none infinite running
    fill: $color-primary
    transition: fill .2s ease-in-out
  &__value
    margin-top: 1px
    font-size: 13px
    line-height: unset
    transition: color .2s ease-in-out

@media (max-width: 991.98px)
  .btn-reload
    width: 45px
    height: 45px
    &__value
      font-size: 9px

@media (max-width: 575.98px)
  .btn-reload
    width: 25px
    height: 25px
    &__value
      display: none

.loading
  &-success
    .icon
      fill: green
    p
      color: green
  &-error
    .icon
      fill: red
    p
      color: red
  &-process
    .icon
      fill: $color-primary
    p
      color: $color-primary

.stopped
  animation-play-state: paused

@keyframes rotating
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
@-webkit-keyframes rot
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
