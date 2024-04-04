class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" });

    this.titleSceneBackgroundImage = null;
    this.titleSceneText = null;
    this.titleSceneTextStyle = {
      font: "200px Futura",
      fill: "#fde4b9",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Title Scene");
    this.load.image(
      "titleSceneBackground",
      "./assets/images/title_screen_shapes.png"
    );
  }

  create(data) {
    this.titleSceneBackgroundImage = this.add
      .sprite(0, 0, "titleSceneBackground")
      .setScale(1.5);
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    this.titleSceneText = this.add
      .text(1920 / 2, 1080 / 2 + 350, "Shape Shooter", this.titleSceneTextStyle)
      .setOrigin(0.5);
  }

  update(time, delta) {
    if (time > 6000) {
      this.scene.switch("menuScene");
    }
  }
}

export default TitleScene;
