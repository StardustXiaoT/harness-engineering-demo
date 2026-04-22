<script setup>
import MenuBar from './components/MenuBar.vue'
</script>

<template>
  <MenuBar />
  <main class="main-content">
    <router-view />
  </main>
</template>

<style scoped>
.main-content {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}
</style>
