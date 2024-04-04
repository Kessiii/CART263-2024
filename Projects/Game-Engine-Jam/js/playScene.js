class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "playScene" });

    this.background = null;
    this.shape = null;
    this.firePew = false;
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Play Scene");

    this.load.image("lineBackground", "./assets/images/play_Screen.png");
    this.load.image("shape", "./assets/images/shape.png");
    this.load.image("pew", "./assets/images/pewpew.png");
  }

  create(data) {
    this.background = this.add.image(0, 0, "lineBackground").setScale(1.5);
    this.background.setOrigin(0, 0);

    this.shape = this.physics.add
      .sprite(1920 / 2, 1080 - 100, "shape")
      .setScale(0.2);

    //Pewpew group
    this.pewGroup = this.physics.add.group();
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keySpaceObj = this.input.keyboard.addKey("SPACE");

    if (keyLeftObj.isDown === true) {
      this.shape.x = this.shape.x -= 15;
      if (this.shape.x < 0) {
        this.shape.x = 0;
      }
    }
    if (keyRightObj.isDown === true) {
      this.shape.x = this.shape.x += 15;
      if (this.shape.x > 1920) {
        this.shape.x = 1920;
      }
    }

    if (keySpaceObj.isDown == true) {
      if (this.firePew === false) {
        this.firePew = true;
        const aNewPew = this.physics.add.sprite(
          this.shape.x,
          this.shape.y,
          "pew"
        );
        this.pewGroup.add(aNewPew);
      }
    }

    if (keySpaceObj.isUp == true) {
      this.firePew = false;
    }
  }
}

export default PlayScene;
