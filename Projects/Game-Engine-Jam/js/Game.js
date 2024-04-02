import SplashZone from "./splashZone.js";
import TitleScene from "./titleScene.js";
import MenuScene from "./menuScene.js";

//This is the Phaser3 config file
const splashZone = new SplashZone();
const titleScene = new TitleScene();
const menuScene = new MenuScene();

//Game Scene
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },

  //Setting background color
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // Placing it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

//loading scene
game.scene.add("splashZone", splashZone);
game.scene.add("titleScene", titleScene);

//Title Screen
game.scene.start("splashZone");
