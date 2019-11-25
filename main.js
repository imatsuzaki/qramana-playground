var CardDeck = require("CardDeck");

function main() {

    let deck = CardDeck.initDeck();
    console.log(deck);
    deck.shuffle();
    console.log(deck);

    var fieldCards = [];
    for (i = 0; i < 5; i++) {
        fieldCards.push(deck.getFirstCard());
    };

    console.log(fieldCards);

    let scene = new g.Scene(
        {
            game: g.game,
        }
    );



    // scene.loaded.add(function () {
    //     var rect = new g.FilledRect({
    //         scene: scene,
    //         x: g.game.width - 50,
    //         y: g.game.height - 20,
    //         width: 100,
    //         height: 20,
    //         cssColor: "blue"
    //     });
    //
    //     rect.touchable = true;
    //     rect.pointDown.add(function () {
    //         rect.cssColor = "red";
    //         rect.modified();
    //         init(scene);
    //     });
    //     scene.append(rect);
    // });
    g.game.pushScene(scene);
}

module.exports = main;
