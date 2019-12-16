let CardDeck = require("CardDeck");
let constants = require("constants");
let FieldCards = require("FieldCards");

function main() {

    let deck = CardDeck.initDeck();
    deck.shuffle();
    let fieldCards = new FieldCards([]);
    for (let i = 0; i < 5; i++) {
        fieldCards.addCardToLast(deck.getFirstCard());
    }
    let scene = new g.Scene(
        {
            game: g.game,
            assetIds: constants.cardIds
        }
    );

    scene.loaded.add(function () {
        let card_sprites = [];
        for (let i = 0; i < fieldCards.getLength(); i++) {
            let card = fieldCards.getByIndex(i).toSprites(scene, 5 + i * 120, 5);
            card_sprites.push(card);
        }

        for (let i = 0; i < card_sprites.length; i++) {
            scene.append(card_sprites[i]);
        }

        let rect = new g.FilledRect({
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

            console.log("========= Last filed cards ============");
            console.log(fieldCards.cards);
            console.log('=======================================')
        });
        scene.append(rect);
    });
    g.game.pushScene(scene);
}


function getAllIndexes(arr) {
    let indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i].exchange)
            indexes.push(i);
    return indexes;
}


function exchangeCard(group_sprites, fieldCards, scene, deck) {
    let exchange_index = getAllIndexes(fieldCards.cards);

    for (let i = 0; i < exchange_index.length; i++) {
        let ind = exchange_index[i];
        let gp = group_sprites[ind];
        let c = gp.children[0];
        c.surface = g.Util.asSurface(scene.assets[deck.getFirstCard().viewAsCard()]);
        let mark = gp.children[1];
        mark.cssColor = "transparent";
        mark.modified();
        c.modified();
    }
}

module.exports = main;
