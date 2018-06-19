
const MAX_PLAYER_RATING = 3;
const TWO_SECONDS = 1000;
const TURN_LIMIT = 7;

class GamePlay {
  /**
   * @description Creates an instance of the Game class.
   * 
   * Note that the wait function used within this class was taken from
   * https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11
   * @memberof GamePlay
   */
  constructor() {
    this.deck = null;
    this.gameDeck = [];
    this.gameUI = null;
    this.turnCount = 0;
    this.playerRating = MAX_PLAYER_RATING;
    this.firstCard = undefined;
    this.wait = ms => new Promise((r, j) => setTimeout(r, ms))
  }

  /**
   * @description Set the reference to the Deck object
   * @param {Object} deck Reference to an instance of the Deck class
   * @memberof GamePlay
   */
  setDeck(deck) {
    this.deck = deck;
  }

  /**
   * @description Set the reference to the GameUI object
   * @param {Object} gameUI Reference to an instance of the GameUI class
   * @memberof GamePlay
   */
  setGameUI(gameUI) {
    this.gameUI = gameUI;
  }

  /**
   * @description Retrieve the game deck
   * @returns {Object[]} Game deck
   * @memberof GamePlay
   */
  getGameDeck() {
    return this.gameDeck;
  }

  /**
   * @description Start a new game by shuffling the template card deck
   * to create a new game deck
   * @memberof GamePlay
   */
  startNewGame() {
    this.firstCard = undefined;
    this.flipCount = 0;
    this.turnCount = 0;
    this.playerRating = MAX_PLAYER_RATING;
    this.gameDeck = this.deck.shuffle();
    const deckFragment = this.gameUI.buildDeck(this.gameDeck);
  }

  /**
   * @description Control a turn within the game. Within each turn the player
   * flips over a pair of cards If both cards have matching symbols they will
   * remain up. However, if the player chooses two cards with different symbols
   * they will both be flipped back over. 
   * @param {Number} cardIndex Index of the selected card in the deck.
   * @returns {Boolean} True if last turn, otherwise false is returned
   * @memberof GamePlay
   */
  turn(selectedCardIndex) {
    this.turnCount += 1;
    this.flipCount += 1;
    this.gameUI.turnCardFaceUp(selectedCardIndex);

    if (this.flipCount === 1) {
      this.firstCard = selectedCardIndex;
    } else {
      if (!this.deck.isSymbolMatch(this.gameDeck, this.firstCard, selectedCardIndex)) {
        this.pairNotMatched(this.firstCard, selectedCardIndex);
      } else {
        this.pairMatched(this.firstCard, selectedCardIndex);
      }
    }

    if (this.turnCount >= TURN_LIMIT) {
     return true;
    }
    return false;
  }

  /**
   * @description Process a pair of cards matched by the user
   * @param {Number} firstCardCard Index of the first card of the pair in the deck
   * @param {Number} secondCardCard Index of the second card of the pair in the deck
   * @memberof GamePlay
   */
  pairMatched(firstCardIndex, secondCardIndex) {
    this.gameUI.markMatchedPair(firstCardIndex, secondCardIndex);
    this.firstCard = undefined;
    this.flipCount = 0;
  }


  /**
   * @description Process a pair of selected cards whose symbols don't match
   * @param {Number} firstCardCard Index of the first card of the pair in the deck
   * @param {Number} secondCardCard Index of the second card of the pair in the deck
   * @memberof GamePlay
   */
  async pairNotMatched(firstCardIndex, secondCardIndex) {
    await this.wait(TWO_SECONDS);
    this.gameUI.turnCardFaceDown(firstCardIndex);
    this.gameUI.turnCardFaceDown(secondCardIndex);
    this.firstCard = undefined;
    this.flipCount = 0;
  }

}

export default GamePlay;
