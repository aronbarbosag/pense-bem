export class Points {

  constructor() {
    this.totalPoints = 0;
  }

  getTotal(){
    return this.totalPoints;
  }

  addPoints(pointsToAdd = 1) {
    this.totalPoints += pointsToAdd;
  }

  resetPoints() {
    this.totalPoints = 0;
  }

}
