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

    exchangeCard(scene, deck) {
        for (let i = 0; i < this.getLength(); i++) {
            let card = this.cards[i];
            let _c = card.qState.simulated.clone();
            let cloneQubit = _c.qubits[_c.index];
            if (cloneQubit.measure() === 1) {
                scene.remove(card.sprite);
                let newCard = deck.getFirstCard();
                newCard.x = card.x;
                newCard.y = card.y;
                newCard.toSprites(scene, card.x, card.y);
                this.cards[i] = newCard;
                scene.append(newCard.sprite);
            }
        }
    }

    judgePoint() {

        let sortedCard = this.cards.sort((card1, card2) => {
            return card1.num - card2.num
        });

        const isFlush = sortedCard.every((card) => card.mark === sortedCard[0].mark);

        const isStraight = (() => {
            for (let i = 1; i < sortedCard.length; i++) {
                if (sortedCard[i - 1].num + 1 !== sortedCard[i].num) {
                    return false;
                }
            }
            return true;
        })();


        let counts = {};
        for (let i = 0; i < sortedCard.length; i++) {
            counts[sortedCard[i].num] = counts[sortedCard[i].num] ? counts[sortedCard[i].num] + 1 : 1;
        }
        counts = Object.keys(counts).map((e) => ({key: e, value: counts[e]}));
        counts.sort(function (a, b) {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
        });
        const maxHit = counts[0].value;
        const secondHit = counts[1].value;

        // TODO Royal flush
        if (isFlush && isStraight) {
            return 'straight flush';
        } else if (maxHit === 4) {
            return 'quads';
        } else if (maxHit === 3 && secondHit === 2) {
            return 'full house';
        } else if (isFlush) {
            return 'flush';
        } else if (isStraight) {
            return 'straight';
        } else if (maxHit === 3) {
            return 'trips';
        } else if (maxHit === 2 && secondHit === 2) {
            return 'two pair';
        } else if (maxHit === 2) {
            return 'pair';
        } else {
            return 'non';
        }
    }
}

module.exports = FieldCards;
