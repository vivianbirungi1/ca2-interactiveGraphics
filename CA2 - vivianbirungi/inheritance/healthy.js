class Healthy extends Molecule {
  constructor(_i,_status){
    super(_i);

    this.color = color(0,255,0);
    this.intersectingColor = color(0,100,0);

    this.status = "Social Distance";
  }
}
