<template></template>

<script lang="ts">
import { defineComponent, ObjectDirective } from "vue";
import shopUpgrades from "../assets/json/upgrades.json";
import accessoiresUpgrades from "../assets/json/accessoires.json";
import achivementsUpgrades from "../assets/json/achivements.json";

export default defineComponent({
  components: {},
  data() {
    let highestIdUpgrade: number = shopUpgrades.length;
    let highestIdAccesoire: number = accessoiresUpgrades.length;
    let highestIdAchivement: number = achivementsUpgrades.length;


    return { highestIdUpgrade, highestIdAccesoire, highestIdAchivement }
  },
  setup() { },
  mounted() {
    this.createLocalStorage();
  },
  methods: {
    /**
     * creates all nesseary LS variables
     */
    async createLocalStorage(): Promise<void> {
      let i = 1;
      for (i = 1; i < this.highestIdUpgrade; i++) {
        this.getLocalStorage("shopUpgrade" + i);
        this.getLocalStorage("activeUpgrade" + i);
      }
      for (i = 1; i < this.highestIdAccesoire; i++) this.getLocalStorage("shopAccesoire" + i);
      for (i = 1; i < this.highestIdAchivement; i++) this.getLocalStorage("shopAchivement" + i);
      this.setLocalStorage("jetons", "300");
      this.getLocalStorage("devil");
    },

    /**
     * Checks if searched item exsists, if not it will be created with 0 as value
     * @param item name / id of Item in LS
     */
    async getLocalStorage(item: string): Promise<String> {
      let value: string | null = localStorage.getItem(item);
      if (value == null) {
        this.setLocalStorage(item, "0");
        value = "0";
      }
      return value;
    },

    /**
     * sets an new Item in LocalStorage
     * @param item name / id of item in LS
     * @param value value of LS item
     */
    async setLocalStorage(item: string, value: string): Promise<Boolean> {
      localStorage.setItem(item, value);
      return true;
    },
  },
});
</script>

<style lang="css" scoped>
</style>
