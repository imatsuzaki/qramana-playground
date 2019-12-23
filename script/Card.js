let q = require("@qramana/qramana");

class Card {
    constructor(mark, num) {
        this.mark = mark;
        this.num = num;
        this.qState = new q.Qubit({value: 0});
    }

    viewAsAssetId() {
        return "card_" + this.mark + "_" + this.num.toString();
    }

    toSprites(scene, x, y) {
        let touchableCardUi = new g.E({scene: scene});
        const card_id = "card_" + this.mark + "_" + this.num.toString();
        const cardUi = new g.Sprite({
            scene: scene,
            src: scene.assets[card_id],
            touchable: true,
            x: x,
            y: y,
        });
        touchableCardUi.append(cardUi);
        const selectedBar = new g.FilledRect({
            scene: scene,
            x: x,
            y: y,
            width: 113,
            height: 5,
            cssColor: "blue"
        });
        cardUi.pointDown.add(ev => {
            this.qState.x();
            console.log(this.qState.toString());
            touchableCardUi.append(selectedBar);
        });
        return touchableCardUi
    }
}

module.exports = Card;
