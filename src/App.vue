<template>
  <div id="teleport-target"></div>
  <nav>
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/about">About</router-link> -->
  </nav>
  <router-view />
</template>

<style lang="sass">
@import 'normalize-scss'
@include normalize()
@import './assets/sass/variables'
@import './assets/sass/fonts'
@import './assets/sass/reset'

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
nav
  margin-top: 10px
  margin-bottom: 10px
  text-align: center
</style>
