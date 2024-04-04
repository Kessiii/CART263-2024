/**
Shape Shooter - Gameplay
Kestrel Villapando

This is where the game happens, the whole gameplay.
*/

class PlayScene extends Phaser.Scene {
  createRival() {
    const rivalXLocation = Math.floor(Math.random() * 1920) + 1;
    let rivalXVelocity = Math.floor(Math.random() * 50) + 1;
    rivalXVelocity *= Math.round(Math.random()) ? 1 : -1;
    const anRival = this.physics.add
      .sprite(rivalXLocation, -100, "rival")
      .setScale(0.2);
    anRival.body.velocity.y = 200;
    anRival.body.velocity.x = rivalXVelocity;

    this.rivalGroup.add(anRival);
  }
  constructor() {
    super({ key: "playScene" });

    this.background = null;
    this.shape = null;
    this.firePew = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: "65px Futura",
      fill: "#ffffff",
      align: "center",
    };

    this.gameOverText = null;
    this.gameOverTextStyle = {
      font: "65px Futura",
      fill: "#ffffff",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    console.log("Play Scene");
    //Images
    this.load.image("lineBackground", "./assets/images/play_Screen.png");
    this.load.image("shape", "./assets/images/shape.png");
    this.load.image("pew", "./assets/images/pewpew.png");
    this.load.image("rival", "./assets/images/enemy_shape.png");

    //Sounds
    this.load.audio("shoot", "./assets/sound/pew.WAV");
    this.load.audio("pulse", "./assets/sound/pulse.WAV");
    this.load.audio("shutdown", "./assets/sound/dead.WAV");
  }

  create(data) {
    this.background = this.add.image(0, 0, "lineBackground").setScale(1.5);
    this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(
      10,
      10,
      "Score:" + this.score.toString(),
      this.scoreTextStyle
    );

    this.shape = this.physics.add
      .sprite(1920 / 2, 1080 - 100, "shape")
      .setScale(0.2);

    //Pewpew group
    this.pewGroup = this.physics.add.group();

    //Rival group
    this.rivalGroup = this.add.group();
    this.createRival();

    //Collision between pew and rival
    this.physics.add.collider(
      this.pewGroup,
      this.rivalGroup,
      function (pewCollide, rivalCollide) {
        rivalCollide.destroy();
        pewCollide.destroy();
        this.sound.play("pulse");
        this.score = this.score + 1;
        this.scoreText.setText("Score:" + this.score.toString());
        this.createRival();
        this.createRival();
      }.bind(this)
    );

    //Collision between shape and rival
    this.physics.add.collider(
      this.shape,
      this.rivalGroup,
      function (shapeCollide, rivalCollide) {
        this.sound.play("shutdown");
        this.physics.pause();
        rivalCollide.destroy();
        shapeCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("playScene")
        );
      }.bind(this)
    );
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
        this.sound.play("shoot");
      }
    }

    if (keySpaceObj.isUp == true) {
      this.firePew = false;
    }

    this.pewGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }
}

export default PlayScene;
