export class Points {

  constructor() {
    this.points = 0;
  }

  getPoint(){
    return this.points;
  }

  addPoint(number = 1) {
    this.points += number;
  }

  resetPoints() {
    this.points = 0;
  }

}
