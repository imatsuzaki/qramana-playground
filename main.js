var CardDeck = require("CardDeck");

function main() {

    var deck = CardDeck.initDeck();
    deck.shuffle();
    var fieldCards = [];
    for (i = 0; i < 5; i++) {
        fieldCards.push(deck.getFirstCard());
    }
    var scene = new g.Scene(
        {
            game: g.game,
            assetIds: [
                "card_spade_1",
                "card_spade_2",
                "card_spade_3",
                "card_spade_4",
                "card_spade_5",
                "card_spade_6",
                "card_spade_7",
                "card_spade_8",
                "card_spade_9",
                "card_spade_10",
                "card_spade_11",
                "card_spade_12",
                "card_spade_13",
                "card_club_1",
                "card_club_2",
                "card_club_3",
                "card_club_4",
                "card_club_5",
                "card_club_6",
                "card_club_7",
                "card_club_8",
                "card_club_9",
                "card_club_10",
                "card_club_11",
                "card_club_12",
                "card_club_13",
                "card_heart_1",
                "card_heart_2",
                "card_heart_3",
                "card_heart_4",
                "card_heart_5",
                "card_heart_6",
                "card_heart_7",
                "card_heart_8",
                "card_heart_9",
                "card_heart_10",
                "card_heart_11",
                "card_heart_12",
                "card_heart_13",
                "card_diamond_1",
                "card_diamond_2",
                "card_diamond_3",
                "card_diamond_4",
                "card_diamond_5",
                "card_diamond_6",
                "card_diamond_7",
                "card_diamond_8",
                "card_diamond_9",
                "card_diamond_10",
                "card_diamond_11",
                "card_diamond_12",
                "card_diamond_13"
            ]
        }
    );

    scene.loaded.add(function () {
        for (let i = 0; i < fieldCards.length; i++) {
            let card = createFieldCards(fieldCards[i], scene, deck, 5 + i * 120, 5);
            scene.append(card);
        }
    });
    g.game.pushScene(scene);
}

function createFieldCards(card, scene, deck, x, y) {
    console.log(card.viewAsCard());
    const c = new g.Sprite({
        scene: scene,
        src: scene.assets[card.viewAsCard()],
        touchable: true,
        x: x,
        y: y,
    });
    console.log(c);
    c.pointDown.add(() => {
        let next_card = deck.getFirstCard();
        c.surface = g.Util.asSurface(scene.assets[next_card.viewAsCard()]);
        c.modified();
    });
    return c
}


module.exports = main;
