//infected child class extending parent molecule class
//constructor where we create the instance of a class
//default parameters are held within the instance of the class
//child class can inherit the default parameters from the super class.
class Infected extends Molecule {
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

    //setting the color of the molecult and status message
    this.color = color(255,0,0);
    this.status = "Isolate!";

    this.age = frameCount; //setting the age of molecule to the amount of frames


  }

//making pulsing red infected objects
//overwriting the render function its inheriting from the super class
//getting the math.sin of the frameCount and setting the size, position, and pulse rate
//defining the ellipse noFill, stroke, position x and y and diameter.
  render(){
    super.render();
    noFill();
    stroke(this.color);
    angleMode(DEGREES); //angleMode calculates angle Degrees
    strokeWeight(3);
    let diam = map(Math.sin(frameCount), -1,1,50,90);
    ellipse(this.position.x,this.position.y,diam,diam);
  }
}
