class GameWorld {
  constructor() {
    console.log("Constructing Game World");
    this.assets = [];
    this.assetTypes = [{
        ID: "Rock",
        Count: 0,
        Limit: 5
      },
      {
        ID: "PickAxe",
        Count: 0,
        Limit: 1
      },
      {
        ID: "Stone",
        Count: 0,
        Limit: 10
      },
      {
        ID: "Storage",
        Count: 0,
        Limit: 1
      }
    ];

    this.worker = new Worker();
  }

  update() {
    if (this.worker.fsm.active) {
      this.worker.fsm.checkConditions();
    }
    if (this.worker.utility.active) {
      this.worker.utility.checkConditions();
    }
  }

  cleanUp() {
    this.assets.forEach(asset => asset.Sprite.kill());
    this.assets.forEach(asset => asset.Text.kill());
    this.assets = [];
    this.assetTypes.forEach(assetType => assetType.Count = 0);
  }

  createAsset(type) {
    let assets = this.assets;
    var assetIndex = this.assetTypes.findIndex((obj => obj.ID == type));
    if (this.assetTypes[assetIndex].Count != this.assetTypes[assetIndex].Limit) {
      var sprite = game.add.sprite(game.rnd.integerInRange(40, 780), game.rnd.integerInRange(40, 580), 'rock', 'rock.png');
      var text = game.add.text(sprite.x, sprite.y , type, {
        font: 10 + 'px Arial',
        fill: '#fff'
      });
      assets.push({
        Sprite: sprite,
        ID: type,
        Text: text
      });
      gameWorld.updateAssetCount(type, 1);
    } else {
      console.log(type + " Limit Reached");
    }
  }

  updateAssetCount(type, value) {
    this.assetTypes.forEach(function(assetType) {
      if (assetType.ID == type) {
        assetType.Count += value;
      }
    });
    console.log(this.assetTypes);
  }

}
