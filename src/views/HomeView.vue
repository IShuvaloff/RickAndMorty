<template>
  <BaseContainer class="home">
    <h1 class="home__header visually-hidden">Персонажи мультсериала "Rick & Morty"</h1>

    <div class="control-panel home__control-panel">
      <ButtonReload
        class="control-panel__reload"
        data-id="reload-list"
        :progress="loadingProgress"
        :error="loadingError"
        @click="loadCharacters(sorts)"
      />
      <PanelSorts class="control-panel__sorts" v-model:sorts="sorts" :disabled="isLoading" />
    </div>

    <div class="home__cards">
      <!-- <transition-group name="characters-list"> -->
      <CharacterCard
        v-for="person in getCharacters"
        :key="(person as ICharacter).id"
        :character="person"
      />
      <!-- </transition-group> -->
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CharacterCard from '@/components/CharacterCard.vue';
import PanelSorts from '@/components/ControlPanel/PanelSorts.vue';
import ButtonReload from '@/components/ButtonReload.vue';
import { ICharacter, ICharacterInfoExtended, ICharacterSorts } from '@/scripts/interfaces';

export default defineComponent({
  name: 'HomeView',
  components: { CharacterCard, PanelSorts, ButtonReload },
  data() {
    return {
      sorts: {
        gender: 'none',
        name: 'none',
        origin: 'none',
      } as ICharacterSorts,
    };
  },
  computed: {
    ...mapGetters(['getCharacters', 'getCharactersInfo']),
    isLoading() {
      return (this.getCharactersInfo as ICharacterInfoExtended).loading();
    },
    loadingProgress() {
      return Math.round((this.getCharactersInfo as ICharacterInfoExtended).loadingState() * 100);
    },
    loadingError() {
      return (this.getCharactersInfo as ICharacterInfoExtended).error;
    },
  },
  watch: {
    sorts: {
      handler() {
        this.sortCharacters(this.sorts);
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(['sortCharacters']),
    ...mapActions(['loadCharacters']),
  },
  created() {
    if (this.getCharacters.length && !this.getCharactersInfo.error) return;

    this.loadCharacters(this.sorts).then(() => {
      console.log('данные загружены');
    });
  },
});
</script>

<style lang="sass" scoped>
.home
  &__control-panel
    margin-bottom: 20px
  &__cards
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 30px
    justify-items: center

.control-panel
  display: flex
  align-items: center
  justify-content: center
  &__reload
    flex-shrink: 0
    margin-right: 20px

.list-item
  display: inline-block
  margin-right: 10px
.characters-list-enter-active,
.characters-list-leave-active
  transition: all .4s ease
.characters-list-enter-from,
.characters-list-leave-to
  opacity: 0
  transform: translateY(30px)
.characters-list-move
  transition: transform 0.4s ease

@media (max-width: 991.98px)
  .home
    &__cards
      grid-template-columns: repeat(2, 1fr)

@media (max-width: 575.98px)
  .home
    &__cards
      grid-template-columns: 1fr
  .control-panel
    &__reload
      margin-right: 7px
</style>
