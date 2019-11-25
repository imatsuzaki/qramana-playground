class Card {
    constructor(mark, num) {
        this.mark = mark;
        this.num = num;
    }

    viewAsCard() {
        return "card_" + this.mark + "_" + this.num.toString();
    }
}

module.exports = Card;
