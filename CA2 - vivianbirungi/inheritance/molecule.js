//molecule object to generate with attributes
//inside the molecule class we have a constructor with default parameters within an object
//the default parameters will be passed to the child class but can still be overwritten.
class Molecule {
  constructor({
    i,
    vx = random(-2.5,2.5),
    vy = random (-2.5,2.5),
    px = random(0, width),
    py = random(0, height)
  }) {
    this.index = i;
    this.radius = 20;
    this.velocity = createVector(vx, vy);
    this.position = createVector(px, py);
  //  this.status = "Neutral";

    this.color = color(0,0,255);
  //  this.intersectingColor = color(0,0,100);
  //  this.currentColor = this.color;
  }

  //render function is where we define the shape, colour and text showing on our objetcs
  //we draw an ellispe shape and give it noStroke. we fill it with the colour defined in the constructor.
  //we write an if statement for text showing on the molecule.
  //showText is defined in the GUI as a boolean. If showtext is true then
  //we display the text on the molecule. if it is false, then no text shows.
  //we define the text size and have the text aligned in the center.
  render() {
    noStroke()
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    fill(0);
    (obj.showText) ? (
      textSize(16),
      textAlign(CENTER),
      text(this.index, this.position.x, this.position.y + 6)) : null;
  }

  //this function we are checking the distance between the molecules to chek whether they are intersecting
  isIntersecting(_molecule) {
    let distance = dist(this.position.x, this.position.y, _molecule.position.x, _molecule.position.y)
    let gap = distance - this.radius - _molecule.radius;
    let check = (gap <= 0) ? true : false;


    //difference in x position dx
    //difference in y position dy
    //using pythagroas by getting square root of dx squared
    //and dy squared and getting the distance
    if (check) {
      console.log(`We were in close contact with index: ${this.index}, i need to ${this.status}`);

      let dx = this.position.x - _molecule.position.x; //d = differentiation (the change over time)
      let dy = this.position.y - _molecule.position.y;
      //  let dist = Math.sqrt(dx * dx + dy * dy);

      let normalX = dx / distance;
      let normalY = dy / distance;

      let midpointX = (this.position.x + _molecule.position.x) / 2;
      let midpointY = (this.position.y + _molecule.position.y) / 2;

      let dVector = (this.velocity.x - _molecule.velocity.x) * normalX;
      dVector += (this.velocity.y - _molecule.velocity.y) * normalY;

      let dvx = dVector * normalX;
      let dvy = dVector * normalY;

      this.velocity.x -= dvx;
      this.velocity.y -= dvy;

      _molecule.velocity.x += dvx;
      _molecule.velocity.y += dvy;
    }
    //  console.log("bounce!");

    //if the balls intersect then carry out the dock function
    if (check) {
      this.dock(_molecule);
    }
    return check;


  }

  //this function is making the molecules dock when they collide rather than cluster
  //by moving them in a calculated direction
  dock(_otherMolecule) {

    // This is where we want to dock it to
    //want to dock it to the otherMolecule
    let fixedBall = _otherMolecule;

    //resultant vector of the two vectors
    let resultantV = p5.Vector.sub(this.position, fixedBall.position);

    //direction of the resultant vector
    let rHeading = resultantV.heading();

    //calculating the magnitude of the resultant vector and taking away the radius of the two vectors and dividing by 2
    let rDist = (resultantV.mag() - this.radius - fixedBall.radius);

    // Here we take away the calculated distance from the current position
    //angle we want the balls to move in - get the direction we want them to go in
    let moveX = cos(rHeading) * rDist;
    let moveY = sin(rHeading) * rDist;

    //moving the x and y positions in different directions
    this.position.x -= moveX;
    this.position.y -= moveY;

    _otherMolecule.position.x += moveX;
    _otherMolecule.position.y += moveY;

    console.log(_otherMolecule)

  }

  // infect(_otherMolecule){
  //   let newMolecule = new Infected(_otherMolecule.index, _otherMolecule.position.x, _otherMolecule.position.y,_otherMolecule.velocity.x,_otherMolecule.velocity.y);
  //   molecules.splice(_otherMolecule.index,1,newMolecule);
  //   console.log(molecules);
  // }

  //function to change colour when molecules intersect
  // changeColor() {
  //   this.currentColor = this.intersectingColor;
  // }

  //function to reset the molecules to the original colour
  // reset() {
  //   this.currentColor = this.color;
  // }

  //function to move the object position and work out conditions for bouncing the Molecules
  //once they reach the extent of the window
  step() {

    (this.position.x > width - this.radius || this.position.x < 0 + this.radius) ?
    this.velocity.x *= -1: null;

    (this.position.y > height - this.radius - graphHeight || this.position.y < 0 + this.radius) ?
    this.velocity.y *= -1: null;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

}
