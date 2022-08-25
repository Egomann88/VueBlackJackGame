<template>
  <div>
    <!-- https://tailwindcomponents.com/component/projects-table -->
    <div class="overflow-x-auto">
      <div class="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div class="w-full lg:w-5/6">
          <div class="bg-white shadow-md rounded my-6">
            <table class="min-w-max w-full table-auto">
              <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-lg leading-normal">
                  <th class="py-3 px-6 text-left">Title</th>
                  <th class="py-3 px-6 text-left">Description</th>
                  <th class="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                <tr v-for="i in upgrades" :key="i.id" class="border-b border-gray-200 hover:bg-gray-100">
                  <td class="py-3 px-6 text-left whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="mr-2">
                        <img :src="i.src" alt="" class="w-6 h-6" />
                      </div>
                      <span class="text-base font-medium">{{ i.title }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-left">
                    <div class="flex items-center">
                      <span>{{ i.desc }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-center">
                    <span :class="i.id == 2 ? 'text-green-600 bg-green-200 ' : 'text-red-600 bg-red-200 '"
                      class=" py-1 px-3 rounded-full text-base">{{ i.id == 2 ? 'Active' : 'Deactivated' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import upgrades from "../assets/json/upgrades.json";

export default defineComponent({
  components: {},
  data() {

    return { upgrades }
  },
  setup() { },
  mounted() { },
  methods: {},
});
</script>

<style lang="css" scoped>
</style>