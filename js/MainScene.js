import Player from './Player.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        console.log("preload")
        Player.preload(this);
        this.load.image('tiles', 'assets/images/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map.json');
        this.load.audio('music', 'assets/audio/music.mp3');

    }



    create() {

        this.backgroundSound = this.sound.add("music")
        this.backgroundSound.play();

        console.log("create")
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0)
        const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', tileset, 0, 0);
        const layer4 = map.createStaticLayer('Tile Layer 4', tileset, 0, 0);
        layer1.setCollisionByProperty({ collides: true });
        layer2.setCollisionByProperty({ collides: true });
        layer3.setCollisionByProperty({ collides: true });
        layer4.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);
        this.matter.world.convertTilemapLayer(layer3);
        this.matter.world.convertTilemapLayer(layer4);
        this.player = new Player({ scene: this, x: 200, y: 200, texture: 'female', frame: 'walk-down-2' });
        let textPlayer = new Player({ scene: this, x: 100, y: 100, texture: 'female', frame: 'walk-down-2' });
        // this.add.existing(this.player);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })

    }

    update() {
        this.player.update();
    }
}

