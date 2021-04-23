//healthy child class extending parent molecule class
//constructor where we create the instance of a class
//default parameters are held within the instance of the class
//child class can inherit the default parameters from the super class.
class Healthy extends Molecule {
  constructor({
    i,
    px = random(0, width),
    py = random(0, height),
    vx = random(-2.5,2.5),
    vy = random (-2.5,2.5)
  }){
    super({ //accessing the super class parameters
      i,
      px,
      py,
      vx,
      vy
    });

    this.color = color(0,255,0); //creating the color of specific healthy objects, overwrites default molecule class color.
    this.status = "Social Distance"; //declaring the status message of the healthy object.
  }
}
