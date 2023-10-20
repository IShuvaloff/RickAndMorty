<template>
  <BaseContainer class="home">
    <h1 class="home__header visually-hidden">Персонажи мультсериала "Rick & Morty"</h1>
  </BaseContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style lang="sass" scoped>
.home
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 20px
</style>
