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
  }


  checkCollisions(type) {
    console.log("Checking For Collisions");
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
    console.log("stoneCollision");
    stoneSprite.destroy();
    gameWorld.updateAssetCount("Stone", -1);
    gameWorld.worker.hasStone = true;
  }

  storageCollision(workerSprite, storageSprite) {
    gameWorld.worker.hasStone = false;
  }

  pickAxeCollision(workerSprite, pickAxeSprite) {
    console.log("pickAxeCollision");
    pickAxeSprite.destroy();
    gameWorld.updateAssetCount("PickAxe", -1);
    gameWorld.worker.hasPickAxe = true;
  }

  rockCollision(workerSprite, rockSprite) {
    console.log("rockCollision");
    rockSprite.HitCount--;
    if (rockSprite.HitCount == 0) {
      rockSprite.destroy();
      gameWorld.updateAssetCount("Rock", -1);
    }
      gameWorld.worker.hasStone = true;
  }

  cleanUp() {
    this.assets.forEach(asset => asset.Sprite.destroy());
    this.assets.forEach(asset => asset.Text.destroy());
    this.assets = [];
    this.assetTypes.forEach(assetType => assetType.Count = 0);
  }

  createAsset(type) {
    let assets = this.assets;
    var assetIndex = this.assetTypes.findIndex((obj => obj.Type == type));
    if (this.assetTypes[assetIndex].Count != this.assetTypes[assetIndex].Limit) {

      var sprite = game.add.sprite(0, 0, 'rock', 'rock.png');
      switch (type) {
        case "Rock":
          sprite.x = game.rnd.integerInRange(550, 750);
          sprite.y = game.rnd.integerInRange(100, 450);
          break;
        case "Stone":
          sprite.x = game.rnd.integerInRange(250, 450);
          sprite.y = game.rnd.integerInRange(100, 450);
          break;
        case "PickAxe":
          sprite.x = game.rnd.integerInRange(100, 150);
          sprite.y = game.rnd.integerInRange(400, 450);
          break;
        case "Storage":
          sprite.x = game.rnd.integerInRange(50, 100);
          sprite.y = game.rnd.integerInRange(250, 300);
          break;
        default:
      }
      game.physics.arcade.enable(sprite);
      sprite.enableBody = true;

      // This is temporary until sprites are updated to better represent the asset.
      var text = game.add.text(sprite.x, sprite.y, type, {
        font: 10 + 'px Arial',
        fill: '#fff'
      });
      assets.push({
        Sprite: sprite,
        Type: type,
        Text: text
      });
      if (type === "Rock") {
        assets[this.assets.length - 1].Sprite.HitCount = 3;
      }
      gameWorld.updateAssetCount(type, 1);
    } else {
      console.log(type + " Limit Reached");
    }
    console.log(this.assets);
  }

  updateAssetCount(type, value) {
    this.assetTypes.forEach(function(assetType) {
      if (assetType.Type == type) {
        assetType.Count += value;
      }
    });
    console.log(this.assetTypes);
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
    console.log(sprite);
    return sprite;
  }

}
