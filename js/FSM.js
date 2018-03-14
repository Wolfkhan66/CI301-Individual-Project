class FSM {
  constructor() {
    this.active = false;
    this.state = "";
  }

  checkConditions() {
    var worker = gameWorld.worker;
    if (this.active) {
      console.log("Checking FSM Conditions");
      if (gameWorld.getAssetCount("Stone") > 0 && worker.hasStone === false) {
        this.state = "Getting Stone";
      } else if (worker.hasStone === true) {
        this.state = "Storing Stone";
      } else if (gameWorld.getAssetCount("PickAxe") > 0 && worker.hasPickAxe === false) {
        this.state = "Getting PickAxe";
      } else if (gameWorld.getAssetCount("Rock") > 0 && worker.hasPickAxe === true) {
        this.state = "Breaking Rock";
      } else {
        this.state = "Resting";
      }
      this.update();
    }
  }

  update() {
    var targetSprite;
    switch (this.state) {
      case "Test":
        console.log("Test State Running");
        break;
      case "Getting Stone":
        this.moveToTarget(gameWorld.getSprite("Stone"))
        gameWorld.checkCollisions("Stone");
        break;
      case "Getting PickAxe":
        this.moveToTarget(gameWorld.getSprite("PickAxe"))
        gameWorld.checkCollisions("PickAxe");
        break;
      case "Breaking Rock":
        this.moveToTarget(gameWorld.getSprite("Rock"))
        gameWorld.checkCollisions("Rock");
        break;
      case "Storing Stone":
        this.moveToTarget(gameWorld.getSprite("Storage"))
        gameWorld.checkCollisions("Storage");
        break;
      case "Resting":
        console.log("Resting");
        break;
      default:
        console.log("ERROR: State '" + this.state + " ' Not Found");
    }
  }

  moveToTarget(targetSprite) {
    if (targetSprite.x > gameWorld.worker.sprite.x) {
      gameWorld.worker.sprite.x++;
    } else {
      gameWorld.worker.sprite.x--;
    }
    if (targetSprite.y > gameWorld.worker.sprite.y) {
      gameWorld.worker.sprite.y++;
    } else {
      gameWorld.worker.sprite.y--;
    }
  }

  setActive() {
    console.log("fsm setActive()");
    this.active = true;
  }

  stop() {
    console.log("fsm stop()");
    this.active = false;
  }
}
