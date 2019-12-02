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
        let card_sprites = [];
        for (let i = 0; i < fieldCards.length; i++) {
            let card = createFieldCards(fieldCards[i], scene, deck, 5 + i * 120, 5);
            card_sprites.push(card);
            // scene.append(card);
        }

        for (let i = 0; i < card_sprites.length; i++) {
            scene.append(card_sprites[i]);
        }

        var rect = new g.FilledRect({
            scene: scene,
            x: 500,
            y: 400,
            width: 30,
            height: 30,
            cssColor: "blue"
        });
        rect.touchable = true;
        rect.pointDown.add(function () {
            rect.cssColor = "red";
            rect.modified();
            exchangeCard(card_sprites, fieldCards, scene, deck);
        });
        scene.append(rect);
    });
    g.game.pushScene(scene);
}

function createFieldCards(card, scene, deck, x, y) {

    var group = new g.E({scene: scene});
    const c = new g.Sprite({
        scene: scene,
        src: scene.assets[card.viewAsCard()],
        touchable: true,
        x: x,
        y: y,
    });
    group.append(c);
    const mark = new g.FilledRect({
        scene: scene,
            x: x,
            y: y,
            width: 113,
            height: 5,
            cssColor: "blue"
    })
    c.pointDown.add((ev) => {
        card.willExchange();
        group.append(mark);
    });
    return group;
}

function getAllIndexes(arr) {
    console.log(arr);
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i].exchange)
            indexes.push(i);
    return indexes;
}


function exchangeCard(group_sprites, fieldCards, scene, deck) {
    let exchange_index = getAllIndexes(fieldCards);

    for (let i = 0; i < exchange_index.length; i++) {
        let ind = exchange_index[i];
        var gp = group_sprites[ind]
        var c = gp.children[0];
        c.surface = g.Util.asSurface(scene.assets[deck.getFirstCard().viewAsCard()]);
        var mark = gp.children[1];
        mark.cssColor = "transparent";
        mark.modified();
        c.modified();
    }
}

module.exports = main;
