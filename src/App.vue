<template>
  <Header />
  <div style="min-height: 100vh">
    <router-view />
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Header from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped></style>
