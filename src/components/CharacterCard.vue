<template>
  <div class="card" @dblclick="dialogOpen">
    <CharacterDialog v-if="isDialogOpened" :character="character" @cancel="dialogClose" />

    <div class="card__container">
      <img class="card__img" :src="image" alt="Персонаж" />

      <div class="card__content">
        <p class="card__id">{{ character?.id }}</p>
        <p class="card__name">{{ character?.name }}</p>
        <p class="card__status">{{ character?.status }}</p>
        <p class="card__species">{{ character?.species }}</p>
        <p class="card__type">{{ character?.type }}</p>
        <p class="card__gender">{{ character?.gender }}</p>
        <a class="card__origin" :href="String(character?.origin?.url)">{{
          character?.origin?.name
        }}</a>
        <a class="card__location" :href="String(character?.location?.url)">{{
          character?.location?.name
        }}</a>
      </div>
    </div>

    <SvgIcon
      class="icon card__icon card__icon--edit"
      name="iconEdit"
      title="Изменить запись"
      @click="dialogOpen"
    />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, defineAsyncComponent } from 'vue';
import { mapMutations } from 'vuex';
import { ICharacter } from '@/scripts/interfaces';
import SvgIcon from './SvgIcon.vue';

export default defineComponent({
  name: 'CharacterCard',
  components: {
    SvgIcon,
    CharacterDialog: defineAsyncComponent({
      loader: () => import('@/components/CharacterDialog.vue'),
      delay: 0,
      loadingComponent: () => '<h2>Загрузка...</h2>',
    }),
    // CharacterDialog,
  },
  props: {
    character: {
      type: Object as PropType<ICharacter>,
      requred: true,
    },
  },
  data() {
    return {
      isDialogOpened: false,
    };
  },
  computed: {
    image() {
      return this.character?.image
        ? this.character.image
        : new URL('@/assets/no-photo.jpg', import.meta.url).href;
    },
  },
  methods: {
    ...mapMutations(['deleteProduct', 'updateProduct']),
    dialogOpen() {
      this.isDialogOpened = true;
    },
    dialogClose() {
      this.isDialogOpened = false;
    },
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/sass/variables'

.card
  position: relative
  display: flex
  flex-direction: column
  align-items: stretch
  border-radius: 6px
  max-width: 400px
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px
  &__icon
    &--edit
      position: absolute
      top: 10px
      left: 10px
      width: 20px
      height: 20px
      fill: red
  &__container
    display: flex
    flex-direction: column
    align-items: stretch
    padding: 20px
  &__img
    align-self: center
    border-radius: 6px
    max-height: 300px
    max-width: 75%
  &__content
    display: flex
    flex-direction: column
    align-items: flex-start
    margin-bottom: 10px
    margin-top: 40px
//   &__rating
//     align-self: stretch
//     display: flex
//     align-items: center
//     justify-content: space-between
//     font-size: 16px
//   &__title
//     font-size: 24px
//     word-break: break-word
//   &__category
//     align-self: flex-end
//     margin-bottom: 10px
//     font-weight: 600
//     font-size: 14px
//     color: $color-gs-5
//   &__descr
//     word-break: break-word
//   &__price
//     align-self: flex-end
//     margin-bottom: 10px
//     font-weight: 600
//     font-size: 20px
//   &__options
//     display: flex
//     align-items: center
//     justify-content: stretch
//   &__option
//     width: 100%
//     color: $color-gs-7 !important
//     &:not(:last-child)
//       margin-right: 10px

@media (max-width: 575.98px)
  .card
    &__img
      max-height: 250px
    &__container
      padding: 10px
    // &__rating
    //   font-size: 13px
    // &__title
    //   font-size: 16px
    // &__category
    //   font-size: 11px
    // &__descr
    //   font-size: 12px
    // &__price
    //   font-size: 16px
</style>
