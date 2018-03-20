function main() {
  console.log("main();");

  const GAMEWIDTH = 800;
  const GAMEHEIGHT = 600;

  // Initialize the phaser game window, give it a width of GAMEWIDTH and a height of GAMEHEIGHT, set the rendering context to auto and attach the window to a div with the ID "GameWindow"
  game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'GameWindow', {
    preload: preload,
    create: create,
    update: update
  });
}

function preload() {
  console.log("Loading Assets...");
  // Load game assets \\
  game.load.image('Worker', 'assets/Worker.png');
  game.load.image('Rock', 'assets/Rock.png');
  game.load.image('PickAxe', 'assets/Rock.png');
  game.load.image('Stone', 'assets/Stone.png');
  game.load.image('Storage', 'assets/button.png');
  game.load.image('AISelectBanner', 'assets/AISelectBanner.png');
  game.load.image('AISelectButton', 'assets/AISelectButton.png');
  game.load.image('StaminaBarLine', 'assets/StaminaBarLine.png');
  game.load.image('BackButton', 'assets/BackButton.png');
  console.log("Assets Loaded.");
}

function create() {
  console.log("Creating World...");
  // Instantiate Game Classes \\
  ui = new UI();
  gameWorld = new GameWorld();
  console.log("Creation complete.");

  ui.setScreen("MainMenu");
}

function update() {
  if (ui.screen == "InGame") {
    gameWorld.worker.sprite.visible = true;
    gameWorld.worker.staminaSprite.visible = true;
    gameWorld.update();
  } else {
    // Hide the worker sprite until the InGame screen is active.
    gameWorld.worker.sprite.visible = false;
    gameWorld.worker.staminaSprite.visible = false;
  }
}
