function generateRandomInt(max, min) {
    //TODO akashicではMath.randomが非推奨なのであとで変える
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function generateCardAsset(mark, value) {
    return "card_" + "spade_" + value.toString();
}

function init(scene) {
    scene.loaded.add(function () {

        for (let i = 0; i < 5; i++) {
            let cardAsset = generateCardAsset(1, generateRandomInt(1, 13));
            const sprite = new g.Sprite({
                scene: scene,
                src: scene.assets[cardAsset],
                x: i * 130,
                y: 0,
                width: 180,
                height: 270,
                srcWidth: 613,
                srcHeight: 900,
                // srcY: 0,
                // srcX: 0,
            });
            scene.append(sprite);
        }
    });

    return scene
}

function main() {
    let scene = new g.Scene(
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
            ],
        }
    );

    init(scene);

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

