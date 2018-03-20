
class UI {
  // This UI class is based on the https://github.com/Wolfkhan66/Phaser-First-Game-Tutorial repository in which i designed a system class to allow the dynamic creation of text and sprites as UI elements.
  // The code has been remodified and updated for this project.
  constructor() {
    console.log("Constructing UI Elements")
    this.elements = [];
    this.screen = "";

    //MainMenu UI
    this.createText("SplashText", "MainMenu", game.width / 2, game.height / 2, "This is the Main Menu", 20);
    this.createText("SplashContinueText", "MainMenu", game.width / 2, game.height / 2 + 30, "click to continue", 20);
    this.addEvent("SplashContinueText", function() {
      ui.setScreen("AISelect");
    }, null);

    //AISelect UI
    this.createSprite("AiSelectBanner", "AISelect", 200, 100, 400, 100, "AISelectBanner");
    this.createText("AISelectText", "AISelect", 290, 125, "Select an AI", 40);

    this.createSprite("FSMBackButton", "AISelect", 750, 50, 30, 18, "BackButton");
    this.addEvent("FSMBackButton", null, function() {
      ui.setScreen("MainMenu");
    });

    this.createSprite("FSMSelectButton", "AISelect", 150, 300, 150, 100, "AISelectButton");
    this.addEvent("FSMSelectButton", null, function() {
      ui.setScreen("InGame");
      gameWorld.worker.setAI("FSM");
    });
    this.createText("SelectFSMText", "AISelect", 205, 340, "FSM", 20);
    this.addEvent("SelectFSMText", function() {
      ui.setScreen("InGame");
      gameWorld.worker.setAI("FSM");
    }, null);

    this.createSprite("UtilitySelectButton", "AISelect", 500, 300, 150, 100, "AISelectButton");
    this.addEvent("UtilitySelectButton", null, function() {
      ui.setScreen("InGame");
      gameWorld.worker.setAI("Utility");
    });
    this.createText("SelectUtilityText", "AISelect", 550, 340, "Utility", 20)
    this.addEvent("SelectUtilityText", function() {
      ui.setScreen("InGame");
      gameWorld.worker.setAI("Utility");
    }, null);

    //InGame UI
    this.createSprite("FSMBackButton", "InGame", 750, 50, 30, 18, "BackButton");
    this.addEvent("FSMBackButton", null, function() {
      ui.setScreen("MainMenu");
    });

    this.createText("CreateRockText", "InGame", 30, 560, "Rock", 20)
    this.addEvent("CreateRockText", null, function() {
      gameWorld.createAsset("Rock");
    });

    this.createText("CreatePickAxeText", "InGame", 130, 560, "PickAxe", 20)
    this.addEvent("CreatePickAxeText", null, function() {
      gameWorld.createAsset("PickAxe");
    });

    this.createText("CreateStoneText", "InGame", 230, 560, "Stone", 20)
    this.addEvent("CreateStoneText", null, function() {
      gameWorld.createAsset("Stone");
    });
  }

  setScreen(screen) {
    console.log("Changing Screen to: " + screen);
    this.hideAll();
    this.screen = screen;
    switch (screen) {
      case "MainMenu":
        this.showUI("MainMenu");
          gameWorld.cleanUp();
          game.stage.backgroundColor = "#b1b1ec";
        break;
      case "AISelect":
        this.showUI("AISelect");
          game.stage.backgroundColor = "#b1b1ec";
        break;
      case "InGame":
        this.showUI("InGame");
          game.stage.backgroundColor = "#008000";
        break;
      default:
        console.log(screen + " not found");
    }
  }

  createText(name, UI, x, y, string, size) {
    var textObject = game.add.text(x, y, string, {
      font: size + 'px Arial',
      fill: '#000000'
    });
    this.elements.push({
      Name: name,
      UI: UI,
      Type: "Text",
      Object: textObject
    });
  }

  createSprite(name, UI, x, y, width, height, image) {
    var sprite = game.add.sprite(x, y, image);
    sprite.width = width;
    sprite.height = height;
    this.elements.push({
      Name: name,
      UI: UI,
      Type: "Sprite",
      Object: sprite
    });
  }

  addEvent(name, eventDown, eventUp) {
    this.elements.forEach(function(element) {
      if (element.Name == name) {
        if (eventDown != null) {
          element.Object.inputEnabled = true;
          element.Object.events.onInputDown.add(eventDown, this);
        }
        if (eventUp != null) {
          element.Object.inputEnabled = true;
          element.Object.events.onInputUp.add(eventUp, this);
        }
      }
    });
  }

  showUI(UIType) {
    this.elements.forEach(function(element) {
      if (element.UI == UIType) {
        element.Object.visible = true;
      }
    });
  }

  hideAll() {
    this.elements.forEach(function(element) {
      element.Object.visible = false;
    });
  }
}
