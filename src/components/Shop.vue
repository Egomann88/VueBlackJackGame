<template>
  <div>
    <section class="w-full mx-auto py-8">
      <div class="block md:flex">
        <!-- sidebar -->
        <aside class="flex-shrink-0 w-full md:w-[24rem] bg-gray-200">
          <div class="flex flex-col h-full pt-12 pb-4 rounded-lg neumorphism-shadow">
            <div
              class="flex flex-col items-center justify-center flex-shrink-0 px-4 py-2 mx-4 rounded-lg neumorphism-shadow">
              <img src="/src/assets/shop/yes.png" alt="" class="neumorphism-shadow rounded-full w-16 h-16 -mt-8" />
              <p class="text-2xl px-4 py-1 font-semibold tracking-wider text-gray-600">
                Shop</p>
            </div>
            <nav class="flex-1 max-h-full p-4 mt-6 overflow-y-hidden">
              <ul
                class="max-h-full p-2 space-y-1 overflow-y-auto divide-y divide-blue-300 rounded-lg neumorphism-shadow">
                <li>
                  <button @click="switchActiveTab(1)"
                    class="flex items-center w-full px-4 py-2 text-gray-600 transition-transform transform rounded-md hover:translate-x-1 focus:outline-none focus:ring">
                    <img src="/src/assets/shop/money.png" alt="" class="w-12 h-12" />

                    <span class="ml-4 text-xl">Upgrades</span>
                  </button>
                </li>
                <li>
                  <button @click="switchActiveTab(2)"
                    class="flex items-center w-full px-4 py-2 text-gray-600 transition-transform transform rounded-md hover:translate-x-1 focus:outline-none focus:ring">
                    <img src="/src/assets/shop/clothes.png" alt="" class="w-12 h-12" />

                    <span class="ml-4 text-xl">Accessoires</span>
                  </button>
                </li>
                <li>
                  <button @click="switchActiveTab(3)"
                    class="flex items-center w-full px-4 py-2 text-gray-600 transition-transform transform rounded-md hover:translate-x-1 focus:outline-none focus:ring">
                    <img src="/src/assets/shop/star.png" alt="" class="w-12 h-12" />

                    <span class="ml-4 text-xl">Achivements</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <!--  -->
        <div class="w-full mx-0 md:mx-4">
          <div class="w-full flex flex-wrap justify-center items-center p-4">
            <!--  -->
            <div v-if="activeTab == 1" v-for="i in shopUpgrades" :key="i.id" :class="i.req == i.id - 1 ? 'hidden' : ''"
              class="w-full lg:w-1/3 p-4">
              <div v-if="i.req != i.id - 1" class="rounded-xl bg-gray-300 shadow-md">
                <img :src="i.src" alt="" class="w-full rounded-xl" />
                <div>
                  <h3 class="text-center font-semibold text-xl xl:text-2xl px-2 pt-2">{{ i.title }}</h3>
                  <p class="text-center p-4">{{ i.desc }}</p>

                  <button class="w-4/5 my-4 mx-auto button text-lg bg-white hover:bg-gray-200">Buy ({{ i.price }}
                    Jetons)</button>
                </div>
              </div>
            </div>

            <div v-if="activeTab == 2" v-for="i in accessoiresUpgrades" :key="i.id" class="w-full lg:w-1/3 p-4">
              <div class="rounded-xl bg-gray-300 shadow-md">
                <img :src="i.src" alt="" class="w-full rounded-xl" />
                <div>
                  <h3 class="text-center font-semibold text-xl xl:text-2xl px-2 pt-2">{{ i.title }}</h3>
                  <p class="text-center p-4">{{ i.desc }}</p>

                  <button class="w-4/5 my-4 mx-auto button text-lg bg-white hover:bg-gray-200">Buy ({{ i.price }}
                    Jetons)</button>
                </div>
              </div>
            </div>

            <div v-if="activeTab == 3" v-for="i in achivementsUpgrades" :key="i.id" class="w-full lg:w-1/3 p-4">
              <div class="rounded-xl bg-gray-300 shadow-md">
                <img :src="i.src" alt="" class="w-full rounded-xl" />
                <div>
                  <h3 class="text-center font-semibold text-xl xl:text-2xl px-2 pt-2">{{ i.title }}</h3>
                  <p class="text-center p-4">{{ i.desc }}</p>

                  <button :disabled="i.price == 0" :class="i.price == 0 ? 'disabled' : ''"
                    class="w-4/5 my-4 mx-auto button text-lg bg-white hover:bg-gray-200">
                    <span v-if="i.price == 0">Not for Sale</span>
                    <span v-else-if="false">Sold</span>
                    <span v-else>
                      Buy ({{ i.price }} Jetons)
                    </span>
                  </button>
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
import accessoiresUpgrades from "../assets/json/accessoires.json";
import achivementsUpgrades from "../assets/json/achivements.json";

export default defineComponent({
  components: {},
  data() {
    let activeTab: number = 1;

    return { shopUpgrades, accessoiresUpgrades, achivementsUpgrades, activeTab }
  },
  setup() { },
  mounted() { },
  methods: {
    /**
    * overwrites active tab number
    * @param newTab new Tab number
    */
    switchActiveTab(newTab: number) {
      this.activeTab = newTab;
    },
  },
});
</script>

<style scoped>
.neumorphism-shadow {
  box-shadow: -4px -4px 10px rgb(229, 231, 235), 4px 4px 10px rgba(0, 0, 0, 0.219);
}
</style>
