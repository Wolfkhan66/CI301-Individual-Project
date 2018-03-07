class FSM {
  constructor() {
    this.active = false;
    this.state = "";
  }

  checkConditions() {
    if (this.active) {
      this.state = "Test";
      this.update();
    }
  }

  update() {
    switch (this.state) {
      case "Test":
        console.log("Test State Running");
        break;
      case "Moving":
          //TODO
        break;
      case "Getting stone":
          //TODO
        break;
      case "Getting PickAxe":
          //TODO
        break;
      case "Breaking Rock":
          //TODO
        break;
      case "Storing stone":
          //TODO
        break;
      case "Resting":
          //TODO
        break;
      default:
        console.log("ERROR: State '" + this.state + " ' Not Found");
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
