class Worker {
  constructor() {
    console.log("Constructing Worker");
    this.sprite = game.add.sprite(125, 275, 'Worker', 'Worker.png');
    game.physics.arcade.enable(this.sprite);
    this.sprite.enableBody = true;
    this.fsm = new FSM();
    this.utility = new Utility();
    this.hasStone = false;
    this.hasPickAxe = false;
    this.isResting = false;
    this.stamina = 100;
    this.staminaSprite = game.add.sprite(50,50, 'StaminaBarLine', 'StaminaBarLine.png')
    this.staminaSprite.width = this.stamina;
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

  updateStamina(){
    this.staminaSprite.width = this.stamina;
  }
}
