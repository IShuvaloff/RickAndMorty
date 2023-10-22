<template>
  <BaseButton
    :id="dataId"
    class="base-btn-out inactive"
    :type="type"
    @click="toggleSortValue"
    :disabled="disabled"
  >
    <span class="base-btn-out__caption">{{ caption }}</span>
    <SvgIcon
      class="base-btn-out__icon base-btn-out__icon--rotated"
      name="iconChevronDown"
      v-if="modelValue !== 'none'"
    />
  </BaseButton>
</template>

<script lang="ts">
import { ButtonHTMLAttributes, defineComponent, PropType } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { TSortValue } from '@/scripts/interfaces';

export default defineComponent({
  name: 'BaseButtonOut',
  components: { SvgIcon },
  props: {
    caption: {
      type: String,
      default: 'Нажать',
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    modelValue: {
      type: String as PropType<TSortValue>,
      required: true,
      default: 'none',
    },
    dataId: {
      type: String,
      required: true,
    },
    disabled: Boolean,
  },
  computed: {
    elementButton() {
      return document.getElementById(this.dataId);
    },
    elementIcon() {
      return document.getElementById(this.dataId)?.querySelector('.base-btn-out__icon');
    },
  },
  emits: ['update:modelValue'],
  methods: {
    toggleSortValue(event: Event) {
      switch (this.modelValue) {
        case 'none':
          (event.currentTarget as HTMLInputElement).classList.remove('inactive');
        // eslint-disable-next-line no-fallthrough
        case 'desc':
          this.$emit('update:modelValue', 'asc');
          (event.currentTarget as HTMLInputElement)
            .querySelector('.base-btn-out__icon')
            ?.classList?.add('base-btn-out__icon--rotated');
          break;
        case 'asc':
          this.$emit('update:modelValue', 'desc');
          (event.currentTarget as HTMLInputElement)
            .querySelector('.base-btn-out__icon')
            ?.classList?.remove('base-btn-out__icon--rotated');
          break;
        default:
          this.$emit('update:modelValue', 'none');
      }
    },
  },
  mounted() {
    if (this.modelValue !== 'none') {
      this.elementButton?.classList.remove('inactive');
    }
    if (this.modelValue === 'desc') {
      this.elementIcon?.classList?.remove('base-btn-out__icon--rotated');
    }
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.base-btn-out
  background-color: $color-gs-1
  border: 1px solid $color-gs-3
  &__caption
    color: $color-primary
    line-height: 20px
    vertical-align: middle
    &:not(:last-child)
      margin-right: 5px
  &__icon
    width: 20px
    height: 20px
    fill: $color-primary
    transition: transform .2s ease-in-out
    &--rotated
      transform: rotate(180deg)
  &:focus:not(.inactive), &:hover:not(.inactive)
    border-color: $color-gs-5
    background-color: $color-gs-1
  &:active:not(.inactive)
    background-color: $color-primary-bg
    border-color: $color-gs-3
  &.inactive
    background-color: $color-gs-2
    border-color: $color-gs-5
    .base-btn-out__caption
      color: $color-gs-5
</style>
