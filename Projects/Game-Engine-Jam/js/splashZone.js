class SplashZone extends Phaser.Scene {
  constructor() {
    super({ key: "splashZone" });
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Splash Zone");
    this.load.image("splashZoneBackground", "./assets/images/TitleScreen.png");
  }

  create(data) {
    this.splashZoneBackgroundImage = this.add.sprite(
      0,
      0,
      "splashZoneBackground"
    );
    this.splashZoneBackgroundImage.x = 1920 / 2;
    this.splashZoneBackgroundImage.y = 1080 / 2;
  }

  update(time, delta) {
    //this.scene.switch("titleScene");
  }
}

export default SplashZone;
