class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
  }

  create() {
    this.shape = this.physics.add.image(100, 100, "shape");
    this.shape.setImmovable(true);

    this.collectable = this.physics.add.image(300, 300, "shape");
    this.collectable.setTint(0x33dd33);
    this.collectable2 = this.physics.add.image(400, 300, "shape");
    this.collectable2.setTint(0x33dd33);

    this.avatar = this.physics.add.sprite(200, 200, "avatar");

    this.createAnimation();

    this.avatar.play("avatar-idle");
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(this.avatar, this.shape);
    this.physics.add.overlap(
      this.avatar,
      this.collectable,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.avatar,
      this.collectable2,
      this.collectItem,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectItem(avatar, collectable) {
    collectable.destroy();
  }

  update() {
    this.avatar.setVelocity(0);

    if ((this, this.cursors.left.isDown)) {
      this.avatar.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
      this.avatar.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.avatar.setVelocityY(300);
    }

    if (
      this.avatar.body.velocity.x !== 0 ||
      this.avatar.body.velocity.y !== 0
    ) {
      this.avatar.play("avatar-moving", true);
    } else {
      this.avatar.play("avatar-idle", true);
    }
  }

  createAnimation() {
    this.anims.create({
      key: "avatar-moving",
      frames: this.anims.generateFrameNumbers("avatar", {
        start: 0,
        end: 4,
      }),
      frameRate: 24,
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
