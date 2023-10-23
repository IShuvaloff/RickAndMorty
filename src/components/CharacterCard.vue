<template>
  <div class="card" @click="dialogOpen" @keypress.enter="dialogOpen">
    <CharacterDialog v-if="isDialogOpened" :character="character" @cancel="dialogClose" />

    <div class="card__container">
      <img class="card__img" :src="image" alt="Персонаж" />

      <div class="card__content">
        <div class="card__text card__id">
          <p class="card__text--header">ID:</p>
          <p class="card__text--value">{{ character?.id }}</p>
        </div>
        <div class="card__text card__name">
          <p class="card__text--header">ИМЯ:</p>
          <p class="card__text--value">{{ character?.name }}</p>
        </div>
        <div class="card__text card__status">
          <p class="card__text--header">СТАТУС:</p>
          <p class="card__text--value">{{ character?.status }}</p>
        </div>
        <div class="card__text card__species">
          <p class="card__text--header">РАСА:</p>
          <p class="card__text--value">{{ character?.species }}</p>
        </div>
        <div class="card__text card__type">
          <p class="card__text--header">ТИП:</p>
          <p class="card__text--value">{{ character?.type }}</p>
        </div>
        <div class="card__text card__gender">
          <p class="card__text--header">ПОЛ:</p>
          <p class="card__text--value">{{ character?.gender }}</p>
        </div>
        <div class="card__text card__origin">
          <p class="card__text--header">ПРОИСХ.:</p>
          <a
            class="card__text--value card__link"
            :href="String(character?.origin?.url)"
            target="_blank"
            >{{ character?.origin?.name }}</a
          >
        </div>
        <div class="card__text card__location">
          <p class="card__text--header">МЕСТО:</p>
          <a
            class="card__text--value card__link"
            :href="String(character?.location?.url)"
            target="_blank"
            >{{ character?.location?.name }}</a
          >
        </div>
      </div>
    </div>

    <!-- <SvgIcon
      class="icon card__icon card__icon--edit"
      name="iconEdit"
      title="Изменить запись"
      @click="dialogOpen"
    /> -->
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, defineAsyncComponent } from 'vue';
import { mapMutations } from 'vuex';
import { ICharacter } from '@/scripts/interfaces';
// import SvgIcon from './SvgIcon.vue';

export default defineComponent({
  name: 'CharacterCard',
  components: {
    // SvgIcon,
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
    width: 100%
    max-width: 350px
    max-height: 300px
    object-fit: cover
  &__content
    display: flex
    flex-direction: column
    align-items: flex-start
    margin-bottom: 10px
    margin-top: 40px
  &__text
    display: flex
    // align-items: center
    margin-bottom: 5px
    width: 100%
    font-size: 16px
    &--header
      margin-right: 10px
      font-weight: 600
    &--value
      word-break: break-word

@media (max-width: 575.98px)
  .card
    &__img
      max-height: 250px
    &__container
      padding: 10px
</style>
