<template>
  <teleport to="#teleport-target">
    <div class="dialog" ref="dialog">
      <div class="dialog__wrapper">
        <div class="dialog__header">
          <span>{{ character?.name ?? 'Неизвестный персонаж' }}</span>
        </div>

        <div class="dialog__container">
          <img class="dialog__img" :src="image" alt="Персонаж" />

          <div class="dialog__content">
            <!-- <div class="dialog__text dialog__id">
              <p class="dialog__text--header">ID:</p>
              <p class="dialog__text--value">{{ character?.id }}</p>
            </div> -->
            <!-- <div class="dialog__text dialog__name">
              <p class="dialog__text--header">ИМЯ:</p>
              <p class="dialog__text--value">{{ character?.name }}</p>
            </div> -->
            <div class="dialog__text dialog__status">
              <p class="dialog__text--header">СТАТУС:</p>
              <p class="dialog__text--value">{{ character?.status }}</p>
            </div>
            <div class="dialog__text dialog__species">
              <p class="dialog__text--header">РАСА:</p>
              <p class="dialog__text--value">{{ character?.species }}</p>
            </div>
            <div class="dialog__text dialog__type">
              <p class="dialog__text--header">ТИП:</p>
              <p class="dialog__text--value">{{ character?.type }}</p>
            </div>
            <div class="dialog__text dialog__gender">
              <p class="dialog__text--header">ПОЛ:</p>
              <p class="dialog__text--value">{{ character?.gender }}</p>
            </div>
            <div class="dialog__text dialog__origin">
              <p class="dialog__text--header">ПРОИСХ.:</p>
              <a
                class="dialog__text--value dialog__link"
                :href="String(character?.origin?.url)"
                target="_blank"
                >{{ character?.origin?.name }}</a
              >
            </div>
            <div class="dialog__text dialog__location">
              <p class="dialog__text--header">МЕСТО:</p>
              <a
                class="dialog__text--value dialog__link"
                :href="String(character?.location?.url)"
                target="_blank"
                >{{ character?.location?.name }}</a
              >
            </div>
            <BaseButtonOut
              class="button button--second dialog__btn dialog__btn--close"
              caption="Закрыть"
              @click="cancel"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICharacter } from '@/scripts/interfaces';

export default defineComponent({
  name: 'ProductDialog',
  components: {},
  props: {
    character: Object as PropType<ICharacter>,
  },
  computed: {
    image() {
      return this.character?.image
        ? this.character.image
        : new URL('@/assets/no-photo.jpg', import.meta.url).href;
    },
  },
  emits: ['cancel'],
  methods: {
    stopScrolling() {
      document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`; // чтобы не происходил визуальный скачок интерфейса
      document.body.style.overflow = 'hidden';
    },
    startScrolling() {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = 'null';
    },
    cancel() {
      this.startScrolling();
      this.$emit('cancel');
    },
  },
  mounted() {
    this.stopScrolling();
    document.addEventListener('click', (item) => {
      if (item.target === this.$refs.dialog) {
        this.cancel();
      }
    });
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.dialog
  position: fixed
  top: 0
  bottom: 0
  right: 0
  left: 0
  z-index: 99
  display: flex
  justify-content: center
  align-items: center
  background: rgba(51, 51, 51, 0.6)
  overflow: auto
  &__wrapper
    display: flex
    flex-direction: column
    justify-content: stretch
    align-items: stretch
    padding: 30px
    background-color: white
    border-radius: 6px
    box-shadow: 4px 4px 8px 0px rgba(black, 0.5)
    min-width: 300px
    max-height: 650px
    max-width: 90%
    overflow: auto
  &__header
    flex-grow: 0
    flex-shrink: 0
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 20px
    font-size: 25px
    &-close
      &:hover
        cursor: pointer
  &__icon
    &--close
      width: 30px
      height: 30px
      stroke: black
      transform: rotate(45deg)
  &__content
    flex-grow: 1
    flex-shrink: 1
    display: flex
    flex-direction: column
    justify-content: center
    align-items: stretch
    width: 100%
    & > *:not(:last-child)
      width: 100%
      margin-bottom: 10px
  &__btn
    display: flex
    align-items: center
    justify-content: center
  &__btn--close
    margin-right: 20px
  &__img
    align-self: center
    border-radius: 6px
    max-height: 300px
    width: 100%
    max-width: 250px
    object-fit: cover

  &__container
    display: grid
    gap: 30px
    margin-bottom: 10px
  &__text
    display: flex
    margin-bottom: 5px
    width: 100%
    font-size: 16px
    &:last-of-type
      margin-bottom: 30px
    &--header
      margin-right: 10px
      font-weight: 600
    &--value
      word-break: break-word

@media (orientation: portrait)
  .dialog
    &__container
      grid-template-columns: 1fr
    &__text
      &--header
        width: 80px
        text-align: end

@media (orientation: landscape)
  .dialog
    &__container
      grid-template-columns: repeat(2, 1fr)

@media (max-width: 575.98px)
  .dialog
    &__wrapper
      padding: 15px
    &__header
      font-size: 22px
    &__input
      font-size: 14px
    &__btn--close
      padding: 10px
      margin-right: 10px
</style>
