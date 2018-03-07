class GameWorld {
  constructor() {
    console.log("Constructing Game World");
    this.elements = [];
    this.worker = new Worker();
  }

  update() {
    if(this.worker.fsm.active){
        this.worker.fsm.checkConditions();
    }
    if(this.worker.utility.active){
        this.worker.utility.checkConditions();
    }
  }

  cleanUp() {
    //Ensure sprites are removed from memory first then clear the array.
    this.elements.forEach(element => element.sprite.kill());
    this.elements = [];
  }

  createRock() {
    var sprite = game.add.sprite(0, 0, 'rock', 'rock.png');
    this.elements.push({
      Sprite: sprite,
      ID: "Rock"
    });
  }

  createPickAxe() {
    var sprite = game.add.sprite(0, 0, 'pickaxe', 'rock.png');
    this.elements.push({
      Sprite: sprite,
      ID: "PickAxe"
    });
  }

  createStone() {
    var sprite = game.add.sprite(0, 0, 'stone', 'rock.png');
    this.elements.push({
      Sprite: sprite,
      ID: "Stone"
    });
  }

  createStorage() {
    var sprite = game.add.sprite(0, 0, 'storage', 'rock.png');
    this.elements.push({
      Sprite: sprite,
      ID: "Storage"
    });
  }
}
