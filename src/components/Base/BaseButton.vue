<template>
  <button class="base-btn" :type="type" :disabled="disabled">
    {{ caption }}
    <slot />
  </button>
</template>

<script lang="ts">
import { ButtonHTMLAttributes, PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
  props: {
    caption: {
      type: String,
      // default: 'Нажать',
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    disabled: Boolean,
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.base-btn
  display: flex
  align-items: center
  justify-content: space-evenly
  padding: 10px
  background-color: $color-primary
  border-radius: 6px
  transition: background-color .2s ease-in-out, opacity .2s ease-in-out, color .2s ease-in-out
  font-weight: 600
  font-size: 16px
  color: $color-gs-1
  letter-spacing: 0.15px
  &:disabled
    opacity: 50%
  &__icon
    fill: $color-gs-1
  &:focus, &:hover
    background-color: lighten($color-primary, 10%) //$color-primary-hovered
  &:active
    background-color: darken($color-primary, 5%) //$color-primary-pressed
  &--plans
    background-color: $color-plans
    &:focus, &:hover
      background-color: lighten($color-plans, 10%)
    &:active
      background-color: darken($color-plans, 5%)
  &--working
    background-color: $color-working
    &:focus, &:hover
      background-color: lighten($color-working, 10%)
    &:active
      background-color: darken($color-working, 5%)
  &--complete
    background-color: $color-complete
    &:focus, &:hover
      background-color: lighten($color-complete, 10%)
    &:active
      background-color: darken($color-complete, 5%)

@media (max-width: 991.98px)
  .base-btn
    font-size: 14px

@media (max-width: 575.98px)
  .base-btn
    padding: 5px
    font-size: 12px
</style>
