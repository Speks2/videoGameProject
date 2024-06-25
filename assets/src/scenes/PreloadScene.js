export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Load images
        this.load.image('cowboy', 'assets/images/cowboy1.png');
        this.load.image('worm', 'assets/images/worm1.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('backgroundMain', 'assets/images/backgroundMain.png');

        // Load audio
        this.load.audio('shoot', 'assets/audio/shoot.mp3');

        // Show loading screen
        let loadingBar = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'loading');
        this.load.on('progress', function (value) {
            loadingBar.setScale(value, 1);
        });
    }

    create() {
        this.scene.start('GameScene');
    }
}
