<template>
  <div>
    <section class="w-full mx-auto">
      <div class="relative bg-gray-200 p-4">
        <router-link to="/" class="btn-Header m-2 inline-block text-lg">Blackjack
        </router-link>
        <router-link to="/shop" class="btn-Header m-2 inline-block text-lg">Shop</router-link>
        <router-link to="/upgrades" class="btn-Header m-2 inline-block text-lg">Upgrades</router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  setup() { },
  mounted() { },
  methods: {},
});
</script>

<style lang="css" scoped>
</style>
