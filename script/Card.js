class Card {
    constructor(mark, num) {
        this.mark = mark;
        this.num = num;
        this.exchange = false;
    }

    viewAsCard() {
        return "card_" + this.mark + "_" + this.num.toString();
    }

    willExchange() {
        console.log("Will Exchange", this.viewAsCard());
        this.exchange = true;
    }
}

module.exports = Card;
