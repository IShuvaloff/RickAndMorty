<template>
  <BaseButton class="base-btn-text" :caption="caption" :type="type" />
</template>

<script lang="ts">
import { ButtonHTMLAttributes, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseButtonText',
  props: {
    caption: {
      type: String,
      default: 'Нажать',
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.base-btn-text
  background-color: transparent
  border: 1px solid transparent
  color: $color-primary
  &:focus:not(.disabled), &:hover:not(.disabled)
    border-color: transparent
    background-color: transparent
    color: $color-primary-hovered
  &:active:not(.disabled)
    border-color: $color-primary-bg
    background-color: $color-primary-bg
    color: $color-primary
  &.disabled
    border-color: transparent
    background-color: transparent
    color: $color-gs-5
</style>
