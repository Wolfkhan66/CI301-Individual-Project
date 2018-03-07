class Utility {
  constructor() {
    this.active = false;
  }

  checkConditions() {
    if (this.active) {
      this.testAction();
    }
  }

  testAction() {
    console.log("Test Action Running");
  }

  move() {
    //TODO
  }

  getStone() {
    //TODO
  }

  getPickAxe() {
    //TODO
  }

  breakRock() {
    //TODO
  }

  storeStone() {
    //TODO
  }

  rest() {
    //TODO
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
