let q = require("@qramana/qramana");

class Card {
    constructor(mark, num, scene) {
        this.mark = mark;
        this.num = num;
        this.selected = false;
        this.qState = new q.Qubit({value: 0});

        this.scene = scene;
        this.x = null;
        this.y = null;
        this.sprite = null;
        this.selectedBar = null;
    }

    select() {
        this.selected = true;
        const selectedBar = new g.FilledRect({
            scene: this.scene,
            x: this.x,
            y: this.y,
            width: 113,
            height: 5,
            cssColor: "blue"
        });
        this.selectedBar = selectedBar;
        this.sprite.append(selectedBar);
    }

    unselect() {
        this.selected = false;
        this.sprite.remove(this.selectedBar);
        this.selectedBar = null;
    }

    toSprites(scene, x, y) {
        let touchableCardUi = new g.E({scene: scene});
        this.x = x;
        this.y = y;
        const card_id = "card_" + this.mark + "_" + this.num.toString();
        const cardUi = new g.Sprite({
            scene: scene,
            src: scene.assets[card_id],
            touchable: true,
            x: x,
            y: y,
        });
        touchableCardUi.append(cardUi);
        cardUi.pointDown.add(ev => {
            if (!this.selected) {
                this.select()
            } else {
                this.unselect();
            }
        });
        this.sprite = touchableCardUi;
    }
}

module.exports = Card;
