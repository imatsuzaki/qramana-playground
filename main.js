let CardDeck = require("CardDeck");
let constants = require("constants");
let FieldCards = require("FieldCards");

function getSelected(fieldCards) {
    return fieldCards.cards.filter(c => c.selected);
}

function generateQuantumGate(name, x, y, scene) {
    let font = new g.DynamicFont({
        game: g.game,
        fontFamily: g.FontFamily.SansSerif,
        size: 30,
    });
    return new g.Label({
        scene: scene,
        font: font,
        text: name,
        fontSize: 30,
        textColor: "blue",
        x: x,
        y: y,
        touchable: true,
    })
}

function main() {

    let scene = new g.Scene(
        {
            game: g.game,
            assetIds: constants.cardIds
        }
    );

    let deck = CardDeck.initDeck(scene);
    deck.shuffle();
    let fieldCards = new FieldCards([]);
    for (let i = 0; i < 5; i++) {
        fieldCards.addCardToLast(deck.getFirstCard());
    }

    scene.loaded.add(function () {
        for (let i = 0; i < fieldCards.getLength(); i++) {
            fieldCards.getByIndex(i).toSprites(scene, 5 + i * 120, 5);
            let card = fieldCards.getByIndex(i).sprite;
            scene.append(card);
        }

        let xGate = generateQuantumGate("X", 50, 255, scene);
        xGate.pointDown.add(function () {
            let selectedCards = getSelected(fieldCards);
            if (selectedCards.length !== 1) {
                console.log("Selected one card.");
                selectedCards.forEach(c => c.unselect());
                return
            }
            let card = selectedCards[0];
            card.qState.x();
            selectedCards.forEach(c => c.unselect());
        });
        scene.append(xGate);

        let yGate = generateQuantumGate("Y", 100, 255, scene);
        yGate.pointDown.add(function () {
            let selectedCards = getSelected(fieldCards);
            if (selectedCards.length !== 1) {
                console.log("Selected one card.");
                selectedCards.forEach(c => c.unselect());
                return
            }
            let card = selectedCards[0];
            card.qState.y();
            selectedCards.forEach(c => c.unselect());
        });
        scene.append(yGate);

        let hadamardGate = generateQuantumGate("H", 150, 255, scene);
        hadamardGate.pointDown.add(() => {
            let selectedCards = getSelected(fieldCards);
            if (selectedCards.length !== 1) {
                console.log("Selected two card.");
                selectedCards.forEach(c => c.unselect());
                return
            }
            let card = selectedCards[0];
            console.log(card.qState.toString());
            card.qState.h();
            console.log(card.qState.toString());
            selectedCards.forEach(c => c.unselect());
        });
        scene.append(hadamardGate);

        let cNotGate = generateQuantumGate("CNOT" , 200, 255, scene);
        cNotGate.pointDown.add(() => {
            let selectedCards = getSelected(fieldCards);
            if (selectedCards.length !== 2) {
                console.log("Selected two card.");
                selectedCards.forEach(c => c.unselect());
                return
            }
            let card1 = selectedCards[0];
            console.log(card1.qState.toString());
            let card2 = selectedCards[1];
            card2.qState.cnot(card1.qState);
            console.log(card1.qState.toString());
            selectedCards.forEach(c => c.unselect());
        });
        scene.append(cNotGate);


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
            fieldCards.exchangeCard(scene, deck);
            const judge = fieldCards.judgePoint();
            let font = new g.DynamicFont({
                game: g.game,
                fontFamily: g.FontFamily.Serif,
                size: 30
            });
            let label = new g.Label({
                scene: scene,
                font: font,
                text: judge,
                fontSize: 30,
                textColor: "green",
                x: 255,
                y: 300,
            });
            scene.append(label);
            console.log(fieldCards.judgePoint());
        });
        scene.append(rect);


    });
    g.game.pushScene(scene);
}

module.exports = main;
