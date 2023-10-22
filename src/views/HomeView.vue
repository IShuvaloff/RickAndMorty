<template>
  <BaseContainer class="home">
    <h1 class="home__header visually-hidden">Персонажи мультсериала "Rick & Morty"</h1>

    <div class="control-panel home__control-panel">
      <PanelSorts class="control-panel__sorts" v-model:sorts="sorts" :disabled="isLoading" />
    </div>

    <div class="home__cards">
      <transition-group name="characters-list">
        <CharacterCard
          v-for="person in getCharacters"
          :key="(person as ICharacter).id"
          :character="person"
        />
      </transition-group>
    </div>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import CharacterCard from '@/components/CharacterCard.vue';
import PanelSorts from '@/components/ControlPanel/PanelSorts.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICharacter, ICharacterInfoExtended, ICharacterSorts } from '@/scripts/interfaces';

export default defineComponent({
  name: 'HomeView',
  components: { CharacterCard, PanelSorts },
  data() {
    return {
      charactersOperated: [] as ICharacter[],
      sorts: {
        gender: 'desc',
        name: 'asc',
        origin: 'none',
      } as ICharacterSorts,
    };
  },
  computed: {
    ...mapGetters(['getCharacters', 'getCharactersInfo']),
    isLoading() {
      return (this.getCharactersInfo as ICharacterInfoExtended).loading();
    },
  },
  watch: {
    getCharactersInfo: {
      handler(value: ICharacterInfoExtended) {
        console.log(value.loadingState());
      },
      deep: true,
    },
    sorts: {
      handler(value: ICharacterSorts) {
        console.log(value);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['loadCharacters']),
  },
  created() {
    if (this.getCharacters.length && !this.getCharactersInfo.error) return;

    this.loadCharacters()
      .then(() => {
        console.log('данные загружены');
        this.charactersOperated = [...this.getCharacters];
      })
      .catch((err) => {
        console.log(err.message);
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

@media (max-width: 991.98px)
  .home
    grid-template-columns: repeat(2, 1fr)

@media (max-width: 575.98px)
  .home
    grid-template-columns: 1fr
</style>
