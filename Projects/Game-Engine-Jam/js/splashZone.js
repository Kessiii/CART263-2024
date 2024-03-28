class SplashZone extends Phaser.Scene {
  constructor() {
    super({ key: "splashZone" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Splash Zone");
  }

  create(data) {}

  update(time, delta) {}
}

export default SplashZone();
