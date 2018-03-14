class Worker {
  constructor() {
    console.log("Constructing Worker");
    this.sprite = game.add.sprite(80, 80, 'worker', 'worker.png');
    game.physics.arcade.enable(this.sprite);
    this.sprite.enableBody = true;
    this.fsm = new FSM();
    this.utility = new Utility();
    this.hasStone = false;
    this.hasPickAxe = false;
    this.stamina = 100;
  }

  setAI(type) {
    switch (type) {
      case "FSM":
        console.log("Activating Finite State Machine AI");
        this.fsm.setActive();
        this.utility.stop();
        break;
      case "Utility":
        console.log("Activating Utility AI");
        this.utility.setActive();
        this.fsm.stop();
        break;
      default:
        console.log("AI Type Not Found")
    }
  }
}
