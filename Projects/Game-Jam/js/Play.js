class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
  }

  create() {
    this.shape = this.add.image(100, 100, "shape");

    this.avatar = this.add.sprite(200, 200, "avatar");

    this.createAnimation;

    this.avatar.play("avatar-idle");
  }

  update() {}

  createAnimation() {
    this.anims.create({
      key: "avatar-moving",
      frames: this.anims.generateFrameNumbers("avatar", {
        start: 0,
        end: 4,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "avatar-idle",
      frames: this.anims.generateFrameNumbers("avatar", {
        start: 0,
        end: 0,
      }),
      frameRate: 20,
      repeat: 0,
    });
  }
}
