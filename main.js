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
            fieldCards.exchangeCard(card_sprites, scene, deck);

            const judge = fieldCards.judgePoint();
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: g.FontFamily.Serif,
                size: 30
            });
            var label = new g.Label({
                scene: scene,
                font: font,
                text: judge,
                fontSize: 30,
                textColor: "blue",
                x: 255,
                y: 250
            });
            scene.append(label);
            console.log(fieldCards.judgePoint());
        });
        scene.append(rect);


    });
    g.game.pushScene(scene);
}

module.exports = main;
