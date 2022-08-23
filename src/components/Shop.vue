<template>
  <div>
    <section class="w-full mx-auto py-8">
      <div class="flex border-2 border-black">
        <aside class="flex-shrink-0 w-[24rem] bg-gray-200">
          <div class="flex flex-col h-full pt-12 pb-4 rounded-lg neumorphism-shadow">
            <div
              class="flex flex-col items-center justify-center flex-shrink-0 px-4 py-2 mx-4 rounded-lg neumorphism-shadow">
              <img src="/src/assets/yes.png" alt="" class="neumorphism-shadow rounded-full w-16 h-16 -mt-8" />
              <p class="text-2xl px-4 py-1 font-semibold tracking-wider text-gray-600">
                Shop</p>
            </div>
            <nav class="flex-1 max-h-full p-4 mt-6 overflow-y-hidden">
              <ul class="max-h-full p-2 space-y-1 overflow-y-auto divide-y divide-blue-300 neumorphism-shadow">
                <li>
                  <button
                    class="flex items-center w-full px-4 py-2 text-gray-600 transition-transform transform rounded-md hover:translate-x-1 focus:outline-none focus:ring">
                    <img src="/src/assets/money.png" alt="" class="w-12 h-12" />

                    <span class="ml-4 text-xl">Upgrades</span>
                  </button>
                </li>
                <li>
                  <button
                    class="flex items-center w-full px-4 py-2 text-gray-600 transition-transform transform rounded-md hover:translate-x-1 focus:outline-none focus:ring">
                    <img src="/src/assets/clothes.png" alt="" class="w-12 h-12" />

                    <span class="ml-4 text-xl">Accessoires</span>
                  </button>
                </li>
                <li>
                  <button
                    class="flex items-center w-full px-4 py-2 text-gray-600 transition-transform transform rounded-md hover:translate-x-1 focus:outline-none focus:ring">
                    <img src="/src/assets/star.png" alt="" class="w-12 h-12" />

                    <span class="ml-4 text-xl">Achivements</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div class="w-full mx-4 border-2 border-black">
          <div class="flex flex-wrap overflow-hidden">
            <div v-for="i in shopUpgrades" :key="i.id" class="w-full overflow-hidden lg:w-1/2 p-4">
              <div>
                <div class="rounded-xl bg-gray-400 shadow-md">
                  <img :src="i.src" alt="" class="w-full rounded-xl" />
                  <div>
                    <h3 class="text-center pt-2">{{ i.title }}</h3>
                    <p class="text-justify p-4">{{ i.desc }}</p>

                    <button class="w-4/5 my-4 mx-auto button text-lg bg-white hover:bg-gray-200">Buy ({{ i.price }}
                      Jetons)</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import shopUpgrades from "../assets/json/upgrades.json";

export default defineComponent({
  components: {},
  data() {

    return { shopUpgrades }
  },
  setup() { },
  mounted() { },
  methods: {},
});
</script>

<style lang="css" scoped>
.neumorphism-shadow {
  box-shadow: -4px -4px 10px rgb(229, 231, 235), 4px 4px 10px rgba(0, 0, 0, 0.219);
}
</style>
