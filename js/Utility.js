class Utility {
  constructor() {
    this.active = false;
    this.currentAction = "";
    this.utilities = [{
        name: "GetStone",
        score: 0,
        function: () => {
          gameWorld.worker.utility.getStone()
        }
      },
      {
        name: "GetPickAxe",
        score: 0,
        function: () => {
          gameWorld.worker.utility.getPickAxe()
        }
      },
      {
        name: "BreakRock",
        score: 0,
        function: () => {
          gameWorld.worker.utility.breakRock()
        }
      },
      {
        name: "StoreStone",
        score: 0,
        function: () => {
          gameWorld.worker.utility.storeStone()
        }
      },
      {
        name: "Rest",
        score: 0,
        function: () => {
          gameWorld.worker.utility.rest()
        }
      },

    ];
  }

  checkConditions() {
    if (this.active) {
      this.resetUtilityScores();
      var worker = gameWorld.worker;
      this.utilities.forEach(function(action) {
        switch (action.name) {
          case "GetStone":
            if (gameWorld.getAssetCount("Stone") > 0) {
              action.score++;
            }
            if (gameWorld.getAssetCount("Stone") > 3) {
              action.score++;
            }
            if (gameWorld.getAssetCount("Stone") > 5) {
              action.score++;
            }
            if (!worker.hasPickAxe) {
              action.score++;
            }
            if (worker.hasStone) {
              action.score--;
            }
            if (gameWorld.getAssetCount("Stone") === 0) {
              action.score = 0;
            }
            break;
          case "GetPickAxe":
            if (gameWorld.getAssetCount("PickAxe") > 0) {
              action.score++;
            }
            if (!worker.hasPickAxe) {
              action.score++;
            }
            if (gameWorld.getAssetCount("Rock") > 0) {
              action.score++;
            }
            if (gameWorld.getAssetCount("Rock") > 4) {
              action.score++;
            }
            if (worker.hasPickAxe) {
              action.score = 0;
            }
            if (gameWorld.getAssetCount("PickAxe") === 0) {
              action.score = 0;
            }
            break;
          case "BreakRock":
            if (gameWorld.getAssetCount("Stone") === 0) {
              action.score++;
            }
            if (gameWorld.getAssetCount("Rock") > 0) {
              action.score++;
            }
            if (worker.hasPickAxe) {
              action.score++;
            }
            if (worker.hasStone) {
              action.score--;
            }
            if (gameWorld.getAssetCount("Rock") === 0) {
              action.score = 0;
            }
            if (!worker.hasPickAxe) {
              action.score = 0;
            }
            break;
          case "StoreStone":
            if (worker.hasStone) {
              action.score += 5;
            }
            break;
          case "Rest":
            if (worker.isResting) {
              action.score += 5;
            }
            if (worker.stamina < 90) {
              action.score++;
            }
            if (worker.stamina < 75) {
              action.score++;
            }
            if (worker.stamina < 50) {
              action.score++;
            }
            if (worker.stamina < 25) {
              action.score++;
            }
            if (worker.stamina < 10) {
              action.score += 5;
            }
            break;
          default:
        }
      });

      var bestAction = this.chooseAction();
      if (bestAction != null && bestAction.score > 0) {
        if (this.currentAction != bestAction.name) {
          console.log(this.utilities);
          console.log("BestAction: " + bestAction.name + " Score: " + bestAction.score);
        }
        this.currentAction = bestAction.name;
        bestAction.function();
      }
    }
  }

  chooseAction() {
    var bestAction;
    var highestScore = 0;
    this.utilities.forEach(function(action) {
      if (action.score > highestScore) {
        bestAction = action;
        highestScore = action.score;
      }
    });
    return bestAction;
  }

  resetUtilityScores() {
    this.utilities.forEach(function(action) {
      action.score = 0;
    });
  }

  move(targetSprite) {
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

  getStone() {
    this.move(gameWorld.getSprite("Stone"))
    gameWorld.checkCollisions("Stone");
  }

  getPickAxe() {
    this.move(gameWorld.getSprite("PickAxe"))
    gameWorld.checkCollisions("PickAxe");
  }

  breakRock() {
    this.move(gameWorld.getSprite("Rock"))
    gameWorld.checkCollisions("Rock");
  }

  storeStone() {
    this.move(gameWorld.getSprite("Storage"))
    gameWorld.checkCollisions("Storage");
    gameWorld.worker.stamina -= (5 / 60);
  }

  rest() {
    if (gameWorld.worker.stamina < 100) {
      gameWorld.worker.stamina += (20 / 60);
      gameWorld.worker.isResting = true;
    }
    if (gameWorld.worker.stamina > 100) {
      gameWorld.worker.isResting = false;
    }
  }

  setActive() {
    console.log("utility setActive()");
    this.active = true;
  }

  stop() {
    console.log("utility stop()");
    this.active = false;
  }
}
