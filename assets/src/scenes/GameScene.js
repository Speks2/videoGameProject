export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.cowboy = this.physics.add.sprite(400, 300, 'cowboy');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        this.worms = this.physics.add.group();

        this.physics.add.collider(this.bullets, this.worms, this.hitWorm, null, this);

        this.time.addEvent({
            delay: 2000,
            callback: this.spawnWorms,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.cowboy.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.cowboy.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.cowboy.setVelocityX(200);
        }

        if (this.cursors.up.isDown) {
            this.cowboy.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.cowboy.setVelocityY(200);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.shootBullet();
        }
    }

    shootBullet() {
        let bullet = this.bullets.get(this.cowboy.x, this.cowboy.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -300;
            this.sound.play('shoot');
        }
    }

    hitWorm(bullet, worm) {
        bullet.disableBody(true, true);
        worm.disableBody(true, true);
    }

    spawnWorms() {
        let x = (Math.random() < 0.5) ? 0 : 800;
        let y = Phaser.Math.Between(0, 600);
        let worm = this.worms.create(x, y, 'worm');
        worm.setVelocityX((x === 0) ? 100 : -100);
    }
}
