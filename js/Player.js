export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame);
        this.scene.add.existing(this);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 15, { isSensor: false, label: 'playerCollider' });
        var playerSensor = Bodies.circle(this.x, this.y, 31, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        scene.load.atlas('female', 'assets/images/female.png', 'assets/images/female_atlas.json')
        scene.load.animation('female_anim', 'assets/images/female_anim.json')
    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        // this.anims.play("walk-right", true)
        const speed = 3;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }

        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }

        if (Math.abs(this.velocity.y) > 0.1 && this.inputKeys.down.isDown) {
            this.anims.play("walk-down", true)
        } else if ((Math.abs(this.velocity.y) > 0.1 && this.inputKeys.up.isDown)) {
            this.anims.play("walk-up", true)
        } else if ((Math.abs(this.velocity.x) > 0.1 && this.inputKeys.right.isDown)) {
            this.anims.play("walk-right", true)
        } else if ((Math.abs(this.velocity.x) > 0.1 && this.inputKeys.left.isDown)) {
            this.anims.play("walk-left", true)
        } else {
            this.anims.play("idle", true)
        }

        // normalise fixes the issue of when player is going on diagonal the speed is still the same as A, W, S, D
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);

    }
} 