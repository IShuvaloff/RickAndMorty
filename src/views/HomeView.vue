<template>
  <BaseContainer class="home">
    <h1 class="home__header visually-hidden">Персонажи мультсериала "Rick & Morty"</h1>
    <CharacterCard
      v-for="person in getCharacters"
      :key="(person as ICharacter).id"
      :character="person"
    />
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import CharacterCard from '@/components/CharacterCard.vue';
import { ICharacter } from '@/scripts/interfaces';

export default defineComponent({
  name: 'HomeView',
  components: { CharacterCard },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(['getCharacters', 'getCharactersInfo']),
  },
  methods: {
    ...mapActions(['loadCharacters']),
  },
  created() {
    this.loadCharacters()
      .then((res) => {
        console.log('данные загружены');
        console.log(this.getCharactersInfo);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
});
</script>

<style lang="sass" scoped>
.home
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
