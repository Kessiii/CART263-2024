class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Menu Scene");
    this.load.image("menuSceneBackground", "./assets/images/menu_screen.png");
    this.load.image("startButton", "./assets/images/startButton.png");
    this.load.audio("menu", "./assets/sound/menu.WAV");
  }

  create(data) {
    this.sound.play("menu");
    this.menuSceneBackgroundImage = this.add
      .sprite(0, 0, "menuSceneBackground")
      .setScale(1.5);
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.startButton = this.add
      .sprite(1920 / 2, 1080 / 2 + 100, "startButton")
      .setScale(0.5);
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on("pointerdown", () => this.clickButton());
  }

  update(time, delta) {}

  clickButton() {
    this.scene.start("playScene");
  }
}

export default MenuScene;
