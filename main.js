let CardDeck = require("CardDeck");
let constants = require("constants");

function main() {

    let deck = CardDeck.initDeck();
    deck.shuffle();
    let fieldCards = [];
    for (let i = 0; i < 5; i++) {
        fieldCards.push(deck.getFirstCard());
    }
    let scene = new g.Scene(
        {
            game: g.game,
            assetIds: constants.cardIds
        }
    );

    scene.loaded.add(function () {
        let card_sprites = [];
        for (let i = 0; i < fieldCards.length; i++) {
            let card = createFieldCards(fieldCards[i], scene, 5 + i * 120, 5);
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
        });
        scene.append(rect);
    });
    g.game.pushScene(scene);
}

function createFieldCards(card, scene, x, y) {

    let group = new g.E({scene: scene});
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
    });
    c.pointDown.add((ev) => {
        card.willExchange();
        group.append(mark);
    });
    return group;
}

function getAllIndexes(arr) {
    console.log(arr);
    let indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i].exchange)
            indexes.push(i);
    return indexes;
}


function exchangeCard(group_sprites, fieldCards, scene, deck) {
    let exchange_index = getAllIndexes(fieldCards);

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
