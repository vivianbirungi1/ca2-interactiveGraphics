//recovered child class extending parent molecule class
//constructor where we create the instance of a class
//default parameters are held within the instance of the class
//child class can inherit the default parameters from the super class.
class Recovered extends Molecule {
  constructor({
    i,
    px = random(0, width),
    py = random(0, height),
    vx = random(-2.5,2.5),
    vy = random (-2.5,2.5)
  }){
    super({
      i,
      px,
      py,
      vx,
      vy
    });

    //setting the color of the recovered molecule
    this.color = color(255,255,0);
  }
}
