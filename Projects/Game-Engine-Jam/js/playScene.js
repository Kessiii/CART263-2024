class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "playScene" });

    this.background = null;
    this.shape = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Play Scene");

    this.load.image("lineBackground", "./assets/images/play_Screen.png");
    this.load.image("shape", "./assets/images/shape.png");
  }

  create(data) {
    this.background = this.add.image(0, 0, "lineBackground").setScale(1.5);
    this.background.setOrigin(0, 0);

    this.shape = this.physics.add
      .sprite(1920 / 2, 1080 - 100, "shape")
      .setScale(0.2);
  }

  update(time, delta) {}
}

export default PlayScene;
