<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';


  
  fetch('https://dummyjson.com/products/search?q=phone')
  .then(res => res.json())
  .then(console.log);
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped>
</style>