<template>
  <div class="bg-light min-vh-100">
    <AppNavbar />

    <main class="container py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue';
</script>
