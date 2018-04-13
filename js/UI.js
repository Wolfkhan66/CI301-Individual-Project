
class UI {
  // This UI class is based on the https://github.com/Wolfkhan66/Phaser-First-Game-Tutorial repository in which i designed a system class to allow the dynamic creation of text and sprites as UI elements.
  // The code has been remodified and updated for this project.
  constructor() {
    console.log("Constructing UI Elements")
    this.elements = [];
    this.screen = "";

    //MainMenu UI
    this.createSprite("MainMenuUI", "MainMenu", 0, 0, 800, 600, "MainMenuUI");
    this.createSprite("MainMenuButton", "MainMenu", 280, 400, 250, 60, "MainMenuButton");
    this.addEvent("MainMenuButton", null, function() {
      ui.setScreen("AISelect");
    });

    //AISelect UI
    this.createSprite("AiSelectUI", "AISelect", 0, 0, 800, 600, "AISelectUI");

    this.createSprite("FSMBackButton", "AISelect", 10, 10, 128, 62, "BackButton");
    this.addEvent("FSMBackButton", null, function() {
      ui.setScreen("MainMenu");
    });

    this.createSprite("FSMSelectButton", "AISelect", 125, 350, 200, 60, "AISelectFSMButton");
    this.addEvent("FSMSelectButton", null, function() {
      ui.setScreen("InGame");
      ui.toggleVisible("InGameUtlityText", false);
      gameWorld.worker.setAI("FSM");
    });

    this.createSprite("UtilitySelectButton", "AISelect", 505, 350, 200, 60, "AISelectUtilityButton");
    this.addEvent("UtilitySelectButton", null, function() {
      ui.setScreen("InGame");
      ui.toggleVisible("InGameFSMText", false);
      gameWorld.worker.setAI("Utility");
    });

    //InGame UI
    this.createSprite("InGameUI", "InGame", 0, 0, 800, 600, "InGameUI");
    this.createText("InGameFSMText", "InGame", 345, 25, "FSM", 30);
    this.createText("InGameUtlityText", "InGame", 345, 25, "Utility", 30);

    this.createSprite("InGameBackButton", "InGame", 10, 10, 128, 62, "BackButton");
    this.addEvent("InGameBackButton", null, function() {
      ui.setScreen("MainMenu");
    });

    this.createSprite("InGameStoneButton", "InGame", 11, 527, 128, 62, "InGameStoneButton");
    this.addEvent("InGameStoneButton", null, function() {
      gameWorld.createAsset("Stone");
    });

    this.createSprite("InGameRockButton", "InGame", 149, 527, 128, 62, "InGameRockButton");
    this.addEvent("InGameRockButton", null, function() {
      gameWorld.createAsset("Rock");
    });

    this.createSprite("InGamePickAxeButton", "InGame", 287, 527, 128, 62, "InGamePickAxeButton");
    this.addEvent("InGamePickAxeButton", null, function() {
      gameWorld.createAsset("PickAxe");
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
        break;
      case "AISelect":
        this.showUI("AISelect");
        break;
      case "InGame":
        this.showUI("InGame");
        break;
      default:
        console.log(screen + " not found");
    }
  }

  createText(name, UI, x, y, string, size) {
    var textObject = game.add.text(x, y, string, {
      font: size + 'px Arial',
      fill: '#ffffff'
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

  toggleVisible(Name, Visible) {
    this.elements.forEach(function(element) {
      if (element.Name == Name) {
        element.Object.visible = Visible;
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
