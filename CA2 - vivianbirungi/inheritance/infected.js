class Infected extends Molecule {
  constructor(_i,_status){
    super(_i);
    this.color = color(255,0,0);
    this.intersectingColor = color(100,0,0);

      this.status = "Isolate!";
  }
}
