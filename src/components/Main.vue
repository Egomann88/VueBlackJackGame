<template>
  <div class="min-h-screen relative">
    <!-- Result - popup -->
    <div v-if="showPopup">
      <section class="h-screen w-screen bg-gray-700 fixed top-0 opacity-75 z-40">
        <div @click="reset()" class="absolute inset-0 z-40"></div>
      </section>
      <div class="w-full md:w-1/2 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40">
        <div class="flex h-full">
          <div :class="doubleBlackJck" class="flex flex-col m-auto bg-gray-300 p-8 rounded-2xl shadow-2xl">
            <h3>{{ result }}</h3>
            <h4 class="my-2">{{ jetonsMsg }}</h4>
            <button @click="reset()" class="btn mt-6 border-2 border-black tracking-widest">O.K</button>
          </div>
        </div>
      </div>
    </div>

    <!-- sidebar -->
    <Rules />

    <!-- section -->
    <section class="w-full xl:w-3/4 mx-auto px-2 py-12">
      <img src="../assets/devil.png" alt="" class="w-24 absolute right-0 bottom-0  animation-fallDown" />
      <div class="mx-auto max-w-md">
        <p class="text-2xl border-2 border-b-0 border-black">
          Jeonts: <b>{{ playerJetons }}</b>
        </p>
      </div>
      <div class="relative border-2 border-black">
        <section v-if="restructure" class="restructure absolute w-full h-full z-30">
          <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white">
            please wait a moment
          </p>
        </section>
        <div class="lg:flex items-center justify-around">
          <!-- dealer -->
          <div class="mt-4 sm:m-4">
            <h2>Dealer:
              <span v-if="!canHit" :class="dealerPts == 21 ? blackJackClass : ''">
                {{ dealerPts }}
              </span>
              <span v-else :class="dealerPts - dealerHiddenValue == 21 ? blackJackClass : ''">
                {{ dealerPts - dealerHiddenValue }}
              </span>
            </h2>
            <div class="sm:flex">
              <img :src="dealerHiddenCardImgSrc" alt="" height="175" width="125" class="p-1 mx-auto inline-block" />
              <img v-for="i in dealerCardImgSrc.length" :key="i" :src="dealerCardImgSrc[i - 1]" alt="" height="175"
                width="125" class="p-1 mx-auto inline-block" />
            </div>
          </div>

          <!-- Player -->
          <div class="mt-4 sm:m-4">
            <h2>Player:
              <span :class="playerPts == 21 ? blackJackClass : ''">
                {{ playerPts }}
              </span>
            </h2>
            <div class="sm:flex">
              <img v-for="i in playerCardImgSrc.length" :key="i" :src="playerCardImgSrc[i - 1]" alt="" height="175"
                width="125" class="p-1 mx-auto inline-block">
            </div>
          </div>
        </div>
        <!-- result -->
        <div class="mt-4">
          <button @click="play(1);" :disabled="!canHit" :class="!canHit ? 'disabled' : ''"
            class="btn w-full sm:w-1/4 mt-2 sm:m-2">Hit</button>
          <button @click="play(2);" :disabled="!canHit" :class="!canHit ? 'disabled' : ''"
            class="btn w-full sm:w-1/4 mt-2 sm:m-2">Double</button>
          <button @click="stay()" class="btn w-full sm:w-1/4 mt-2 sm:m-2">Stay</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
/* https://www.youtube.com/watch?v=bMYCWccL-3U */
import { defineComponent } from "vue";
import Rules from "./Rules.vue";

export default defineComponent({
  components: {
    Rules,
  },
  data() {
    let dealerPts: number = 0,
      playerPts: number = 0,
      dealerAceCount: number = 0,
      playerAceCount: number = 0,
      dealerHiddenValue: number = 0,
      playerCardsOnField: number = 0,
      playerJetons: number = parseInt(localStorage.getItem("jetons")!),
      gameJetons: number = 0; // per dealer and playercard + 5 jetons ; facevalue of won jetons ; blackjack triples value ; double blackjack sixtees 

    let cardImgTopSrc: string = "/src/assets/cards/",
      dealerHiddenCardImgSrc: string = "/src/assets/cards/BACK.png",
      result: string = "",
      doubleBlackJck: string = "",
      blackJackClass: string = " text-4xl text-amber-400 ",
      jetonsMsg: string = "";

    let dealerCardImgSrc: string[] = [],
      playerCardImgSrc: string[] = [],
      deck: string[] = [];

    let hidden: any = ""; // string | undefinded

    let canHit: boolean = true,
      showPopup: boolean = false,
      restructure: boolean = false;

    return {
      dealerPts,
      playerPts,
      dealerAceCount,
      playerAceCount,
      dealerHiddenValue,
      playerCardsOnField,
      playerJetons,
      gameJetons,
      cardImgTopSrc,
      dealerHiddenCardImgSrc,
      result,
      doubleBlackJck,
      blackJackClass,
      jetonsMsg,
      dealerCardImgSrc,
      playerCardImgSrc,
      deck,
      hidden,
      canHit,
      showPopup,
      restructure,
    }
  },
  setup() { },
  mounted() {
    this.buildDeck();
    this.shuffleDeck();
    this.startGame();
  },
  methods: {
    /**
     * filles the deck with all cards
     */
    buildDeck() {
      const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      const categories = ["C", "D", "H", "S"];

      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
          this.deck.push(cardValues[j] + "-" + categories[i]); // A-C, A-D,...
        }
      }
    },

    /**
     * Shuffles all card in the players deck randomly
     */
    shuffleDeck() {
      for (let i = 0; i < this.deck.length; i++) {
        let j = Math.round(Math.random() * this.deck.length);
        let temp = this.deck[i];
        this.deck[i] = this.deck[j];
        this.deck[j] = temp;
      }
    },

    /**
     * declaires all cards of the dealer (pulls cards until he reaches a value over equal 17 [with hidden cards])
     * @func buildDeck is called to rebuild deck, if it wasn't created properly
     * @func shuffleDeck shuffels the deck new
     * @func startGame restarts the function, if something was misdone
     * @func getValue adds the Value of the card to the max points
     * @func checkAce adds if an ace was drawn
     */
    startGame() {
      let i: number = 0;
      let card: string | undefined = "";
      this.gameJetons = 0; // resets Jetons / must be an positive value

      this.hidden = this.deck.pop();

      if (this.hidden == undefined) { // prevents site crash, when game resets
        console.error("fatal error: hidden is undefined", this.hidden);
        this.reset(); // restart
      }

      // reckon with the hidden value right from the start
      this.gameJetons += 5;
      this.dealerHiddenValue += this.getValue(this.hidden);
      this.dealerPts += this.getValue(this.hidden);
      this.dealerAceCount += this.checkAce(this.hidden);

      while (this.dealerPts < 17) {

        do {
          card = this.deck.pop(); // cut last value
        } while (card == undefined);  // prevents loading crash

        this.gameJetons += 5; // increase gameJetons
        this.dealerCardImgSrc[i] = this.cardImgTopSrc + card + ".png";  // add cardSrc
        this.dealerPts += this.getValue(card);  // adds value of card to dealers points
        this.dealerAceCount += this.checkAce(card);  // check if aces exists
        i++;
      }

      for (i = this.playerCardsOnField; i < 2; i++) { // player begins with two cards

        do {
          card = this.deck.pop(); // cut last value
        } while (card == undefined);  // prevents loading crash

        this.gameJetons += 5; // increase gameJetons
        this.playerCardImgSrc[i] = this.cardImgTopSrc + card + ".png";  // add cardSrc
        this.playerPts += this.getValue(card);  // adds value of card to dealers points
        this.playerAceCount += this.checkAce(card);  // check if aces exists
        this.playerCardsOnField = i + 1;
      }
    },

    /**
     * checks the value of the card and returns it
     * @param {string} card full name of the card
     * @returns number -> value of card
     */
    getValue(card: string): number {
      // 1[0]
      if (card[1] == "0") return 10;

      switch (card[0]) {  // is first diggit A, J, Q or K
        case "A":
          return 11;
        case "J":
        case "Q":
        case "K":
          return 10;
      }

      return parseInt(card[0]);
    },

    /**
     * Checks if the card is an ace, if yes returns an 1
     * @param card full name of card
     * @returns 1 if is an a ace / 0 when not
     */
    checkAce(card: string): number {
      // A-D, A-S, K-D, 10-S,...
      if (card[0] == "A") return 1;

      return 0;
    },

    /**
     * checks, if the playersPts are more than 21 and he has one or more aces
     * if so, the player loses 10 Pts (11 - 10) for the alternate value of ace
     * 
     * @param playerPts all points of the player 
     * @param playerAceCount all the aces the player has
     * @returns number -> playerPts 
     */
    reduceAce(playerPts: number, playerAceCount: number): number {
      while (playerPts > 21 && playerAceCount > 0) {
        playerPts -= 10;
        playerAceCount -= 1;
      }

      return playerPts;
    },

    /**
     * As first, it checks if the player is still able to draw cards.
     * Then it draws a new Card
     * Deaktivates the Hit Button is nessesary 
     * 
     * @func play restart the function 
     * @func adds the Value of the card to the max points
     * @func checkAce adds if an ace was drawn
     * @func reduceAce 
     * @param { number } mult card value multiplier
     * @returns number
     */
    play(mult: number): number {
      if (!this.canHit) {
        alert('You cannot play anymore.');
        return 0;
      }

      let card: string | undefined = this.deck.pop(); // cut last value

      if (card == undefined) {
        console.error("card is undefined", card);
        this.play(mult);  // restart func
        return 0;
      }

      this.gameJetons += 5 * mult;  // double card, also doubles jetons
      this.playerCardImgSrc[this.playerCardsOnField++] = this.cardImgTopSrc + card + ".png";  // add cardSrc
      this.playerPts += this.getValue(card) * mult;  // adds value of card to dealers points
      this.playerAceCount = this.checkAce(card) * mult;  // check if aces exists

      if (this.playerPts > 21) {  // if playerPts is over 21, reduce the ace value (if possible)
        this.playerPts = this.reduceAce(this.playerPts, this.playerAceCount);
        this.playerAceCount = 0;
      }

      if (this.playerPts > 21 || mult == 2) {  // if playerpts over 21 or doubled 
        this.canHit = false;
      }
      return 1;
    },

    /**
     * Reduces Ace values if needed, reveals hidden card value and declares if player won or not
     * 
     * @func reduceAce reducesAce value if needed
     * @func togglePopup shows won / lose Popup
     */
    stay(): void {
      let resultMsg: string = "";
      let jetonsMsg: string = "";
      let won: boolean = false;

      this.dealerPts > 21 ? this.reduceAce(this.dealerPts, this.dealerAceCount) : this.dealerPts; // reduces Points, if nessesary
      this.playerPts > 21 ? this.reduceAce(this.playerPts, this.playerAceCount) : this.playerPts; // reduces Points, if nessesary

      this.canHit = false;  // show true value of dealer
      this.dealerHiddenCardImgSrc = this.cardImgTopSrc + this.hidden + ".png"; // hidden img

      this.getJeontsValue();

      if ((this.playerPts == 21 || this.dealerPts == 21) && this.playerPts != this.dealerPts) {
        resultMsg = "Blackjack! ";
        if (this.playerPts != 21) {
          resultMsg += "You Lose!";
          jetonsMsg = "You lost " + this.gameJetons + " Jeonts.";
        } else {
          resultMsg += "You Win!";
          jetonsMsg = "You won " + this.gameJetons + " Jeonts.";
          won = true;
        }
      } else if (this.playerPts > 21) {  // even if dealer is also over 21, you still lose
        resultMsg = "You Lose!";
        jetonsMsg = "You lost " + this.gameJetons + " Jeonts.";
      } else if (this.dealerPts > 21) {
        resultMsg = "You Win!";
        jetonsMsg = "You won " + this.gameJetons + " Jeonts.";
        won = true;
      } else if (this.playerPts == this.dealerPts) {
        if (this.playerPts == 21) {
          resultMsg = "double Blackjack!";
          jetonsMsg = "You get " + this.gameJetons + " Jeonts.";
          won = true; // win = get
          this.doubleBlackJck = "bg-gradient-to-r from-red-400 to-black text-white animation-scaleUp";
        } else {
          resultMsg = "Tie!";
          jetonsMsg = "You keep your Jeonts.";
          this.gameJetons = 0;  // delete all Jetons, to not lose any
        }
      } else if (this.playerPts < this.dealerPts) {
        resultMsg = "You Lose!";
        jetonsMsg = "You lost " + this.gameJetons + " Jeonts.";
      } else if (this.playerPts > this.dealerPts) {
        resultMsg = "You Win!";
        jetonsMsg = "You won " + this.gameJetons + " Jeonts.";
        won = true;
      } else {
        console.error("Unknown Error");
      }

      if (won) this.playerJetons += this.gameJetons;
      else this.playerJetons -= this.gameJetons;

      localStorage.setItem("jetons", this.playerJetons.toString());

      this.result = resultMsg;
      this.jetonsMsg = jetonsMsg;

      this.togglePopup();
    },


    /**
     * calculates gameJetons value
     * 
     * if dealer or player is over 21, the value will be halfed. 
     * When Blackjack, Jetons will be trippled, when double Blackjack, will Jetons be sixfolded
     */
    getJeontsValue(): void {
      let dPts = 0;
      let pPts = 0;

      this.dealerPts > 21 ? dPts = Math.round(this.dealerPts / 2) : dPts = this.dealerPts;
      this.playerPts > 21 ? pPts = Math.round(this.playerPts / 2) : pPts = this.playerPts;

      this.gameJetons += dPts + pPts;

      if (this.dealerPts == 21 && this.playerPts == 21) this.gameJetons *= 6;
      else if (this.dealerPts == 21 || this.playerPts == 21) this.gameJetons *= 3;
    },

    /**
     * Toggles won / lose Popup
     */
    async togglePopup() {
      this.showPopup = !this.showPopup;
    },

    /**
     * sets all variabels to default and restarts all functions
     * @func buildDeck refills the deck
     * @func shuffleDeck shuffle the deck
     * @func startGame gives dealer and player starter cards
     * @func togglePopup disables / hides  Popup
     */
    reset(): void {
      // sets variables to default
      this.dealerPts = 0;
      this.playerPts = 0;
      this.dealerAceCount = 0;
      this.playerAceCount = 0;
      this.dealerHiddenValue = 0;
      this.playerCardsOnField = 0;
      this.dealerHiddenCardImgSrc = "/src/assets/cards/BACK.png";
      this.doubleBlackJck = "";
      this.deck = []; // clear deck
      this.dealerCardImgSrc = [];
      this.playerCardImgSrc = [];
      this.hidden = "";
      this.canHit = true;
      this.restructure = true;  // show loading / restructure screen 

      this.buildDeck(); // refills the deck
      this.shuffleDeck(); // shuffle new
      this.startGame();

      this.togglePopup(); // disables / hides  Popup

      setTimeout(() => {
        this.restructure = false;  // show loading / restructure screen 
      }, 300);  // wait, for new cards
    },
  },
});
</script>

<style scoped>
.restructure {
  background-color: #818181;
  opacity: .8;
}

.animation-scaleUp {
  -webkit-animation: scaleUp 3.5s ease 0s infinite;
  -moz-animation: scaleUp 3.5s ease 0s infinite;
  -ms-animation: scaleUp 3.5s ease 0s infinite;
  animation: scaleUp 3.5s ease 0s infinite;
}

.animation-fallDown {
  -webkit-animation: fallDown 2.0s ease 0s;
  -moz-animation: fallDown 2.0s ease 0s;
  -ms-animation: fallDown 2.0s ease 0s;
  animation: fallDown 2.0s ease 0s;
}

@-webkit-keyframes scaleUp {
  0% {
    transform: rotate(1.45);
    transform: scale(1.25);
  }

  50% {
    transform: rotate(1.45);
    transform: scale(2);
  }

  100% {
    transform: rotate(1.45);
    transform: scale(1.25);
  }
}

@keyframes scaleUp {
  0% {
    transform: rotate(1.45);
    transform: scale(1.25);
  }

  50% {
    transform: rotate(1.45);
    transform: scale(2);
  }

  100% {
    transform: rotate(1.45);
    transform: scale(1.25);
  }
}

@keyframes fallDown {
  0% {
    transform: translateY(-100vh);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
