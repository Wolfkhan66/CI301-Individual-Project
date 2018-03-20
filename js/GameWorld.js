class GameWorld {
  constructor() {
    console.log("Constructing Game World");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.assets = [];
    this.assetTypes = [{
        Type: "Rock",
        Count: 0,
        Limit: 5
      },
      {
        Type: "PickAxe",
        Count: 0,
        Limit: 1
      },
      {
        Type: "Stone",
        Count: 0,
        Limit: 10
      },
      {
        Type: "Storage",
        Count: 0,
        Limit: 1
      }
    ];

    this.worker = new Worker();
  }

  update() {
    if (gameWorld.getAssetCount("Storage") === 0) {
      this.createAsset("Storage");
    }
    if (this.worker.fsm.active) {
      this.worker.fsm.checkConditions();
    }
    if (this.worker.utility.active) {
      this.worker.utility.checkConditions();
    }
    this.worker.updateStamina();
  }


  checkCollisions(type) {
    this.assets.forEach(function(asset) {
      if (asset.Type === type) {
        switch (asset.Type) {
          case "PickAxe":
            game.physics.arcade.overlap(gameWorld.worker.sprite, asset.Sprite, gameWorld.pickAxeCollision);
            break;
          case "Rock":
            game.physics.arcade.overlap(gameWorld.worker.sprite, asset.Sprite, gameWorld.rockCollision);
            break;
          case "Stone":
            game.physics.arcade.overlap(gameWorld.worker.sprite, asset.Sprite, gameWorld.stoneCollision);
            break;
          case "Storage":
            game.physics.arcade.overlap(gameWorld.worker.sprite, asset.Sprite, gameWorld.storageCollision);
            break;
          default:

        }
      }
    });
  }

  stoneCollision(workerSprite, stoneSprite) {
    stoneSprite.destroy();
    gameWorld.updateAssetCount("Stone", -1);
    gameWorld.worker.hasStone = true;
    gameWorld.worker.stamina -= 5;
  }

  storageCollision(workerSprite, storageSprite) {
    gameWorld.worker.hasStone = false;
  }

  pickAxeCollision(workerSprite, pickAxeSprite) {
    pickAxeSprite.destroy();
    gameWorld.updateAssetCount("PickAxe", -1);
    gameWorld.worker.hasPickAxe = true;
    gameWorld.worker.stamina -= 2;
  }

  rockCollision(workerSprite, rockSprite) {
    rockSprite.HitCount--;
    if (rockSprite.HitCount == 0) {
      rockSprite.destroy();
      gameWorld.updateAssetCount("Rock", -1);
    }
    gameWorld.worker.hasStone = true;
    gameWorld.worker.stamina -= 10;
  }

  cleanUp() {
    this.assets.forEach(asset => asset.Sprite.destroy());
    this.assets = [];
    this.assetTypes.forEach(assetType => assetType.Count = 0);
  }

  createAsset(type) {
    let assets = this.assets;
    var assetIndex = this.assetTypes.findIndex((obj => obj.Type == type));
    if (this.assetTypes[assetIndex].Count != this.assetTypes[assetIndex].Limit) {

      var sprite;
      switch (type) {
        case "Rock":
          sprite = game.add.sprite(0, 0, 'Rock', 'Rock.png');
          sprite.x = game.rnd.integerInRange(550, 750);
          sprite.y = game.rnd.integerInRange(100, 450);
          break;
        case "Stone":
          sprite = game.add.sprite(0, 0, 'Stone', 'Stone.png');
          sprite.x = game.rnd.integerInRange(250, 450);
          sprite.y = game.rnd.integerInRange(100, 450);
          break;
        case "PickAxe":
          sprite = game.add.sprite(0, 0, 'Worker', 'Worker.png');
          sprite.x = game.rnd.integerInRange(100, 150);
          sprite.y = game.rnd.integerInRange(400, 450);
          break;
        case "Storage":
          sprite = game.add.sprite(0, 0, 'Worker', 'Worker.png');
          sprite.x = game.rnd.integerInRange(50, 100);
          sprite.y = game.rnd.integerInRange(250, 300);
          break;
        default:
      }
      game.physics.arcade.enable(sprite);
      sprite.enableBody = true;

      assets.push({
        Sprite: sprite,
        Type: type
      });
      if (type === "Rock") {
        assets[this.assets.length - 1].Sprite.HitCount = 3;
      }
      gameWorld.updateAssetCount(type, 1);
    } else {
      console.log(type + " Limit Reached");
    }
  }

  updateAssetCount(type, value) {
    this.assetTypes.forEach(function(assetType) {
      if (assetType.Type == type) {
        assetType.Count += value;
      }
    });
  }

  getAssetCount(type) {
    var count;
    this.assetTypes.forEach(function(assetType) {
      if (assetType.Type == type) {
        count = assetType.Count;
      }
    });
    return count;
  }

  getSprite(type) {
    // Return the closest sprite to the worker of type
    var sprite;
    var distance = 99999;
    this.assets.forEach(function(asset) {
      if (asset.Type == type && asset.Sprite.alive) {
        var newDistance = Phaser.Math.distance(asset.Sprite.x, asset.Sprite.y, gameWorld.worker.sprite.x, gameWorld.worker.sprite.y)
        if (newDistance < distance) {
          distance = newDistance;
          sprite = asset.Sprite;
        }
      }
    });
    return sprite;
  }

}
