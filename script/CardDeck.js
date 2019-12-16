let Card = require("Card");

class CardDeck {
    constructor(cards) {
        this.cards = cards;
    }
    static initDeck() {
        let marks = ['spade', 'diamond', 'club', 'heart'];
        let _cards = [];
        for (let i = 0; i < marks.length; i++) {
            for (let j = 0; j < 13; j++) {
                let c = new Card(marks[i], j + 1);
                _cards.push(c);
            }
        }
        return new this(_cards);
    }
    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--){
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = this.cards[i];
            this.cards[i] = this.cards[r];
            this.cards[r] = tmp;
        }
    }
    getFirstCard() {
        return this.cards.pop();
    }
}

module.exports = CardDeck;
