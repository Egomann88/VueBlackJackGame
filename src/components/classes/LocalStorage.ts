import shopUpgrades from "../../assets/json/upgrades.json";
import accessoiresUpgrades from "../../assets/json/accessoires.json";
import achivementsUpgrades from "C:/Users/Justin/Documents/.vsCode/Vue/vueBlackJackGame/src/assets/json/achivements.json";

export const LocalStorage = {
  /**
   * creates all nesseary LS variables
   */
  async createLocalStorage(): Promise<void> {
    let highestIdUpgrade: number = shopUpgrades.length;
    let highestIdAccesoire: number = accessoiresUpgrades.length;
    let highestIdAchivement: number = achivementsUpgrades.length;
    let i: number = 1;

    for (i = 1; i < highestIdUpgrade; i++) this.getLocalStorage("shopUpgrade" + i);
    for (i = 1; i < highestIdAccesoire; i++) this.getLocalStorage("shopAccesoire" + i);
    for (i = 1; i < highestIdAchivement; i++) this.getLocalStorage("shopAchivement" + i);
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
}