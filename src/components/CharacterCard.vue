<template>
  <div class="card" @click="dialogOpen" @keypress.enter="dialogOpen">
    <CharacterDialog v-if="isDialogOpened" :character="character" @cancel="dialogClose" />

    <div class="card__container">
      <img class="card__img" :src="image" alt="Персонаж" />

      <div class="card__content">
        <p class="card__text card__id">
          <span class="card__text--header">ID:</span> {{ character?.id }}
        </p>
        <p class="card__text card__name">
          <span class="card__text--header">ИМЯ:</span> {{ character?.name }}
        </p>
        <p class="card__text card__status">
          <span class="card__text--header">СТАТУС:</span> {{ character?.status }}
        </p>
        <p class="card__text card__species">
          <span class="card__text--header">РАСА:</span> {{ character?.species }}
        </p>
        <p class="card__text card__type">
          <span class="card__text--header">ТИП:</span> {{ character?.type }}
        </p>
        <p class="card__text card__gender">
          <span class="card__text--header">ПОЛ:</span> {{ character?.gender }}
        </p>
        <p class="card__text card__origin">
          <span class="card__text--header">ПРОИСХОЖДЕНИЕ:</span>
          <a class="card__link" :href="String(character?.origin?.url)" target="_blank">{{
            character?.origin?.name
          }}</a>
        </p>
        <p class="card__text card__location">
          <span class="card__text--header">МЕСТО:</span>
          <a class="card__link" :href="String(character?.location?.url)" target="_blank">{{
            character?.location?.name
          }}</a>
        </p>
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
      // loadingComponent: () => '<h2>Загрузка...</h2>',
    }),
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
  width: 90%
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
  &__text
    font-size: 16px
    font-weight: 600
    word-break: break-word
    &--header
      width: 30%

@media (max-width: 575.98px)
  .card
    &__img
      max-height: 250px
    &__container
      padding: 10px
</style>
