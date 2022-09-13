<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import shopUpgrades from "../assets/json/upgrades.json";
import accessoiresUpgrades from "../assets/json/accessoires.json";
import achivementsUpgrades from "../assets/json/achivements.json";

export default defineComponent({
  components: {},
  data() {
    const highestIdUpgrade: number = shopUpgrades.length;
    const highestIdAccesoire: number = accessoiresUpgrades.length;
    const highestIdAchivement: number = achivementsUpgrades.length;


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
      let highestValue: string[] = new Array(this.highestIdUpgrade).fill('0');

      if (!localStorage.getItem("shopUpgrades"))
        this.setLocalStorage("shopUpgrades", JSON.stringify(highestValue));

      if (!localStorage.getItem("activeUpgrades"))
        this.setLocalStorage("activeUpgrades", JSON.stringify(highestValue));

      highestValue = new Array(this.highestIdAccesoire).fill('0');
      if (!localStorage.getItem("shopAccesoires"))
        this.setLocalStorage("shopAccesoires", JSON.stringify(highestValue));

      highestValue = new Array(this.highestIdAchivement).fill('0');
      if (!localStorage.getItem("shopAchivements"))
        this.setLocalStorage("shopAchivements", JSON.stringify(highestValue));

      if (!localStorage.getItem("jetons"))
        this.setLocalStorage("jetons", "300");

      this.getLocalStorage("devilDeal");
    },

    /**
     * Checks if searched item exsists, if not it will be created with 0 as value
     * @param { boolean } item name / id of Item in LS
     * @param { boolean } isArray checks if aimed LS item is an array
     */
    async getLocalStorage(item: string, isArray: boolean = false): Promise<String> {
      let value: string | null = localStorage.getItem(item);
      if (value == null) {
        this.setLocalStorage(item, !isArray ? "0" : JSON.stringify("[]"));
        value = !isArray ? "0" : JSON.stringify("[]");
      }
      return JSON.parse(value);
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
