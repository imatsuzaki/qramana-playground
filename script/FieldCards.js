class FieldCards {
    constructor(cards) {
        this.cards = cards;
    }

    addCardToLast(card) {
        this.cards.push(card);
    }

    getLength() {
        return this.cards.length;
    }

    getByIndex(i) {
        return this.cards[i];
    }
}

module.exports = FieldCards;
