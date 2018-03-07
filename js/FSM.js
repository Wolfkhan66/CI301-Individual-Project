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
        console.log("Test State Running")
        break;
      default:
        console.log("No State Found")
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
