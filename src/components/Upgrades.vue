<template>
  <div>
    <!-- https://tailwindcomponents.com/component/projects-table -->
    <div class="overflow-x-auto">
      <div class="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div class="w-full lg:w-5/6">
          <table v-if="hasUpgrades()" class="min-w-max w-full table-auto bg-white shadow-md rounded my-6">
            <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-lg leading-normal">
                <th class="py-3 px-6 text-left">Title</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <tr v-for="i in upgrades" :key="i.id" class="border-b border-gray-200 hover:bg-gray-100">
                <td v-if="hasUnlocked(i.id)" class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2">
                      <img :src="i.src" alt="" class="w-6 h-6" />
                    </div>

                    <span class="text-base font-medium">{{ i.title }}</span>
                  </div>
                </td>
                <td v-if="hasUnlocked(i.id)" class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <span>{{ i.desc }}</span>
                  </div>
                </td>
                <td v-if="hasUnlocked(i.id)" class="flex justify-between items-center py-3 px-6 text-center">
                  <label class="switch">
                    <input type="checkbox" @click="toggleActive(i.id)" :checked="statusSlider[i.id]">
                    <span class="slider round"></span>
                  </label>
                  <span :class="statusClass[i.id]" class="mx-auto py-2 px-3 rounded-full text-base">
                    {{ statusText[i.id] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="mx-auto max-w-lg">
            <div class="shadow-2xl border-2 border-black rounded-3xl">
              <p class="p-7 text-2xl md:text-4xl font-medium text-yellow-600 ">
                You do not possses any upgrades.
              </p>
              <router-link to="/shop">
                <button class="button bg-gray-300 hover:bg-gray-400 my-4 w-4/5">
                  >> Shop &lt;&lt;
                </button>
              </router-link>
            </div>
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
    let statusClass: string[] = new Array(upgrades.length);
    let statusText: string[] = new Array(upgrades.length);
    let statusSlider: boolean[] = new Array(upgrades.length);


    return { upgrades, statusClass, statusText, statusSlider }
  },
  setup() { },
  mounted() {
    this.getClasses();
  },
  methods: {
    getClasses(startFrom: number = 1, endBy: number = upgrades.length): void {
      for (let i = startFrom; i < endBy; i++) {
        this.statusClass[i] = this.hasActive(i) ? "text-green-600 bg-green-200" : "text-red-600 bg-red-200";
        this.statusText[i] = this.hasActive(i) ? "Active" : "Deactivated";
        this.statusSlider[i] = this.hasActive(i) ? true : false;
      }
    },

    hasUnlocked(id: number): Boolean {
      if (localStorage.getItem("shopUpgrade" + id) == "1") return true;

      return false;
    },

    hasActive(id: number): Boolean {
      if (localStorage.getItem("activeUpgrade" + id) == "1") return true;

      return false;
    },

    async toggleActive(id: number) {
      let value: string | null = localStorage.getItem("activeUpgrade" + id);

      value == null ? "0" : value;

      localStorage.setItem("activeUpgrade" + id, value == "1" ? "0" : "1");

      this.getClasses(id, id + 1);
    },

    hasUpgrades(): Boolean {
      if (this.statusSlider.find(item => item === true)) return true;

      return false;
    }
  },
});
</script>

<style lang="css" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>