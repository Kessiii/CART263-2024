class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "playScene" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Play Scene");
  }

  create(data) {}

  update(time, delta) {}
}

export default PlayScene;
