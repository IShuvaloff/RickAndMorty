<template>
  <div class="card" @dblclick="dialogOpen">
    <!-- <ProductDialog
      v-if="isDialogOpened"
      :product="data"
      @cancel="dialogClose"
      @submit="dialogSubmit"
    /> -->

    <div class="card__container">
      <img class="card__img" :src="photo" alt="Персонаж" />

      <p class="card__name">{{ character?.name }}</p>
      <p class="card__status">{{ character?.status }}</p>
      <p class="card__species">{{ character?.species }}</p>
      <p class="card__type">{{ character?.type }}</p>
      <p class="card__gender">{{ character?.gender }}</p>
      <a class="card__origin" :href="character?.origin?.url">{{ character?.origin?.name }}</a>
      <a class="card__location" :href="character?.location?.url">{{ character?.location?.name }}</a>

      <!-- <div class="card__content">
        <div class="card__rating">
          <p class="card__rating-rate">Рейтинг: {{ person?.rating?.rate }}</p>
          <p class="card__rating-count">Голосов: {{ person?.rating?.count }}</p>
        </div>

        <h2 class="card__title">{{ person?.title }}</h2>
        <p class="card__category">{{ person?.category }}</p>
        <p class="card__descr">{{ person?.description }}</p>
        <p class="card__price">Цена: {{ person?.price }}</p>
      </div>

      <div class="card__options">
        <BaseButton
          class="base-btn--plans card__option"
          caption="В планы"
          v-show="person?.group !== 1"
          @click="moveToPlans"
        />
        <BaseButton
          class="base-btn--working card__option"
          caption="В работу"
          v-show="person?.group !== 2"
          @click="moveToWorking"
        />
        <BaseButton
          class="base-btn--complete card__option"
          caption="Завершить"
          v-show="person?.group !== 3"
          @click="moveToComplete"
        />
      </div> -->
    </div>

    <SvgIcon
      class="icon icon--delete card__icon card__icon--edit"
      name="iconEdit"
      title="Изменить запись"
      @click="dialogOpen"
    />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { ICharacter } from '@/scripts/interfaces';
import SvgIcon from './SvgIcon.vue';
// import { DBProductEdit, DBProductDelete } from '@/scripts/api';

export default defineComponent({
  name: 'CharacterCard',
  components: {
    SvgIcon,
    // ProductDialog: defineAsyncComponent({
    //   loader: () => import('@/components/ProductDialog.vue'),
    //   delay: 0,
    //   loadingComponent: () => '<h2>Загрузка...</h2>',
    // }),
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
    photo() {
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
//   &--plans
//     background-color: $color-bg-card-plans
//   &--working
//     background-color: $color-bg-card-working
//   &--complete
//     background-color: $color-bg-card-complete
  &__icon
    &--edit
      position: absolute
      top: 10px
      left: 10px
      width: 20px
      height: 20px
      fill: $color-primary
//     &--delete
//       position: absolute
//       top: 5px
//       right: 5px
//       width: 35px
//       height: 35px
//       stroke: red
//       transform: rotate(45deg)
//   &__container
//     display: flex
//     flex-direction: column
//     align-items: stretch
//     padding: 20px
//   &__img
//     align-self: center
//     border-radius: 6px
//     max-height: 300px
//     max-width: 75%
//   &__content
//     display: flex
//     flex-direction: column
//     align-items: flex-start
//     margin-bottom: 10px
//     margin-top: 40px
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

// @media (max-width: 575.98px)
//   .card
//     &__img
//       max-height: 250px
//     &__container
//       padding: 10px
//     &__rating
//       font-size: 13px
//     &__title
//       font-size: 16px
//     &__category
//       font-size: 11px
//     &__descr
//       font-size: 12px
//     &__price
//       font-size: 16px
</style>
