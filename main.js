var CardDeck = require("CardDeck");

function main() {

    var deck = CardDeck.initDeck();
    deck.shuffle();
    var fieldCards = [];
    for (i = 0; i < 5; i++) {
        fieldCards.push(deck.getFirstCard());
    };
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
            ]
        }
    );
    scene.loaded.add(function() {



        for (let i = 0; i < fieldCards.length; i++) {
            let card = createFieldCards(fieldCards[i], scene, 5 + i * 120, 5)
            scene.append(card);
        }
    });
    g.game.pushScene(scene);
}

function createFieldCards(card, scene, x, y) {
    console.log(card.viewAsCard());
    const c = new g.Sprite({
        scene: scene,
        src: scene.assets[card.viewAsCard()],
        touchable: true,
        x: x,
        y: y,
    })
    console.log(c);
    c.pointDown.add(() => {
        c.surface =  g.Util.asSurface(scene.assets["card_spade_13"]);
        c.modified();
    })
    return c
}


module.exports = main;
